import axios, { AxiosResponse } from 'axios';
import { Task, NewTask, TasksById, GUID } from '../../../common/Tasks';

export const getAllTasksFromServer = async(): Promise<TasksById> => {
    const response: AxiosResponse = await axios.get('/api/v1/tasks');
    return response.data;
}

export const deleteTaskFromServer = (taskId: GUID): Promise<void> => {
     return axios.delete('/api/v1/tasks/' + taskId);
}

export const addTaskToServer = async(task: NewTask): Promise<Task> => {
    const response: AxiosResponse = await axios.post('/api/v1/tasks', task);
    return response.data;
}

export const updateTaskOnServer = async (task: Task): Promise<void> => {
    await axios.post('/api/v1/tasks', task);
}
