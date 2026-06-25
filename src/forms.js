import {displayProjectTasks, newProjectMaker} from "./index.js"

import {taskMaker} from "./index.js"

import {formTest} from "./utils.js"

import {editTask} from "./index.js"


const projects = document.getElementById("projects");

const todo = document.getElementById("todo");

const taskList = document.getElementById("taskList");


export function projectForm () {

    //check for existing dom forms
    let test = formTest();
    if (test > 0) {
        return;
    } 

    const proFormDiv = document.createElement("div");
    proFormDiv.classList = "form";
    
    const form = document.createElement("form");

        form.action = '';
        form.method = "post";

    const label = document.createElement("label");

        label.htmlFor = "project-title";
        

    const input = document.createElement("input");

        input.type = "text";
        input.id = "project-title";
        input.placeholder="Project title...";
        input.required = true;

    const submit = document.createElement("button");

        submit.type = "submit";
        submit.textContent="Enter";
        submit.id="projButtonID";

    //cancel project form button logic
    const cancelPro = document.createElement("button");

    cancelPro.type = "button";
    cancelPro.textContent = "cancel";
    

    cancelPro.addEventListener("click", () => {
        proFormDiv.remove();
    })

    function preventsubmit(event){
            event.preventDefault();
            newProjectMaker(input.value);
            proFormDiv.remove();
    };

    form.addEventListener("submit", preventsubmit);

    form.appendChild(label);
    form.appendChild(input)
    form.appendChild(submit);
    form.appendChild(cancelPro);
    proFormDiv.appendChild(form);
    projects.appendChild(proFormDiv);
};

export function taskForm (projectID) {

    let test = formTest();
    if (test > 0) {
        return;
    }  


    const taskFormDiv = document.createElement("div");
    taskFormDiv.id = "taskForm";
    

    const form = document.createElement("form");

        form.action = '';
        form.method = "post";

    const titleLabel = document.createElement("label");

        titleLabel.htmlFor = "task-title";
        

    const nameInput = document.createElement("input");

        nameInput.type = "text";
        nameInput.id = "task-title";
        nameInput.placeholder="task name..."
        nameInput.required = true;

    const dateLabel = document.createElement("label");

        dateLabel.htmlFor = "task-date";
        dateLabel.textContent = "Due Date?"
        

    const dateInput = document.createElement("input");

        dateInput.type = "date";
        dateInput.id = "task-date";
        dateInput.required = true;


    const priorityLabel = document.createElement("label");

        priorityLabel.htmlFor = "priority"
        priorityLabel.textContent = "Priority?"

    const priorityInput = document.createElement("input");

        priorityInput.type = "checkbox";
        priorityInput.id = "priority";

    const detailsLabel = document.createElement("label");
        detailsLabel.htmlFor = "details";
        detailsLabel.textContent = "Enter details";

    const detailsInput = document.createElement("textarea");
        
        detailsInput.id = ("details");
        detailsInput.rows = 5;
        detailsInput.cols = 33;
        detailsInput.placeholder = "Add more information about this task..."
        
        
 
    const submit = document.createElement("button");

        submit.type = "submit";
        submit.textContent="Enter";
        submit.id="taskButtonID";

    const cancelTaskButton = document.createElement("button");
    cancelTaskButton.type = "button";
    cancelTaskButton.textContent = "cancel";

    cancelTaskButton.addEventListener("click", () => {
        taskFormDiv.remove();
    })

    form.addEventListener("submit", preventsubmit);

    function preventsubmit(event){
            event.preventDefault();
            //object
            taskMaker({
                title: nameInput.value, 
                dueDate: dateInput.value,
                priority: priorityInput.checked,
                details: detailsInput.value,
                projectID: projectID});
            
        
            taskFormDiv.remove();

            displayProjectTasks(projectID);

            
        };

    
    form.appendChild(nameInput);
    form.appendChild(priorityInput);
    form.appendChild(priorityLabel);
    form.appendChild(dateLabel);
    form.appendChild(dateInput);
    form.appendChild(detailsLabel)
    form.appendChild(detailsInput)
    form.appendChild(submit);
    form.appendChild(cancelTaskButton);
    taskFormDiv.appendChild(form);
    todo.appendChild(taskFormDiv);
};

//EDIT TASK FORM
export function editTaskForm(todo) {

const editTaskDiv = document.createElement("div");
    editTaskDiv.classList = "editTaskForm";
    
    const form = document.createElement("form");

        form.action = '';
        form.method = "post";


const label = document.createElement("label");

        label.htmlFor = "task-title";
        

    const input = document.createElement("input");

        input.type = "text";
        input.id = "task-title",
        input.value = todo.title,
        input.required = true;

const dateLabel = document.createElement("label");

    dateLabel.htmlFor = `task-date-${todo.id}`;
        
const dateInput = document.createElement("input");

        dateInput.type = "date";
        dateInput.id = `task-date-${todo.id}`;
        dateInput.value = todo.dueDate
        dateInput.required = true;

const priorityLabel = document.createElement("label");

        priorityLabel.htmlFor = `priority-${todo.id}`;
        priorityLabel.textContent = "Priority?"
        
const priorityInput = document.createElement("input");

        priorityInput.type = "checkbox";
        priorityInput.id = `priority-${todo.id}`;
        priorityInput.checked = todo.priority;

 const detailsLabel = document.createElement("label");
        detailsLabel.htmlFor = `details-${todo.id}`;
        

const detailsInput = document.createElement("textarea");
        
        detailsInput.id = `details-${todo.id}`;
        detailsInput.rows = 5;
        detailsInput.cols = 33;
        if (todo.details) {
        detailsInput.value = todo.details;
        };
                

    const submit = document.createElement("button");

        submit.type = "submit";
        submit.textContent="Enter";
        submit.id=`edit-${todo.id}`;


    const cancelTaskButton = document.createElement("button");

    cancelTaskButton.type = "button";
    cancelTaskButton.textContent = "cancel";

    cancelTaskButton.addEventListener("click", () => {
        editTaskDiv.remove();
        displayProjectTasks(todo.projectOwner);
    });

form.appendChild(label);
form.appendChild(input);
form.appendChild(dateLabel);
form.appendChild(dateInput);
form.appendChild(priorityLabel);
form.appendChild(priorityInput);

    form.appendChild(detailsLabel);
    form.appendChild(detailsInput);

form.appendChild(submit);
form.appendChild(cancelTaskButton)
editTaskDiv.appendChild(form);
taskList.appendChild(editTaskDiv);

form.addEventListener("submit", preventsubmit);

    function preventsubmit(event){
            event.preventDefault();
            const updatedTaskData =  
            {
                title: input.value,
                dueDate: dateInput.value,
                priority: priorityInput.checked,
                details: detailsInput.value,
                
            };

            editTask(todo, updatedTaskData);

            
        };
        

}