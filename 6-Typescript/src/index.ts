import { taskElements } from "./view/TasksView";
import { MainView } from "./view/mainView";
import { Task } from "./model/Task";
import { assignFunctionalityToTask } from "./controller/taskController";

let i=0;
MainView.insertTaskView.focusOnInput();
MainView.insertTaskView.insertTaskAreaElement
.addEventListener("userintentaddtask", () => {
    const taskToAdd: Task = new Task(MainView.insertTaskView.getInputText(), false, (i++).toString());
    const elements: taskElements = MainView.tasksView.addTaskToDom(taskToAdd);
    assignFunctionalityToTask(elements, taskToAdd);
    MainView.insertTaskView.clearInputAndFocus();
});