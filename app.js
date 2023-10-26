document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskButton = document.getElementById('addTask');
  const taskList = document.getElementById('taskList');
  const saveTasksButton = document.getElementById('saveTasks');
  const deleteTasksButton = document.getElementById('deleteTasks');

  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function renderTasks() {
    taskList.innerHTML = '';
    savedTasks.forEach((task, index) => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.innerText = task.text;
      span.className = task.done ? 'todo-list-item completed' : 'todo-list-item';

      const doneButton = document.createElement('button');
      doneButton.className = 'todo-button todo-done-button';
      doneButton.textContent = task.done ? 'Undo' : 'Done';
      doneButton.onclick = () => toggleTask(index);
      const deleteButton = document.createElement('button');
      deleteButton.className = 'todo-button todo-delete-button';
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => deleteTask(index);

      li.appendChild(span);
      li.appendChild(doneButton);
      li.appendChild(deleteButton);

      taskList.appendChild(li);
    });
  }

  renderTasks();

  addTaskButton.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text !== '') {
      savedTasks.push({ text, done: false });
      taskInput.value = '';
      renderTasks();
    }
  });

  saveTasksButton.addEventListener('click', () => {
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
  });

  deleteTasksButton.addEventListener('click', () => {
    savedTasks.length = 0;
    renderTasks();
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
  });

  window.toggleTask = (index) => {
    savedTasks[index].done = !savedTasks[index].done;
    renderTasks();
  };

  window.deleteTask = (index) => {
    savedTasks.splice(index, 1);
    renderTasks();
  };
});
