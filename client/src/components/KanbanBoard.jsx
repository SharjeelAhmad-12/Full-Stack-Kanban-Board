import React, { useState, useEffect } from "react";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DroppableColumn from "./Droppable";
import SearchInput from "./Search/SearchInput";
import Card from "./Card/Card";
import Modal from "./Modal/Modal";
import { taskService } from "../api/Service";

function KanbanBoard() {
  const [cardsData, setCardData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    taskService.getTasks()
      .then((response) => setCardData(response.data.tasks))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const getTaskTypeColors = (taskType) => {
    switch (taskType) {
      case "Critical-Task": return "text-red-500";
      case "Normal-Task": return "text-yellow-500";
      case "Urgent-Task": return "text-green-500";
      default: return "text-gray-700";
    }
  };

  const handleSearchChange = (data) => setSearchData(data);

  const filteredCards = cardsData.filter((card) =>
    card.todo.toLowerCase().includes(searchData.toLowerCase())
  );

  const categorizedTasks = {
    critical: filteredCards.filter((card) => card.taskType === "Critical-Task"),
    urgent: filteredCards.filter((card) => card.taskType === "Urgent-Task"),
    normal: filteredCards.filter((card) => card.taskType === "Normal-Task"),
  };

  const handleSaveTask = async (newCard) => {
    try {
      if (editIndex !== null) {
        const taskToEdit = cardsData[editIndex];
        await taskService.updateTask(taskToEdit._id, newCard);
        setCardData((prevTasks) => prevTasks.map((task, idx) =>
          idx === editIndex ? { ...task, ...newCard } : task
        ));
        setEditIndex(null);
      } else {
        const response = await taskService.createTask(newCard);
        setCardData([...cardsData, response.data.task]);
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const editItem = (id) => {
    const taskIndex = cardsData.findIndex((card) => card._id === id);
    if (taskIndex !== -1) setEditIndex(taskIndex);
  };

  const deleteItem = async (id) => {
    try {
      await taskService.deleteTask(id);
      setCardData(cardsData.filter((card) => card._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const onDragStart = (event) => {
    const { active } = event;
    const draggedCard = cardsData.find((card) => card._id === active.id);
    setActiveCard(draggedCard);
  };

  const onDragEnd = async (event) => {
    const { active, over } = event;
    setActiveCard(null);
    if (!over || active.id === over.id) return;

    const activeIndex = cardsData.findIndex((task) => task._id === active.id);
    const overIndex = cardsData.findIndex((task) => task._id === over.id);
    if (activeIndex === -1) return;

    const draggedCard = { ...cardsData[activeIndex] };
    let newTaskType = draggedCard.taskType;
    for (const key of Object.keys(categorizedTasks)) {
      if (over.id === key || categorizedTasks[key].some((card) => card._id === over.id)) {
        newTaskType = key === "critical" ? "Critical-Task" : key === "urgent" ? "Urgent-Task" : "Normal-Task";
      }
    }
    const updatedCards = [...cardsData];
    updatedCards.splice(activeIndex, 1);
    updatedCards.splice(overIndex, 0, { ...draggedCard, taskType: newTaskType });
    setCardData(updatedCards);

    try {
      await taskService.updateTask(draggedCard._id, { taskType: newTaskType });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <div className="container mx-auto mt-10">
        <div className="flex flex-col sm:flex-row gap-y-4 space-x-5 justify-center items-center relative z-50">
          <SearchInput onSearch={handleSearchChange} />
          <Modal setCardData={handleSaveTask} editData={editIndex !== null ? cardsData[editIndex] : null} />
        </div>

        <div className="mt-10 m-12 grid grid-cols-1 md:grid-cols-3 gap-10 ">
          {Object.entries(categorizedTasks).map(([key, taskList]) => (
            <DroppableColumn key={key} id={key}>
              <SortableContext items={taskList.map((task) => task._id)} strategy={verticalListSortingStrategy}>
                <h2 className={`text-xl font-bold mb-4 text-center ${getTaskTypeColors(`${key.charAt(0).toUpperCase()}${key.slice(1)}-Task`)}`}>
                  {`${key.charAt(0).toUpperCase()}${key.slice(1)} Tasks`}
                </h2>
                {taskList.length > 0 ? taskList.map((card) => (
                  <div key={card._id} className="mb-5">
                    <Card id={card._id} todo={card.todo} description={card.description} taskType={card.taskType} onDelete={() => deleteItem(card._id)} onEdit={() => editItem(card._id)} />
                  </div>
                )) : (
                  <div className="h-24 flex items-center text-center justify-center text-gray-400 border-dashed border-2 border-gray-300 rounded-md">
                    No tasks yet. Drag tasks here!
                  </div>
                )}
              </SortableContext>
            </DroppableColumn>
          ))}
        </div>
      </div>
      <DragOverlay>{activeCard ? <Card id={activeCard._id} todo={activeCard.todo} description={activeCard.description} taskType={activeCard.taskType} /> : null}</DragOverlay>
    </DndContext>
  );
}

export default KanbanBoard;