import { ReactElement, useEffect } from "react";
import { Task } from "../type";

const TaskList = ({
  tasks,
  onDeleteTask,
}: {
  tasks: Task[];
  onDeleteTask(index: number): void;
}): ReactElement => {
  useEffect(() => {}, [tasks]);
  return (
    <table className="table" style={{ padding: "10vh" }}>
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Due Date</th>
          <th scope="col">Category</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr>
            <th scope="row">{task.title}</th>
            <td>{new Date(task.dueDate).toLocaleDateString()}</td>
            <td>{task.category}</td>
            <td>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => onDeleteTask(index)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;
