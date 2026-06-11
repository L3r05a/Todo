import "./styles.css";
import {createTodo} from "./todo.js"
import {CreateProject} from "./projects.js"
import {renderProject} from "./dom.js"
import {renderTodo} from "./dom.js";
import {initListeners} from "./listeners.js";


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
//calls render
function updateProjectTasks (newTask) 
{
    projectsList.forEach((element) =>
        {
        if (newTask.projectOwner === element.id )
            {
        element.tasks.push(newTask);
        renderTodo(newTask);
            ;}
         });
 
};

//clears rendered tasks
//calls render on clicked projects' tasks
export function displayProjectTasks (projectID) {

        while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    };

    projectsList.forEach((project) =>{
        if(projectID === project.id){

            project.tasks.forEach(task => {
                renderTodo(task)
                // console.log(task.title);
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
export function taskMaker(title, projectID) {
const newTask = createTodo(title, projectID);
updateProjectTasks(newTask);

};






