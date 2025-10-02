import type {Request, Response} from "express"
import fs from "fs"
import path from "path"

const Tasks_FILE =path.join(__dirname, "tasks.json")
interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}


const readTasks = (): Task[] => {

  if (!fs.existsSync(Tasks_FILE)) {
    fs.writeFileSync(Tasks_FILE, "[]", "utf-8")
  }

  const data = fs.readFileSync(Tasks_FILE, "utf-8");
  return JSON.parse(data || "[]");
};

// Write tasks to file
const writeTasks = (tasks: Task[]) => {
  fs.writeFileSync(Tasks_FILE, JSON.stringify(tasks));
};




export function getTasks(request: Request, response : Response){
let tasks=readTasks() 
const status =request.query.status
if(status){
    tasks = tasks.filter(task => task.status === status)
}
response.json(tasks)
}



export function getTasksById(request: Request<{ id: string }>, response: Response){
const tasks =readTasks()
  const id = parseInt(request.params.id);
   const task = tasks.find(t => t.id === id);

 if(!tasks) return response.status(404).json({message:"not found" })
 
 response.json(task)
  
}




export function createTasks(request: Request, response: Response){
const {title, description, status} = request.body
if(!title || !description) return response.status(400).json({message: "title and description is required"})
    const tasks = readTasks()
   const lastTask = tasks[tasks.length - 1];
  const newId = lastTask ? lastTask.id + 1 : 1;


 const newTask: Task = {
     id: newId,
      title,
     description,
  status : status ||"pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()

}
tasks.push(newTask)
writeTasks(tasks)
response.status(201).json(tasks)
}



export function updateTasksById(request: Request<{id: string}>, response: Response){
 const id = parseInt(request.params.id); // Convert id from string to number
  const { title, description, status } = request.body;

  const tasks = readTasks();
  const task = tasks.find((task) => task.id === id);

  if (!task) return response.status(404).json({ message: "Task not found" });
  

  
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;

  
  task.updatedAt = new Date().toISOString();

  writeTasks(tasks);

  response.json(task);

}


export function deleteTasksById(request: Request<{id: string}>, response: Response){
 const tasks = readTasks()
const id = parseInt(request.params.id);
 const taskIndex = tasks.findIndex((task)=>task.id == id)


 if(taskIndex == -1) return response.status(404).json({message: "not found"})

   const removedTask = tasks.splice(taskIndex, 1)[0];

  
  writeTasks(tasks);
response.json({message:"Task deleted successfully", task: removedTask})
}
export function completedTasks(request: Request, response: Response){
const task = readTasks()
  const completedTasks = task

    .filter((task) => task.status === "completed")
    response.json()
}