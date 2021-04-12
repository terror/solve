import React, { useContext, createContext, useState, useEffect } from 'react';
import { IProblem } from '../ts/interfaces';

const ProblemContext = createContext({});

export const useProblem = () => {
  return useContext(ProblemContext);
};

interface ProblemProviderProps {}

const ProblemProvider: React.FC<ProblemProviderProps> = ({ children }) => {
  const problemState: IProblem = {
    platform: '',
    id: '',
    title: '',
    timeLimit: '',
    memoryLimit: '',
    inputFile: '',
    outputFile: '',
    statement: {
      text: [],
      inputSpec: [],
      outputSpec: [],
      tests: [],
      notes: [],
    },
    url: '',
    submitUrl: '',
  };
  const [problem, setProblem] = useState<IProblem>(problemState);

  useEffect(() => {
    const data = localStorage.getItem('problem');
    if (data) {
      setProblem(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('problem', JSON.stringify(problem));
  });

  const value = {
    problem,
    setProblem,
  };

  return (
    <ProblemContext.Provider value={value}>{children}</ProblemContext.Provider>
  );
};

export default ProblemProvider;
