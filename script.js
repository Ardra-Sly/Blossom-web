document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Task cannot be empty!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `
        <span>${taskInput.value}</span>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
}

function deleteTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function editTask(button) {
    let taskText = button.parentElement.querySelector("span");
    let newTask = prompt("Edit task:", taskText.textContent);
    if (newTask !== null) {
        taskText.textContent = newTask;
        saveTasks();
    }
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList span").forEach(task => {
        tasks.push(task.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let taskList = document.getElementById("taskList");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span>${task}</span>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(li);
    });
}
