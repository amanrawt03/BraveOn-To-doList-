import React, { useState } from "react";

const AddTask = ({ addTask }) => {
  const [task, setTask] = useState("");

  const handleOnChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask("");
    }
  };

  return (
    <div className="join mt-10">
      <input
        type="text"
        className="input input-bordered join-item w-96 ml-96"
        placeholder="Add new task"
        value={task}
        onChange={handleOnChange}
      />
      <button
        className="btn join-item rounded-r-full bg-red-700 font-semibold"
        onClick={handleAddTask}
      >
        I got this!
      </button>
    </div>
  );
};

export default AddTask;
