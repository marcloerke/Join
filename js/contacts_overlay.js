//assign contact to new task

function addTaskTemplate() {
    return /*html*/ `
  
  <div id="layover" onclick="closeAddTask()" class="layover ">
      <div onclick="stopPropagation(event)" class="popup-container">
  
        <div id="taskCard" class="task-card">
          <h1>Add Task</h1>
          <div class="column-container form">
            <div class="column-left">
              <label for="title">Title</label>
              <input type="text" id="title" placeholder="Enter a title" />
              <p class="required"></p>
  
              <label for="name" class="mt-15">Description</label>
              <textarea id="description" placeholder="Enter a description"></textarea>
              <p class="required"></p>
              <label class="mt-15" for="selectCategory">Category</label>
              <div class="category-input-container">
                <input readonly id="selectCategory" value="Select task category"></input>
  
                <img src="assets/img/icon_triangle.png" id="addCategoryIcon">
                <div id="categoryDot"></div>
                <div id="categoryOninput">
                  <img src="assets/img/icon_clear.png" id="clearCategory">
                  <img src="assets/img/icon_done.png" id="addCategory">
                </div>
              </div>
  
              <div id="dropdownContainer"></div>
              <div id="colorContainer">
                <div class="color-dot orange"></div>
                <div class="color-dot red"></div>
                <div class="color-dot blue"></div>
                <div class="color-dot lightblue"></div>
                <div class="color-dot pink"></div>
                <div class="color-dot lightpink"></div>
                <div class="color-dot green"></div>
                <div class="color-dot turquo"></div>
              </div>
              <p class="required"></p>
  
              <label for="assignedTo">Assigned to</label>
              <div class="contact-input-container">
                <input readonly id="assignedTo" value="Select contacts to assign"></input>
                <img src="assets/img/icon_triangle.png" id="addContactIcon">
              </div>
              <div id="contactsDropdownContainer"></div>
            </div>
            <div class="column-right">
              <label for="date">Due Date</label>
              <input type="date" id="date" min="">
              <p class="required"></p>
              <label class="mt-15" for="prio">Prio</label>
              <div id="prio" class="prio">
                <div class="prio-btn">Urgent
                  <img src="assets/img/icon_up.png" alt="sda">
                </div>
                <div class="prio-btn">Medium
                  <img src="assets/img/icon_medium.png" alt="sda">
                </div>
                <div class="prio-btn">Low
                  <img src="assets/img/icon_down.png" alt="sda">
                </div>
              </div>
              <p class="required"></p>
              <label for="addSubtask" class="mt-15">Subtasks</label>
              <div class="subtask-input-container">
                <input type="text" id="addSubtask">
                <img src="assets/img/icon_plus.png" id="addSubtaskIcon">
                <div id="subtaskOninput">
                  <img src="assets/img/icon_clear.png" id="clearSubtaskInput">
                  <img src="assets/img/icon_done.png" id="finishEditingSubtask">
                </div>
              </div>
              <div id="subtaskContainer"></div>
              <div class="action-button-container">
                <button id="clear">
                  Clear
                  <img src="assets/img/icon_close.png">
                </button>
                <button id="create">
                  Create Task
                  <img src="assets/img/icon_create.png">
                </button>
              </div>
            </div>
  
          </div>
        </div>
      </div>
    </div>
  
    `;
  }
  
  function renderTaskOverlay() {
    
  }