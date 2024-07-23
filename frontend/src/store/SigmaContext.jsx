import React, { createContext, useState, useContext } from 'react';

const SigmaContext = createContext();

export const SigmaProvider = ({ children }) => {
  const [sigmaScore, setSigmaScore] = useState(0);

  const updateSigmaScore = (newScore) => {
    setSigmaScore(newScore);
  };

  return (
    <SigmaContext.Provider value={{ sigmaScore, updateSigmaScore }}>
      {children}
    </SigmaContext.Provider>
  );
};

export const useSigma = () => useContext(SigmaContext);
