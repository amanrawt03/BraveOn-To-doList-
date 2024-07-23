import BraveOn from "../../components/BraveOn";
import QOTD from "../../components/QOTD";
import Logout from "../../components/Logout";
import TaskList from "../../components/TaskList";
import SigmaScore from "../../components/SigmaScore";
const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <div className="flex-1 flex flex-col lg:flex-row-reverse">
        <div className="flex-grow flex flex-col">
          <SigmaScore />
          <BraveOn />
          <QOTD />
          <TaskList />
        </div>
      </div>
      <Logout />
    </div>
  );
};

export default HomePage;
