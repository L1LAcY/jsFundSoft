document.addEventListener('DOMContentLoaded', function() {
    var taskInput = document.getElementById('taskInput');
    var addTaskButton = document.getElementById('addTaskButton');
    var taskList = document.getElementById('taskList');
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach(function(task, index) {
        var li = document.createElement('li');
        li.textContent = task;
        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'editButton';
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';

        deleteButton.addEventListener('click', function() {
          tasks.splice(index, 1);
          localStorage.setItem('tasks', JSON.stringify(tasks));
          renderTasks();
        });
  
        editButton.addEventListener('click', function() {
          var updatedTask = prompt('Edit task:', task);
          if (updatedTask !== null) {
            tasks[index] = updatedTask;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
          }
        });
  
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
      });
    }
  
    addTaskButton.addEventListener('click', function() {
      var task = taskInput.value.trim();
      if (task !== '') {
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        taskInput.value = '';
      }
    });
  
    renderTasks();
  });