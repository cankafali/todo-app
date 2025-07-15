const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(text, completed = false) {
  const li = document.createElement("li");
  li.textContent = text;
  if (completed) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.onclick = e => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;
  createTaskElement(text);
  saveTasks();
  taskInput.value = "";
}

function filterTasks(filter) {
  document.querySelectorAll("li").forEach(li => {
    const isCompleted = li.classList.contains("completed");
    if (filter === "all") li.style.display = "";
    else if (filter === "completed") li.style.display = isCompleted ? "" : "none";
    else if (filter === "pending") li.style.display = !isCompleted ? "" : "none";
  });
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

window.onload = loadTasks;
