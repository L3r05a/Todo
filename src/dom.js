// const projects = document.getElementById("projects");
const projectsDiv = document.getElementById("projectsDiv");
// const todos = document.getElementById("todo");
// const addProjectButton= document.getElementById("addPro");
const taskList = document.getElementById("taskList");
const tasksBanner = document.getElementById("tasksBanner");

import { taskForm } from "./forms.js";
import { displayProjectTasks } from "./index.js";
import { format } from "date-fns";
import { countingDays } from "./utils.js";
import { editTaskForm } from "./forms.js";
import { deleteTask} from "./index.js";
import { formTest } from "./utils.js"
import { updateTaskCompletion } from "./index.js";
import { deleteProjectItem } from "./index.js"



//Renders Project 
export function renderProject (project) {

    //projects container
    const container = document.createElement("div");
        container.id = project.id;
        //Assigns classlist using switch
        container.classList = project.completed
        ? "projectCompleted"
        : "projectDiv";

    const text = project.title;
    const upped = text.toUpperCase();
    const addText = " (click to display tasks)";
    ;
        
    //project title
    const projectItem = document.createElement("div");
          projectItem.textContent = upped + addText;

          projectItem.classList="projectItem";

    projectItem.addEventListener("click", () => {

        //project title displays project's tasks
        proTaskBanner (project)
        displayProjectTasks(project.id);
        
    });
    
    //Task Add button
    
    const addButton = document.createElement("button");
    addButton.id= project.id;
    addButton.classList = "addButton"
    addButton.textContent = "Add task";

    container.appendChild(projectItem);
    container.appendChild(addButton)
    projectsDiv.appendChild(container);

    //listener for dynamically created task button
    addButton.addEventListener("click", () => {
    
    //prevents creating more than one form
    let test = formTest();
    if (test > 0) {
        return;
    };  
    
    //button display this project's tasks
    displayProjectTasks(project.id);

    //calls Task Form with project ID value
    taskForm(project.id);

    });

    const deleteProject =document.createElement("button");
    deleteProject.id = project.id;
    deleteProject.classList = "deleteproject";
    deleteProject.textContent = "Delete?";
    container.appendChild(deleteProject);

    deleteProject.addEventListener(('click'), () => {
        deleteProjectItem (project.id);
        
    })

};

export function renderTodo (todo, days) {

const taskContainer = document.createElement("div");
if(todo.completed)
    {
    taskContainer.classList = "taskCompleted";
    } else {
taskContainer.classList = "taskCards"
            };

//Task name and Edit button helper call
    const nameContainer = createTitleSection(todo);

// Date container Helper
    const dateContainer = createDateSection(todo);

//Footer Section helper
    const footer = createFooterSection(todo, days)
    

taskList.appendChild(taskContainer);
taskContainer.appendChild(nameContainer);
taskContainer.appendChild(dateContainer);
taskContainer.appendChild(footer);
    
};

//Title and Edit elements helper
function createTitleSection (todo) {

const nameContainer = document.createElement("div");


    //class assigner based on priority for css styling
    nameContainer.classList = todo.priority 

            ? "priorityTaskTitle"

            : "taskTitle";
        
            const title = todo.title;
            
            nameContainer.textContent= title;

//Edit Task button
    const editTask = document.createElement("div");
    editTask.classList = "editTask";

    const editButton = document.createElement("button");
    editButton.id = `edit-${todo.id}`;
    editButton.textContent = "Edit";

    editButton.addEventListener("click", () => {

    let test = formTest();
    if (test > 0) {
    return;
    }  

            //stops editing if completed
            if(todo.completed){
                return
            };
            //clears Tasklist
            while (taskList.firstChild)
            {
                taskList.removeChild(taskList.firstChild);
            };

            //calls editform
            editTaskForm(todo);
    });

    editTask.appendChild(editButton)
    nameContainer.appendChild(editTask);

return nameContainer

};

//Date section
function createDateSection (todo) {   

 const dateContainer = document.createElement("div")

    dateContainer.classList = 'dateContainer';
        //date-fns formatting function
        const date = new Date (todo.dueDate); 
        const formattedDate =
            
        format(date, 'PPP');

        dateContainer.textContent= `Due: ${formattedDate}`;


return dateContainer;


};
    
function createFooterSection (todo, days) {

// days Left function reference and Div
    const daysLeft = document.createElement("div");
    daysLeft.classList = "daysLeft";

    const text = countingDays(days)

    daysLeft.textContent = text;

//Details toggle display logic
    if (todo.details ) {

    const detailsToggle = document.createElement("div");

    detailsToggle.classList = "detailsHotword";

    const detailsText = document.createElement("div");
    detailsText.textContent = "Click for details";
    detailsText.classList = "hovered"

    let showingDetail = false;

    detailsText.addEventListener(("click"), () => {

        if (showingDetail) {

            detailsText.textContent = "Click for details";
            detailsText.classList = "hovered";

            } else {

            detailsText.textContent = todo.details;
            detailsText.classList = "detailsTask";
            const closeButton = document.createElement("button");
            closeButton.classList=("detailsClose");
            closeButton.textContent = "Close";
            detailsText.appendChild(closeButton);
            closeButton.addEventListener(("click"), () => {
                showingDetail;
            })
            };

            //boolean toggle(flips to opposite)
            showingDetail = !showingDetail;
    }); 
        detailsToggle.appendChild(detailsText);   
        daysLeft.appendChild(detailsToggle);        

        
    };

//complete checkbox
    const completeToggle = document.createElement("div");
    completeToggle.classList = "completeToggle";

    const completeCheckbox = document.createElement("input");
    completeCheckbox.type = "checkbox";
    completeCheckbox.id = `complete-${todo.id}`;
    completeCheckbox.checked = todo.completed;

    const completeCheckboxLabel = document.createElement("label");
    
    completeCheckboxLabel.htmlFor = `complete-${todo.id}`;

    completeCheckboxLabel.textContent = "Completed";

    completeCheckbox.addEventListener("change", () =>{
    
    //Calls Updater for Project/Task complete status
    updateTaskCompletion(todo.id, completeCheckbox.checked);
    
    //Calls refresh on Project display
    displayProjectTasks(todo.projectOwner)

    });

    
    completeToggle.appendChild(completeCheckbox);
    completeToggle.appendChild(completeCheckboxLabel);
    

    daysLeft.appendChild(completeToggle);

//Delete task button 
    const deleteTaskDiv = document.createElement("div");
    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.textContent = "Delete?"
    deleteTaskButton.addEventListener(("click"), () => {
    deleteTask(todo);
        
});

    deleteTaskDiv.appendChild(deleteTaskButton);
    daysLeft.appendChild(deleteTaskDiv);


return daysLeft;


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


export function proTaskBanner (project) {
    while(tasksBanner.firstChild) { 
                tasksBanner.removeChild(tasksBanner.firstChild); };
    
    tasksBanner.textContent = `${project.title} Tasks`;
    tasksBanner.classList = 'taskBanner'
}

export function taskBannerReset () {

    while(tasksBanner.firstChild) { 
                tasksBanner.removeChild(tasksBanner.firstChild); };
    
    tasksBanner.textContent = `Tasks`;
    tasksBanner.classList = 'taskBanner'

};