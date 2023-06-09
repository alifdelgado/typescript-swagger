import { Handler, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { getData, writeData, Task } from "../config/db";

export const findAll = (req: Request, res: Response) => {
  const tasks = getData();
  return res.status(200).json({ tasks });
};

export const findById = (req: Request, res: Response) => {
  const { id } = req.params;
  const tasks = getData();
  const task = tasks.filter((task: Task) => task.id === id)[0];
  if (!task) return res.status(404).json({ mgs: "Task not found" });
  return res.status(200).json(task);
};

export const create: Handler = (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const tasks = getData();
    const newTask = { id: uuid(), name, description };
    tasks.push(newTask);
    writeData(tasks);
    return res.status(201).json({ task: newTask });
  } catch (error) {
    return res.status(500).json({ msg: "Task could not be created" });
  }
};

export const update: Handler = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    let tasks = getData();
    let taskUpdated: Task = { id: "", name: "", description: "" };
    tasks = tasks.map((task: Task) => {
      if (task.id === id) {
        task.name = name || task.name;
        task.description = description || task.description;
        taskUpdated = task;
      }
      return task;
    });
    writeData(tasks);
    return res.status(200).json({ task: taskUpdated });
  } catch (error) {
    return res.status(500).json({ msg: "Task could not be updated" });
  }
};

export const destroy: Handler = (req: Request, res: Response) => {
  const { id } = req.params;
  let tasks = getData();
  tasks = tasks.filter((task: Task) => task.id !== id);
  writeData(tasks);
  return res.status(204).json({ msg: "Task deleted" });
};
