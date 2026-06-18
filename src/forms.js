import {displayProjectTasks, newProjectMaker} from "./index.js"

import {taskMaker} from "./index.js"

import {formTest} from "./utils.js"


const projects = document.getElementById("projects");

const todo = document.getElementById("todo");


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
        

    const dateInput = document.createElement("input");

        dateInput.type = "date";
        dateInput.id = "task-date";
        dateInput.required = true;

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
                projectID: projectID});
            
        
            taskFormDiv.remove();

            displayProjectTasks(projectID);
            
        };

    form.appendChild(titleLabel);
    form.appendChild(nameInput);
    form.appendChild(dateLabel);
    form.appendChild(dateInput);
    form.appendChild(submit);
    form.appendChild(cancelTaskButton);
    taskFormDiv.appendChild(form);
    todo.appendChild(taskFormDiv);
};