const input = document.getElementById("input");
const taskList = document.getElementById("taskList");

const addbtn = document.querySelector(".addbtn");
const delbtn = document.getElementById("delbtn");
const editbtn = document.getElementById("editbtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let selectedTaskId = null;


// ==============================
// SAVE TASKS
// ==============================

function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// ==============================
// ADD TASK
// ==============================

function addTask() {

    const taskText = input.value.trim();

    if (taskText === "") {
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    saveTask();

    input.value = "";

    renderTasks();
}

addbtn.addEventListener("click", addTask);


// Enter key
input.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        event.preventDefault();

        addTask();
    }

});


// ==============================
// RENDER TASKS
// ==============================

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task) => {

        const li = document.createElement("li");

        li.textContent = task.text;

        // Selected task
        if (task.id === selectedTaskId) {
            li.classList.add("selected");
        }

        // Completed task
        if (task.completed) {
            li.classList.add("completed");
        }


        // Select task
        li.addEventListener("click", () => {

            selectedTaskId = task.id;

            // Put task text inside input
            input.value = task.text;

            renderTasks();

        });


        // Double click = complete
        li.addEventListener("dblclick", () => {

            task.completed = !task.completed;

            saveTask();

            renderTasks();

        });


        taskList.appendChild(li);

    });
}


// ==============================
// DELETE TASK
// ==============================

delbtn.addEventListener("click", () => {

    if (selectedTaskId === null) {
        return;
    }

    tasks = tasks.filter((task) => {
        return task.id !== selectedTaskId;
    });

    selectedTaskId = null;

    input.value = "";

    saveTask();

    renderTasks();

});


// ==============================
// EDIT TASK
// ==============================

editbtn.addEventListener("click", () => {

    if (selectedTaskId === null) {
        return;
    }

    const task = tasks.find((item) => {
        return item.id === selectedTaskId;
    });

    if (!task) {
        return;
    }

    const newText = input.value.trim();

    if (newText === "") {
        return;
    }

    task.text = newText;

    selectedTaskId = null;

    input.value = "";

    saveTask();

    renderTasks();

});


// ==============================
// INITIAL RENDER
// ==============================

renderTasks();
