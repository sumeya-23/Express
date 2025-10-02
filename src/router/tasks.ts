import { Router } from "express";
import { 
       completedTasks, 
       createTasks, 
       deleteTasksById, 
       getTasks, 
       getTasksById,
       updateTasksById
       } from "../handlers/tasks";


const router = Router();
 
router.get('/', getTasks);
router.get('/completed', completedTasks);

router.get('/:id', getTasksById);
router.put('/', createTasks);
router.post('/:id',updateTasksById);
router.delete('/:id', deleteTasksById);

export default router