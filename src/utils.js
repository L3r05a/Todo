import { clearsDomProjects } from "./dom.js";
import { projectsList } from "./index.js";
import { renderProject } from "./dom.js";

//Enumerate forms in document and returns lenght value
export function formTest () {

const formTest = document.querySelectorAll(`form`);

return formTest.length;
    
};

//Task Due Date text response 
export function countingDays (days) {
        if (days === 0) {return "Due today."}


    const dayWord = Math.abs(days) === 1 ? "day" : "days";

    if (days > 0) {
        return `Due in ${days} ${dayWord}.`;
    };

    return `${Math.abs(days)} ${dayWord} overdue.`;

};

//Clears and re-renders the Projects Dom element
export function refreshProjects () {

    clearsDomProjects();

    projectsList.forEach((element) => {
         renderProject(element);
 
   });
}

export function recalculateProjectCompletion(projectMatch) {

    const hasTasks = projectMatch.tasks.length > 0;
    
    const allCompleted = projectMatch.tasks.every(task => task.completed);

    projectMatch.completed = hasTasks && allCompleted;
}


