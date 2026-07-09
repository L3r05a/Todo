import {
    displayProjectTasks,
    editTask,
    newProjectMaker,
    taskMaker} 
from "./index.js"

import {formTest} from "./utils.js"

const projects = document.getElementById("projects");
const todo = document.getElementById("todo");
const taskList = document.getElementById("taskList");


export function projectForm () {

    //check for existing forms in the DOM
    if (formTest() > 0) return;  

    const proFormDiv = document.createElement("div");
    proFormDiv.classList = "projectForm";
    
    const form = document.createElement("form");

        form.action = '';
        form.method = "post";

    const label = document.createElement("label");

        label.htmlFor = "project-title";
        label.textContent = "New Project"
        
    const input = document.createElement("input");

        input.type = "text";
        input.id = "project-title";
        input.placeholder="Project title...";
        input.required = true;

    const proButtonGroup = document.createElement("div");
    proButtonGroup.classList = ("proButtonGroup");

    const submit = document.createElement("button");

        submit.type = "submit";
        submit.textContent="Enter";
        submit.id="projButtonID";

    //cancel project form button logic
    const cancelPro = document.createElement("button");

    cancelPro.type = "button";
    cancelPro.textContent = "Cancel";
    

    cancelPro.addEventListener("click", () => {
        proFormDiv.remove();
    })

    function handleSubmit(event){
            event.preventDefault();
            const title = input.value.trim();
            if (!title)return;
            newProjectMaker(title);
            proFormDiv.remove();
    };

    form.addEventListener("submit", handleSubmit);

    form.appendChild(label);
    form.appendChild(input)
    form.appendChild(proButtonGroup)
    proButtonGroup.appendChild(submit);
    proButtonGroup.appendChild(cancelPro);
    proFormDiv.appendChild(form);
    projects.appendChild(proFormDiv);
};

export function taskForm (projectID) {

    if (formTest() > 0) return;  


    const taskFormDiv = document.createElement("div");
    taskFormDiv.classList = "taskForm";
    

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

    const priorityGroup = document.createElement("div");
    priorityGroup.classList= "priorityGroup";

    const priorityInput = document.createElement("input");
        priorityInput.type = "checkbox";
        priorityInput.id = "priority";

    const priorityLabel = document.createElement("label");
        priorityLabel.htmlFor = "priority"
        priorityLabel.textContent = "Priority?"
        

    const detailsLabel = document.createElement("label");
        detailsLabel.htmlFor = "details";
        detailsLabel.textContent = "Enter details";

    const detailsInput = document.createElement("textarea");
        
        detailsInput.id = ("details");
        detailsInput.rows = 5;
        detailsInput.cols = 33;
        detailsInput.placeholder = "..."
     
const buttonGroup = document.createElement('div');
buttonGroup.classList = "buttonGroup";
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

    form.addEventListener("submit", handleSubmit);

    function handleSubmit(event){
            event.preventDefault();
            //object
            taskMaker({
                title: nameInput.value, 
                dueDate: dateInput.value,
                priority: priorityInput.checked,
                details: detailsInput.value,
                projectID});
            
        
            taskFormDiv.remove();

            displayProjectTasks(projectID);

            
        };

    
    form.appendChild(nameInput);
    form.appendChild(priorityGroup)
    priorityGroup.appendChild(priorityInput);
    priorityGroup.appendChild(priorityLabel);
    form.appendChild(dateLabel);
    form.appendChild(dateInput);
    form.appendChild(detailsLabel)
    form.appendChild(detailsInput)
    form.appendChild(buttonGroup);
    buttonGroup.appendChild(submit);
    buttonGroup.appendChild(cancelTaskButton);
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
        label.textContent = 'Title';

    const input = document.createElement("input");

        input.type = "text";
        input.id = "task-title",
        input.value = todo.title,
        input.required = true;

const dateLabel = document.createElement("label");
dateLabel.textContent = "Due Date?"
            
const dateInput = document.createElement("input");

        dateInput.type = "date";
        
        dateInput.value = todo.dueDate
        dateInput.required = true;

const priorityEditGroup = document.createElement("div");
    priorityEditGroup.classList= "priorityEditGroup";

const priorityLabel = document.createElement("label");

        priorityLabel.textContent = "Priority?"
        
const priorityInput = document.createElement("input");

        priorityInput.type = "checkbox";
        
        priorityInput.checked = todo.priority;

 const detailsLabel = document.createElement("label");
 detailsLabel.textContent = "Details"     

const detailsInput = document.createElement("textarea");
        
        detailsInput.rows = 5;
        detailsInput.cols = 33;
        //Populates text area on reload if todo.details has content
        
        detailsInput.value = todo.details ?? "";
        
                

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
form.appendChild(priorityEditGroup)
priorityEditGroup.appendChild(priorityLabel);
priorityEditGroup.appendChild(priorityInput);

    form.appendChild(detailsLabel);
    form.appendChild(detailsInput);

form.appendChild(submit);
form.appendChild(cancelTaskButton)
editTaskDiv.appendChild(form);
taskList.appendChild(editTaskDiv);

form.addEventListener("submit", handleSubmit);

    function handleSubmit(event){
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