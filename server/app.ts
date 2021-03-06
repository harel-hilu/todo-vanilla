import express, { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { RedisClient, createClient } from 'redis';
import { validateUser } from "./services/auth.middleware";
import { deleteTask, createTask, getAllTasks } from "./dao/tasks.dao";
import { Task, TasksById } from "../common/Tasks";
import { config } from "dotenv";

config();
const client: RedisClient = createClient(process.env.REDIS_URL);
const app: Express = express();
const port: string = (process.env.PORT || "3300");

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(cookieParser());
app.use(validateUser);

app.get('/', (req: Request, res: Response): void => {
    res.render("index.html");
});

app.get('/api/v1/tasks',  async (req: Request, res: Response): Promise<void> => { 
    const tasks: TasksById = await getAllTasks(client, req.userId);
    res.send(tasks);
});

app.post('/api/v1/tasks',  async (req: Request, res: Response): Promise<void> => {
    const task: Task = await createTask(client, req.userId, req.body);
    res.send(task);
});

app.delete('/api/v1/tasks/:taskId', 
    async (req: Request, res: Response): Promise<void> => {

    await deleteTask(client, req.userId, req.params.taskId);
    res.send();    
});

app.listen(port, () => console.log(`listening on port ${port}`));
