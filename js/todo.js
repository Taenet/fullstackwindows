let inputTask = document.getElementById("todo-input");
let addBtn = document.getElementById("add-btn");
let todoList = document.getElementById("todo-list");
let allBtn = document.getElementById("filter-all");
let activeBtn = document.getElementById("filter-active");
let completedBtn = document.getElementById("filter-completed");
let clearBtn = document.getElementById("clear-completed")
let nItems = document.getElementById("n-items");

let taskArray = [
    {
        title: "Ir al gimnasio",
        completed: false,
    },
    {
        title: "Ir al mercado",
        completed: true,
    },
];

let currentTaskFilter = "all";

function showTask(){
    todoList.innerHTML = "";
    let taskFilter = taskArray.filter((task) => {
        if (currentTaskFilter === "active") return !task.completed;
        if (currentTaskFilter === "completed") return task.completed;
        return true;
    });

    taskFilter.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="todo-item ${task.completed ? "task-completed" : ""}">
                <input data-index = "${index}" type = "checkbox" ${task.completed ? "checked" : ""} />
                <span class="tarea">${task.title}</span>
            </div>
            <button>X</button>`;
            todoList.appendChild(li);
    });

    nItems.innerHTML = "";
    const span = document.createElement("span");
    span.innerHTML = `${taskArray.length} items`;
    nItems.appendChild(span)
}

addBtn.addEventListener("click", () => {
    let task = {
        title: inputTask.value,
        completed: false,
    };
    taskArray.push(task);
    inputTask.value = "";
    showTask();
});

showTask();


todoList.addEventListener("click", (evento) => {
    let index = evento.target.dataset.index;
    if (evento.target.tagName === "INPUT"){
        taskArray[index].completed = !taskArray[index].completed;
    }
    if (evento.target.TagName === "BUTON"){
        taskArray.splice(index, 1);
    }
    showTask();
});

allBtn.addEventListener("click", () => {
    currentTaskFilter = "all";
    allBtn.classList.add("active");
    activeBtn.classList.remove("active");
    completedBtn.classList.remove("active");
    showTask();
});

activeBtn.addEventListener("click", () => {
    currentTaskFilter = "active";
    allBtn.classList.remove("active");
    activeBtn.classList.add("active");
    completedBtn.classList.remove("active");
    showTask();
});

completedBtn.addEventListener("click", () => {
    currentTaskFilter = "completed";
    allBtn.classList.remove("active");
    activeBtn.classList.remove("active");
    completedBtn.classList.add("active");
    showTask();
});