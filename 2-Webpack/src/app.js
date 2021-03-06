import {createTaskElement, createTaskCheckbox, createTaskDeleteButton, createTaskEditButton, createTaskLabel, updateTasksTitle} from './drawer/taskToDOM.js'
import {getNewTaskInputElement, getNewTaskInputText, isEmptyNewTaskInput, focusNewTaskInput, clearNewTaskInput} from "./DOMHelper/newTaskInput.js";
import {TodoList} from "./objects/todoList.js";

const todo = new TodoList();

window.addEventListener("load", () => {
    Object.values(todo.tasks).forEach(drawTask);
    document.getElementById("addTaskButton").addEventListener("click", addTaskHandler);
    getNewTaskInputElement().addEventListener("keydown", (e) => { 
        if (e.code === "Enter"){
            addTaskHandler();
        }
    })
    
    updateTasksTitle(todo.countTasks(), todo.countDoneTasks());
    focusNewTaskInput();
});

const addTaskHandler = () => {
    if (!isEmptyNewTaskInput()){
        drawTask(todo.addTask(undefined, getNewTaskInputText(), false));
        updateTasksTitle(todo.countTasks(), todo.countDoneTasks());
        clearNewTaskInput();
    }    
    
    focusNewTaskInput();    
};

const drawTask = (taskToAdd) => {
    const taskElement = createTaskElement(taskToAdd.id);

    const isDoneTaskCheckbox = createTaskCheckbox(taskToAdd.isComplete);
    isDoneTaskCheckbox.addEventListener("click", (e) => taskCheckboxClicked(e, taskToAdd.id));

    const taskLabel = createTaskLabel(taskToAdd.text);
    taskLabel.addEventListener("focusout", (e) => taskToAdd = taskLabelFocusOut(e, taskToAdd.id));

    const taskEditButton = createTaskEditButton(taskElement);
    taskEditButton.addEventListener("click", () => editTaskClicked(taskElement));

    const taskDeleteButton = createTaskDeleteButton(taskElement);
    taskDeleteButton.addEventListener("click", () => deleteTaskClicked(taskElement));

    taskElement.append(isDoneTaskCheckbox);
    taskElement.append(taskLabel);
    taskElement.append(taskEditButton);
    taskElement.append(taskDeleteButton);
    document.getElementById("tasksList").append(taskElement);
};

const taskCheckboxClicked = (e, taskId) => {
    todo.addTask(taskId, todo.tasks[taskId].text, e.target.checked);
    updateTasksTitle(todo.countTasks(), todo.countDoneTasks());
}

const editTaskClicked = (taskElement) => taskElement.querySelector("label").focus();

const taskLabelFocusOut = (e, taskId) => todo.addTask(taskId, e.target.innerHTML, todo.tasks[taskId].isComplete);

const deleteTaskClicked = (taskElement) => {
    taskElement.parentNode.removeChild(taskElement);
    todo.removeTask(taskElement.id);
    updateTasksTitle(todo.countTasks(), todo.countDoneTasks());
    focusNewTaskInput();
};