let createTaskElement = (taskId) => {
    const newTaskDiv = document.createElement("div");
    newTaskDiv.setAttribute("id", taskId);
    newTaskDiv.setAttribute("class", "task");

    return newTaskDiv;
};

let createTaskLabel = (taskText) => {
    const label = document.createElement("label");
    label.setAttribute("contenteditable", "true");
    label.append(document.createTextNode(taskText));
    label.setAttribute("class", "task-label");

    return label;
}

let createTaskCheckbox = (isComplete) => {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "task-checkbox");

    if(isComplete) {
        checkbox.setAttribute("checked", "checked");
    }

    return checkbox;
}

let createTaskEditButton = (newTaskDiv) => {
    const editButton = document.createElement("button");
    editButton.appendChild(document.createTextNode("Edit"));
    editButton.setAttribute("class", "task-buttons");

    return editButton;
}

let createTaskDeleteButton = (newTaskDiv) => {
    const deleteButton = document.createElement("button");
    deleteButton.appendChild(document.createTextNode("Delete"));
    deleteButton.setAttribute("class", "task-buttons");

    return deleteButton;
}

let updateTasksTitle = (numOfTasks, numOfDoneTasks) => {
    let title = "";
    
    if (numOfTasks === 0 && numOfDoneTasks === 0) {
       title = "Create your first task" 
    } else {
        title = numOfDoneTasks + "/" + numOfTasks + " tasks";
    }

    document.getElementById("title").innerHTML = title;
}

export {createTaskElement, createTaskCheckbox, createTaskDeleteButton, createTaskEditButton, createTaskLabel, updateTasksTitle};