import { ImCheckmark } from "react-icons/im";
import { ImCross } from "react-icons/im";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
const Task = ({ task }) => {
  const queryClient = useQueryClient();

  const taskId = task._id;
  const { mutate: deleteTask } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Deleted Successfully!!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
      toast.error("Something went wrong!!");
    },
  });

  const {mutate:completeTask} = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/tasks/${taskId}/complete`, { method: "PATCH" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      return data;
    },
    onSuccess: () => {
      toast.success("Task completed successfully!!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("Something went wrong!!");
    },
  });

  const handleOnDelete = () => {
    deleteTask();
  };

  const handleOnComplete = () => {
    completeTask();
  };

  return (
    <div
      className={`flex w-custom-left justify-between items-center mt-7 ml-mid-task rounded-3xl ${
        task.completed ? "bg-gray-700" : "bg-stone-900"
      }`}
    >
      <p
        className={`flex-1 p-4 ${
          task.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {task.text}
      </p>
      <div className="flex space-x-2 mr-2 p-2">
        <button
          className={`btn join-item bg-green-700 ${
            task.completed ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handleOnComplete}
          disabled={task.completed}
        >
          <ImCheckmark />
        </button>

        <button className="btn join-item bg-red-700" onClick={handleOnDelete}>
          <ImCross />
        </button>
      </div>
    </div>
  );
};

export default Task;
