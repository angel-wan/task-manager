import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap first
import "../App.css";
import TaskForm from "./TaskForm";
import { Task } from "../type";
import TaskList from "./TaskList";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const handleDeleteTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };
  return (
    <div
      className="w-full h-100vh"
      style={{
        backgroundColor: "#f9ebe0",
        minHeight: "100vh",
        color: "#562c2c",
      }}
    >
      <TaskForm onSaveTask={handleAddTask} />
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
    </div>
  );
}

export default App;
