import React, { ReactNode, createContext, useState } from 'react';

export enum Status {
  todo = 'todo',
  done = 'done',
}

export type Tasks = {
  description: string;
  id: string;
  title: string;
  dueAt: number;
  status: Status;
  categoryName: string;
  categoryColor: string;
}[];

type Categories = {
  id: string;
  name: string;
  color: string;
}[];

type DataContextType = {
  tasks: Tasks;
  dueTasks: Tasks;
  categories: Categories;
  setTasks: (Tasks: Tasks) => void;
  setDueTasks: (Tasks: Tasks) => void;
  setCategories: (Categories: Categories) => void;
};

export const DataContext = createContext<DataContextType>({});

const DataProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState([]);
  const [dueTasks, setDueTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  return (
    <DataContext.Provider
      value={{
        tasks,
        dueTasks,
        categories,
        setTasks,
        setDueTasks,
        setCategories,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
