import "./styles.css";
import {createTodo} from "./todo.js"
import {CreateProject} from "./projects.js"
import {renderProject} from "./dom.js"
import {renderTodo} from "./dom.js";
import {initListeners} from "./listeners.js";
import { compareAsc, differenceInCalendarDays } from "date-fns";
import { isToday } from "date-fns";
import { isPast } from "date-fns";
import { differenceInDays } from "date-fns";
import { startOfDay } from "date-fns";
import { getTime } from "date-fns";


const taskList = document.getElementById("taskList");


//Projects array with related tasks
export const projectsList = [];

//Add project to array function
function addToProjList (pro) {
projectsList.push(pro);

};

//Initialise listeners
initListeners();

//adds tasks to matching projects array
//calls task render
function updateProjectTasks (newTask) 
{
    projectsList.forEach((element) =>
        {
        if (newTask.projectOwner === element.id )
            {
        //Pushed new task into its own Project tasks array
        element.tasks.push(newTask);
        renderTodo(newTask);
            ;}
            
         });
 
};

//Task Edit
 export function editTask(todo, updatedData) {
//Find project and task 
 const projectMatch = projectsList.find((element) => element.id === todo.projectOwner);
 const taskMatch = projectMatch.tasks.find((element) => element.id === todo.id);

 taskMatch.title = updatedData.title;
 taskMatch.dueDate = updatedData.dueDate;
 taskMatch.priority = updatedData.priority;
 taskMatch.details = updatedData.details;


 displayProjectTasks(todo.projectOwner)
console.log(projectsList)



 };
//clears rendered tasks
//calls render on clicked projects' tasks
export function displayProjectTasks (projectID) {
        //Clears tasks div
        while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    };
    //Matches tasks project owner ID to existing projectsID
    projectsList.forEach((project) =>{

        if(projectID === project.id){
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
    });
}

//Calls New Project using form
export function newProjectMaker(title) {

    const newProject = new CreateProject(title);
    addToProjList(newProject)
    renderProject(newProject);
};

//Calls New task from form
export function taskMaker(taskData) 
    {

        const newTask = createTodo(taskData);
        updateProjectTasks(newTask);
        // console.log(newTask)
        

    };






