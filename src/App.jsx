import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./component/Route";
import ModeContext from "./context/ModeContext";
import './App.css';

function App() {
  const [mode, setMode] = useState("dark");

  const toggleMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      <RouterProvider router={router} />
    </ModeContext.Provider>
  );
}

export default App;
