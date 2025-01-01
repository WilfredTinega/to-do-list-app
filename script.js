const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const getDate = document.getElementById("today");

window.onload = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        displayTask(task.text, task.completed);
    });
};

function displayTask(taskText, isCompleted = false) {
    let li = document.createElement("li");
    let spanLeft = document.createElement("span");
    let span = document.createElement("span");
    let span2 = document.createElement("span");
    let span3 = document.createElement("span");
    let span4 = document.createElement("span");

    spanLeft.className = "span-left";
    span.classList = "material-symbols-outlined checked span-check";
    span.textContent = "check_circle";
    span2.className = "input-data";
    span2.textContent = taskText;
    span4.className = "material-symbols-outlined";
    span4.textContent = "circle";

    let isReplaced = isCompleted;

    if (isReplaced) {
        spanLeft.replaceChild(span, span4);
        span2.style.textDecoration = "line-through";
    }

    span2.addEventListener("click", () => {
        if (isReplaced === false) {
            spanLeft.replaceChild(span, span4);
            isReplaced = true;
            span2.style.textDecoration = "line-through";
        } else {
            spanLeft.replaceChild(span4, span);
            isReplaced = false;
            span2.style.textDecoration = "none";
        }
        updateLocalStorage();
    });

    span3.className = "material-symbols-outlined close";
    span3.textContent = "close";
    span3.addEventListener("click", () => {
        li.remove();
        updateLocalStorage();
    });

    li.appendChild(spanLeft);
    spanLeft.appendChild(span4);
    spanLeft.appendChild(span2);
    li.appendChild(span3);

    listContainer.appendChild(li);
}

function updateLocalStorage() {
    const tasks = [];
    const listItems = listContainer.getElementsByTagName("li");
    for (let item of listItems) {
        const text = item.querySelector(".input-data").textContent;
        const completed = item.querySelector(".span-left .material-symbols-outlined.checked") !== null;
        tasks.push({ text, completed });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    if (inputBox.value === "") {
        alert("Write something!");
    } else {
        displayTask(inputBox.value);
        updateLocalStorage();
    }
    inputBox.value = "";
}

inputBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

getDate.innerHTML = new Date().getFullYear();
