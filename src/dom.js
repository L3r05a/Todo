const projects = document.getElementById("projects");
const projectsDiv = document.getElementById("projectsDiv");
const todos = document.getElementById("todo");
const addProjectButton= document.getElementById("addPro");
const taskList = document.getElementById("taskList");


import {taskForm} from "./forms.js";
import {displayProjectTasks} from "./index.js";
import { format } from "date-fns";
import { countingDays } from "./utils.js";


//Renders Project 
export function renderProject (project) {

    //project container
    const container = document.createElement("div");
        
        container.classList="projectDiv";

    const text = project.title;
    const upped = text.toUpperCase();
        

    const projectItem = document.createElement("div");
          projectItem.textContent = upped;
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

export function renderTodo (todo, days) {

const taskContainer = document.createElement("div")
taskContainer.classList = "taskCards";

    const nameContainer = document.createElement("div");
    nameContainer.classList = "taskTitle"
    
        const title = todo.title;
        const upped = title.toUpperCase()

        nameContainer.textContent= upped;

    const dateContainer = document.createElement("div")
//date-fns formatting function
        const date = new Date (todo.dueDate); 
        const formattedDate =
            
        format(date, 'PPP');

        dateContainer.textContent= `Due: ${formattedDate}`;

    const daysLeft = document.createElement("div");

    const text = countingDays(days)

    daysLeft.textContent = text;


    
    taskList.appendChild(taskContainer);
    taskContainer.appendChild(nameContainer);
    taskContainer.appendChild(dateContainer);
    taskContainer.appendChild(daysLeft);
 
    

    
};

export function clearsDomProjects () {
     while(projectsDiv.firstChild) { 
                projectsDiv.removeChild(projectsDiv.firstChild); 
            };
        };

export function clearsDomTasks () {
     while(taskList.firstChild) { 
                taskList.removeChild(taskList.firstChild); 
            };
        };
