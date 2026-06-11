const projects = document.getElementById("projects");
const projectsDiv = document.getElementById("projectsDiv");
const todos = document.getElementById("todo");
const addProjectButton= document.getElementById("addPro");


import {taskForm} from "./forms.js";

import {displayProjectTasks} from "./index.js";


//Renders Project 
export function renderProject (project) {

    //project container
    const container = document.createElement("div");
        
        container.classList="projectDiv";

    const text = project.title;
        

    const projectItem = document.createElement("div");
          projectItem.textContent= text;
          projectItem.classList="projectItem";

    projectItem.addEventListener("click", () => {
        //project title displays project's tasks
        displayProjectTasks(project.id);
    });
    
    //Task Add button
    const addButton = document.createElement("button");
    addButton.id= project.id;
    addButton.textContent = "Add task";

    ;
    container.appendChild(projectItem);
    container.appendChild(addButton)
    projectsDiv.appendChild(container);

    

    //listener for dynamically created task button
    addButton.addEventListener("click", () => {
    
    //Removes taskForm if already there
    const existingForm = document.getElementById("taskForm");
    if (existingForm != null) {
        existingForm.remove();
    }
    
    //button display this project's tasks
    displayProjectTasks(project.id);

        //calls Task Form with project ID value
    taskForm(project.id);
    

    });
    
};

export function renderTodo (todo) {

    const container = document.createElement("div");
    
    const text = todo.title;
    
    container.textContent= text;
    
    taskList.appendChild(container);
    
};


