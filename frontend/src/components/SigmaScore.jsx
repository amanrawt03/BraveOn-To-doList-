import React from "react";
import SigmaSvg from "../assets/sigma.svg";
import {useQuery} from '@tanstack/react-query'
const SigmaScore = () => {
  const {data: authUser} = useQuery({queryKey: ["authUser"]})

  return (
    <>
      <div className="w-48 ml-custom-left pt-2 pb-3 pl-1 mt-2">
        <div className="flex">
          <div className="text-lg ml-6 stat-title font-bold">Sigma Score</div>
          <img src={SigmaSvg} className="w-5 h-5 ml-1 mt-1" />
        </div>
        <div className="stat-value  ml-4 text-center mr-5" id="sigma-score">
          {authUser?.sigmaScore}
        </div>
      </div>
    </>
  );
};

export default SigmaScore;
