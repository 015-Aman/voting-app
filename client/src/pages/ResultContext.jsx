// ResultContext.js

import React, { createContext, useState } from 'react';

// Create a new context
export const ResultContext = createContext();

// Create a context provider component
export const ResultProvider = ({ children }) => {
  const [showResult, setShowResult] = useState(false);

  return (
    <ResultContext.Provider value={{ showResult, setShowResult }}>
      {children}
    </ResultContext.Provider>
  );
};
