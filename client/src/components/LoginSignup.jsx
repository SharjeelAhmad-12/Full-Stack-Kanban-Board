import { useState } from "react";
import { Box, TextField, IconButton, InputAdornment, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";  

const apiUrl = "https://full-stack-kanban-board-production.up.railway.app";  
const LoginSignup = () => {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let endpoint = "";
    let payload = {};

    if (mode === "signup") {
      endpoint = "/auth/signup";
      payload = { name, email, password };
    } else if (mode === "login") {
      endpoint = "/auth/login";
      payload = { email, password };
    } else if (mode === "forgot") {
      endpoint = "/auth/forgot";
      payload = { email };
    } else if (mode === "reset") {
      endpoint = "/auth/reset";
      payload = { email, password, confirmPassword };
      if (password !== confirmPassword) {
        toast.error("Passwords do not match!", { position: "top-center" });
        setIsLoading(false);
        return;
      }
    }

    try {
      const res = await axios.post(`${apiUrl}${endpoint}`, payload);

      if (mode === "forgot") {
        toast.success("Password reset email sent!", { position: "top-center" });
        setTimeout(() => setMode("reset"), 3000);
      } else if (mode === "reset") {
        toast.success("Password reset successful!", { position: "top-center" });
        setTimeout(() => setMode("login"), 3000);
      } else {
        toast.success(mode === "signup" ? "Signup successful!" : "Login successful!", { position: "top-center" });

        if (mode === "login") {
          setTimeout(() => navigate("/dashboard"), 1500);
        }
      }

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[rgba(58,11,88,1)] via-[rgba(53,12,80,1)] to-[rgba(164,53,240,1)]">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="w-[350px] h-auto bg-white rounded-lg shadow-lg pb-10 pt-5 px-6">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-serif mb-5 text-center">
            {mode === "signup" ? "Create New Account" : mode === "forgot" ? "Forgot Password" : mode === "reset" ? "Reset Password" : "Login"}
          </h1>

          {mode === "signup" && (
            <div className="mb-4">
              <Box sx={{ "& > :not(style)": { width: "100%", borderRadius: "0.5rem" } }}>
                <TextField label="Name" variant="outlined" fullWidth required value={name} onChange={(e) => setName(e.target.value)} />
              </Box>
            </div>
          )}

          <div className="mb-4">
            <Box sx={{ "& > :not(style)": { width: "100%", borderRadius: "0.5rem" } }}>
              <TextField label="Email" variant="outlined" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} />
            </Box>
          </div>

          {(mode === "login" || mode === "signup" || mode === "reset") && (
            <div className="mb-4">
              <Box sx={{ "& > :not(style)": { width: "100%", borderRadius: "0.5rem" } }}>
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </div>
          )}

          {mode === "reset" && (
            <div className="mb-4">
              <Box sx={{ "& > :not(style)": { width: "100%", borderRadius: "0.5rem" } }}>
                <TextField
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Box>
            </div>
          )}

          <button
            type="submit"
            className="w-full p-3 mt-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <CircularProgress size={20} color="inherit" className="mr-2" /> Processing...
              </>
            ) : mode === "signup" ? (
              "Sign Up"
            ) : mode === "forgot" ? (
              "Send Reset Email"
            ) : mode === "reset" ? (
              "Reset Password"
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="flex flex-col justify-between items-center mt-5">
          {mode === "login" && (
            <>
              <button className="text-base text-blue-500" onClick={() => setMode("signup")}>
                Don't have an account? Sign Up
              </button>
              <button className="text-base text-blue-500" onClick={() => setMode("forgot")}>
                Forgot Password?
              </button>
            </>
          )}
          {mode === "signup" && <button className="text-base text-blue-500" onClick={() => setMode("login")}>Already have an account? Login</button>}
          {mode === "forgot" && <button className="text-base text-blue-500" onClick={() => setMode("login")}>Back to Login</button>}
          {mode === "reset" && <button className="text-base text-blue-500" onClick={() => setMode("login")}>Back to Login</button>}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
