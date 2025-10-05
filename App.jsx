// App.jsx
import React, { useState, useEffect, use } from "react";
import "./index.css";
export default function App() {
  const [Theme, setTheme] = useState("Dark");
  const [inputvalue, setinputvalue] = useState("");
  useEffect(() => {
    console.log("colored", Theme);
  }, [Theme]);
  function handlesubmit(e) {
    e.preventDefault();
    setTheme(inputvalue);
    setinputvalue("");
  }
  return (
    <div>
      <h1 className="text-center font-extrabold ">Darklightmode</h1>
      <form>
        <h1 className="font-extrabold text-center bg-red-600">{Theme}</h1>
        <input
          className="border border-white"
          name="text"
          placeholder="Enter mode...."
          value={inputvalue}
          onChange={(e) => setinputvalue(e.target.value)}
        />
        <br></br>
        <button
          className="bg-red-500  px-4 py-2 rounded border border-green-200"
          onClick={handlesubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
