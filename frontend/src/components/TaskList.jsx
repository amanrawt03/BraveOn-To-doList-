import Task from "../components/Task";
import AddTask from "./AddTask";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const TaskList = () => {
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
  });

  const tasks = authUser?.tasks || [];
  const userId = authUser?._id;
  const queryClient = useQueryClient();

  const addTaskMutation = useMutation({
    mutationFn: async ({ text, userId }) => {
      console.log("Payload:", { text, userId });
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, userId }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Server response:", data);
        throw new Error(data.message || "Something went wrong");
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Task Added Successfully");
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error(error.message || "Something went wrong");
    },
  });

  const addTask = (text) => {
    if (userId) {
      addTaskMutation.mutate({ text, userId });
    } else {
      console.error("User ID is not available");
    }
  };

  return (
    <>
      <AddTask addTask={addTask} />

      {tasks.length === 0 ? (
        <div
          className="mockup-code mt-10 ml-mid-header"
          style={{ height: "30vh", width: "25vw" }}
        >
          <pre data-prefix="$">
            <code>10 points per completed task.</code>
          </pre>
          <pre data-prefix=">" className="text-warning">
            <code>Lose 2 points per missed task.</code>
          </pre>
          <pre data-prefix=">" className="text-success">
            <code>Ready to start?</code>
          </pre>
        </div>
      ) : (
        tasks.map((task, index) => <Task key={index} task={task} />)
      )}
    </>
  );
};

export default TaskList;
