document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addBtn").addEventListener("click", addTask);
    document.getElementById("sortTasks").addEventListener("change", sortTasks);
  });
  
  const taskArray = [];
  
  function addTask() {
    const taskInput = document.getElementById("taskInput");
    const timeInput = document.getElementById("timeInput");
    const priority = document.getElementById("prioritySelect").value;
    const taskText = taskInput.value.trim();
    const taskTime = timeInput.value;
    if (taskText === "") return;
  
    const task = { text: taskText, time: taskTime, priority, completed: false };
    taskArray.push(task);
    renderTasks();
  
    taskInput.value = "";
    timeInput.value = "";
  }
  
  function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    taskArray.forEach((task, index) => {
      const li = document.createElement("li");
      li.classList.add(`priority-${task.priority}`);
      if (task.completed) li.classList.add("completed");
      li.innerHTML = `
        <div class="task-details">
          <span>${task.text}</span>
          <small class="task-time">${task.time}</small>
        </div>
        <div>
          <button class="edit-btn" onclick="editTask(${index})">Edit</button>
          <button class="delete-btn" onclick="removeTask(${index})">Delete</button>
        </div>
      `;
      li.addEventListener("click", function (e) {
        if (e.target.tagName !== 'BUTTON') {
          task.completed = !task.completed;
          renderTasks();
        }
      });
      taskList.appendChild(li);
    });
  }
  
  function removeTask(index) {
    taskArray.splice(index, 1);
    renderTasks();
  }
  
  function editTask(index) {
    const task = taskArray[index];
    const newText = prompt("Edit task:", task.text);
    if (newText !== null) {
      task.text = newText.trim() || task.text;
      renderTasks();
    }
  }
  
  function sortTasks() {
    const criteria = document.getElementById("sortTasks").value;
    if (criteria === "time") {
      taskArray.sort((a, b) => (a.time > b.time ? 1 : -1));
    } else if (criteria === "priority") {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      taskArray.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }
    renderTasks();
  }
  