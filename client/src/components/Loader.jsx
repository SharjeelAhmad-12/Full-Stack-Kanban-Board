import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Loader = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <LoaderWrapper>
      <div className="kanban-container">
        {"KANBAN".split("").map((letter, index) => (
          <span key={index} className="letter" style={{ animationDelay: `${index * 0.15}s` }}>
            {letter}
          </span>
        ))}
      </div>
    </LoaderWrapper>
  );
};

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(
    -45deg,
    #3a0b58,
    #350c50,
    #a435f0,
    #ff0080
  );
  background-size: 300% 300%;
  animation: bgMove 5s ease-in-out infinite alternate;
  color: #fff;
  font-family: "Poppins", sans-serif;
  overflow: hidden;

  .kanban-container {
    display: flex;
    gap: 10px;
  }

  .letter {
    font-size: 5rem;
    font-weight: bold;
    text-transform: uppercase;
    color: #ffffff;
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.9), 0 0 25px rgba(255, 126, 179, 0.9);
    animation: popIn 0.8s ease-in-out, bounce 1.5s infinite alternate ease-in-out;
    transform-origin: center;
  }

  @keyframes popIn {
    0% {
      opacity: 0;
      transform: scale(0.5) translateY(30px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes bounce {
    0% {
      transform: translateY(0) scale(1);
    }
    100% {
      transform: translateY(-10px) scale(1.05);
    }
  }

  @keyframes bgMove {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }
`;

export default Loader;
