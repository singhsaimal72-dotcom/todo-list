const input = document.getElementById("input");
const taskList = document.getElementById("taskList");
const addbtn = document.querySelector(".addbtn");
const delbtn = document.getElementById("delbtn");
const editbtn = document.getElementById("editbtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let selectedTaskId = null;

function saveTask() {

    localStorage.setItem("tasks",
        JSON.stringify(tasks)
    );
}


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

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});



function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task) => {

        const li = document.createElement("li");

        li.textContent = task.text;

        if(task.id === selectedTaskId) {
            li.classList.add("selected");
        }

        li.addEventListener("click",()=> {
            selectedTaskId = task.id;

            renderTasks();
        });

        taskList.appendChild(li);

    });

}
 


delbtn.addEventListener("click", ()=> 
{
    if (selectedTaskId === null) {
        return;
    }

    tasks = tasks.filter(task => task.id !== selectedTaskId);

    selectedTaskId = null;

    saveTask();
    renderTasks();
});

editbtn.addEventListener("click", ()=> {
    if (selectedTaskId === null) {
        return;
    }

    const task = tasks.find(item => item.id === selectedTaskId);

    if (!task) {
        return;
    }

    const newText = input.value.trim();

    if (newText === "") {
        return;
    }

    task.text = newText;
    input.value = "";
    selectedTaskId = null;

    saveTask();
    renderTasks();
});

renderTasks();
