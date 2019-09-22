const taskInput = document.querySelector('#task');
const form = document.querySelector('.task-form');
const filter = document.querySelector('#filter');
const clearTaskButton = document.querySelector('.clear-tasks');
const taskList = document.querySelector('.collection');

onInit();

function onInit() {
  handleInitialLocalStorage();
  setEventListeners();
}

function handleInitialLocalStorage() {
  const tasks = getLocalStorageTasks();
  if (tasks) {
    tasks.forEach(function (task) {
      const li = buildTaskItem(task);
      taskList.appendChild(li);
    });
  }
}

function setEventListeners() {
  form.addEventListener('submit', addTask);
  clearTaskButton.addEventListener('click', clearAllTasks);
  taskList.addEventListener('click', deleteTask);
  filter.addEventListener('keyup', filterTask);
}

function addTask(e) {
  e.preventDefault();
  const taskTitle = taskInput.value;
  if (taskTitle) {
    addTaskToLocalStorage(taskTitle);
    taskList.appendChild(buildTaskItem(taskTitle));
    clearInput();
  }
}

function addTaskToLocalStorage(task) {
  let tasks = getLocalStorageTasks();
  if (tasks) {
    tasks.push(task);
  } else {
    tasks = Array(task);
  }
  setLocalStorageTasks(tasks);
}

function getLocalStorageTasks() {
  return JSON.parse(localStorage.getItem('tasks'));
}

function setLocalStorageTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function buildTaskItem(taskTitle) {
  const li = document.createElement('li');
  const deleteIcon = buildTaskDeleteIcon();
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskTitle));
  li.appendChild(deleteIcon);
  return li;
}

function buildTaskDeleteIcon() {
  const deleteIcon = document.createElement('a');
  deleteIcon.className = 'delete-item secondary-content';
  deleteIcon.innerHTML = '<i class="fa fa-remove"></i>';
  return deleteIcon;
}

function clearInput() {
  taskInput.value = '';
}

function clearAllTasks() {
  while (taskList.firstChild) {
    taskList.firstChild.remove();
  }
  localStorage.removeItem('tasks');
}

function deleteTask(e) {
  if (e.target.tagName === 'I') {
    const li = e.target.parentElement.parentElement;
    li.remove();
    removeLocalStorageTask(li.textContent);
  }
}

function removeLocalStorageTask(deletedTask) {
  let tasks = getLocalStorageTasks();
  tasks = tasks.filter(function (task) {
    return !(task === deletedTask);
  });
  setLocalStorageTasks(tasks);
}

function filterTask(e) {
  const filterText = e.target.value.toLowerCase();
  const list = document.querySelectorAll('.collection-item');
  list.forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(filterText)) {
      task.style.display = 'none';
    }
    else {
      task.style.display = 'block';
    }
  });
}
