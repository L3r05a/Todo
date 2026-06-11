import {newProjectMaker} from "./index.js"

import {taskMaker} from "./index.js"

import {formTest} from "./utils.js"


const projects = document.getElementById("projects");

const todo = document.getElementById("todo");


export function projectForm () {

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

    const label = document.createElement("label");

        label.htmlFor = "task-title";
        

    const input = document.createElement("input");

        input.type = "text";
        input.id = "task-title";
        input.placeholder="task name..."
        input.required = true;

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
            taskMaker(input.value, projectID);
           
            taskFormDiv.remove();
            
        };

    
    form.appendChild(label);
    form.appendChild(input)
    form.appendChild(submit);
    form.appendChild(cancelTaskButton);
    taskFormDiv.appendChild(form);
    todo.appendChild(taskFormDiv);
};