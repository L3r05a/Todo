import "./styles.css";
import {createTodo} from "./todo.js"
import {CreateProject} from "./projects.js"
import {renderProject} from "./dom.js"
import { clearsDomProjects } from "./dom.js";
import { clearsDomTasks } from "./dom.js";
import {renderTodo} from "./dom.js";
import {initListeners} from "./listeners.js";
import { compareAsc, differenceInCalendarDays } from "date-fns";
import { refreshProjects } from "./utils.js"
import { loadStorage } from "./storage.js"
import { saveStorage } from "./storage.js"
import { taskBannerReset } from "./dom.js";
import { recalculateProjectCompletion } from "./utils.js";

const taskList = document.getElementById("taskList");

//All Projects array with all related tasks
export const projectsList = [];

//Add project to array function
function addToProjList (pro) {
projectsList.push(pro);

};

//Delete Project
export function deleteProjectItem(projectID) {
    const projectToRemove = projectsList.findIndex((project) => project.id === projectID);

    projectsList.splice(projectToRemove, 1);

    saveStorage();
    refreshProjects()
    taskBannerReset();
    clearsDomTasks();

}

//Initialise listeners
initListeners();
loadStorage()

//adds tasks to matching projects array
//calls task render
function updateProjectTasks (newTask) 
{
    const projectToUpdate = projectsList.find((element) =>
        
        newTask.projectOwner === element.id) 
            
        //Pushed new task into its own Project tasks array
        projectToUpdate.tasks.push(newTask);
        
 
};

//Complets Project if ALL its asks are completed

export function updateTaskCompletion (todoID, completed){
    
    //finds Project's completion to update
    const projectToUpdate = 
    projectsList.find((project) => 
    project.tasks.some((task) => task.id === todoID));

    //finds task completion to update
    const taskToUpdate = projectToUpdate.tasks.find((task) => task.id === todoID);
    
    //Updates todo array completed status from DOM
    taskToUpdate.completed = completed;


    recalculateProjectCompletion(projectToUpdate);

    saveStorage();
    refreshProjects();
}

//Task Edit
 export function editTask(todo, updatedData) {

//Find project and task 
 const projectMatch = projectsList.find((element) => element.id === todo.projectOwner);
 const taskMatch = projectMatch.tasks.find((element) => element.id === todo.id);

 taskMatch.title = updatedData.title;
 taskMatch.dueDate = updatedData.dueDate;
 taskMatch.priority = updatedData.priority;
 taskMatch.details = updatedData.details;

saveStorage();

displayProjectTasks(todo.projectOwner);


 };

 //delete task from projectsList
export function deleteTask (todo) {

//find matching project ID
const projectMatch = projectsList.find((element) => element.id === todo.projectOwner);
//index of matching task ID
const taskMatch = projectMatch.tasks.findIndex((element) => element.id === todo.id);

//Splice indexed task from project array
projectMatch.tasks.splice(taskMatch, 1)

//check if deleting the tasks affected project completion
recalculateProjectCompletion(projectMatch);

saveStorage();
refreshProjects();
displayProjectTasks(todo.projectOwner)

}

//clears rendered tasks
//calls render on clicked projects' tasks
export function displayProjectTasks (projectID) {
        //Clears tasks div
        while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    };

    //Finds matching project
    const project = projectsList.find((element) => element.id === projectID);

    //guard against invalid/obsolete projectID
    if (!project) return;

            //Sorts tasks based on dates proximity using date-fns
            project.tasks.sort((a,b) =>
            compareAsc(
                new Date(a.dueDate),
                new Date(b.dueDate)
            ))
            
            project.tasks.forEach(task => {

//Checks due date today/calendar days count
            const dueDate = new Date (task.dueDate);
            
            //calendar days between due date and creation date
            const daysToGo = differenceInCalendarDays(
                    
                dueDate,
                new Date(),                      
            );
            
            renderTodo(task, daysToGo)
                
            });      
        };


//Calls New Project using form
export function newProjectMaker(title) {

    const newProject = new CreateProject(title);
    addToProjList(newProject);
    saveStorage();
    renderProject(newProject);

};

//Calls New task from form
export function taskMaker(taskData) 
    {

        const newTask = createTodo(taskData);
        updateProjectTasks(newTask);
        saveStorage();
        renderTodo(newTask);
        

    };






