//members tasks variables
let taskInfoArray = [];
let taskNameInfo;
let taskDone = false;
let taskInfoObj;
let taskInfoElement;
let parsedTasksArray = [];

//ADD TASKS
function addTasksClickHandler () {
    const addTasksInputElement = document.getElementById("task_name");
    taskNameInfo = addTasksInputElement.value;
    taskInfoObj = {
        task_name: taskNameInfo,
        task_done: false,
    }
    if (taskNameInfo === "") {
        alert("Please Enter a task");
    } 

    if (!localStorage.tasksInfos) {
        localStorage.setItem("tasksInfos", JSON.stringify(taskInfoObj));
    } else {
        parsedTasksArray = JSON.parse(localStorage.tasksInfos);
        parsedTasksArray.push(taskInfoObj);
        localStorage.tasksInfos = JSON.stringify(parsedTasksArray);
    }
    addTasksInputElement.value = "";
} 
//DISPLAYS TASKS
function displayTaskList () {
    let tasksList = document.getElementById("allTasksList");
    tasksList.innerHTML = "";
    let parsedTasks = JSON.parse(localStorage.tasksInfos);
    for (let i = 0; i < parsedTasks.length; i++) {
        //task name
        const taskName = document.createElement("p");
        taskName.innerText = parsedTasks[i].task_name;
        taskName.classList.add("p");
        //done button
        const doneButton = document.createElement("button");
        doneButton.classList.add("doneButton");
        doneButton.innerText = "Done";
        doneButton.addEventListener("click", function () {
            if (taskName.classList.contains("p")) {
                taskName.classList.replace("p", "doneTasks");
                taskNameInfo = parsedTasks[i].task_name;
                taskDone = true; 
                taskDoneObj = {
                    task: taskNameInfo,
                    done: taskDone,
                }
                localStorage.setItem("doneUserTask", JSON.stringify(taskDoneObj));
            } else if (taskName.classList.contains("doneTasks")) {
                taskName.classList.replace("doneTasks", "p");
                taskDone = false;
                localStorage.removeItem("doneUserTask");
            }
        })
        //remove button
        const removeTaskButton = document.createElement("button");
        removeTaskButton.innerText = "Remove";
        removeTaskButton.classList.add("removeButton");
        removeTaskButton.addEventListener("click", function() { 
            if (taskInfoArray !== []) {
                taskNameInfo = parsedTasks[i].task_name;
                parsedTasks.splice(parsedTasks.indexOf(parsedTasks[i]), 1);
                localStorage.getItem("tasksInfos");
                displayTaskList ();
                localStorage.setItem("tasksInfos", JSON.stringify(parsedTasks));
            }
            displayTaskList();
        })
        
        //display things
        taskInfoElement = document.createElement("div");
        tasksList.appendChild(taskInfoElement);
        taskInfoElement.appendChild(taskName);
        taskInfoElement.appendChild(doneButton);
        taskInfoElement.appendChild(removeTaskButton);    
        taskInfoElement.classList.add("taskInfoStyleNormal");
    }
}

//LOAD ALL
function loadHandler() {
    const addTaskButton = document.getElementById("addtaskButton");
    addTaskButton.addEventListener("click", addTasksClickHandler);
    addTaskButton.addEventListener("click", displayTaskList);
}
window.addEventListener("load",loadHandler);
window.addEventListener("load", displayTaskList);