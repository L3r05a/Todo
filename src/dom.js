const projects = document.getElementById("projects");
const projectsDiv = document.getElementById("projectsDiv");
const todos = document.getElementById("todo");
const addProjectButton= document.getElementById("addPro");
const taskList = document.getElementById("taskList");


import { taskForm } from "./forms.js";
import { displayProjectTasks } from "./index.js";
import { format } from "date-fns";
import { countingDays } from "./utils.js";
import { editTaskForm } from "./forms.js";


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

    //class assigner based on priority for css styling
    nameContainer.classList = todo.priority 

        ? "priorityTaskTitle"

        : "taskTitle";
    
        const title = todo.title;
        
        nameContainer.textContent= title;

    const dateContainer = document.createElement("div")

    dateContainer.classList = 'dateContainer';
        //date-fns formatting function
        const date = new Date (todo.dueDate); 
        const formattedDate =
            
        format(date, 'PPP');

        dateContainer.textContent= `Due: ${formattedDate}`;

    const daysLeft = document.createElement("div");
    daysLeft.classList = "daysLeft";

    const text = countingDays(days)

    daysLeft.textContent = text;


    //Details toggle display logic
    if (todo.details ) {

    const detailsToggle = document.createElement("div");

    detailsToggle.classList = "detailsHotword";
    detailsToggle.textContent = "Click for details";

    let showingDetail = false;

    detailsToggle.addEventListener(("click"), () => {

        if (showingDetail) {

            detailsToggle.textContent = "Click for details";
            detailsToggle.classList = "detailsHotword";

            } else {

            detailsToggle.textContent = todo.details;
            detailsToggle.classList = "detailsTask";
            };

            //boolean toggle(flips to opposite)
            showingDetail = !showingDetail;
    });          
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
    completeCheckboxLabel.textContent = "Complete?";

    

    completeCheckbox.addEventListener("change", () =>{
        
        todo.completed = completeCheckbox.checked;
        console.log(todo.completed)
    });

    
    completeToggle.appendChild(completeCheckbox);
    completeToggle.appendChild(completeCheckboxLabel);
    

    daysLeft.appendChild(completeToggle);

    //EDIT TASK BUTTON
    const editTask = document.createElement("div");
    editTask.classList = "editTask";

    const editButton = document.createElement("button");
    editButton.id = `edit-${todo.id}`;
    editButton.textContent = "Edit";

    editButton.addEventListener("click", () => 
        {//clears Tasklist
        while (taskList.firstChild)
        {
            taskList.removeChild(taskList.firstChild);
        };

        editTaskForm(todo);


    })

    editTask.appendChild(editButton)
    nameContainer.appendChild(editTask);


    

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
