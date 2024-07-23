import { BiLogOut } from "react-icons/bi";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import toast from 'react-hot-toast'
import boy1 from '../assets/avatars/boy1.png'
import girl1 from '../assets/avatars/girl1.png'
import girl2 from '../assets/avatars/girl2.png'

const Logout = () => {
  const {data: authUser} = useQuery({queryKey: ["authUser"]})
  const queryClient = useQueryClient();
  const {mutate:logout} = useMutation({
    mutationFn: async() => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        })
        const data = await res.json();
        if(!res.ok) throw new Error(data.error || "Failed to logout");
        
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess : ()=>{
      queryClient.invalidateQueries({queryKey: ["authUser"]});
    }, 
    onError : ()=>{
      toast.error("Something went wrong")
    }

  });
  const handleLogout = () => {
    logout();
  };

  const getAvatar = (gender) => {
    if (gender === "Male") {
      return boy1;
    } else if (gender === "Female") {
      return girl1
    } else {
      return girl2;
    }
  };
  return (
    <div className="flex items-center p-3 bg-stone-800 rounded-full mb-1 ml-1 w-40">
      <img src={getAvatar(authUser?.gender)} alt="User Avatar" className="h-8 w-8 mr-2"/>
      <div className="hidden md:block">
        <p className="text-white font-bold text-base w-20 truncate font-sans">
          {authUser.username}
        </p>
      </div>
      <BiLogOut
        className="w-6 h-6 cursor-pointer text-white"
        onClick={handleLogout}
      />
    </div>
  );
};

export default Logout;
