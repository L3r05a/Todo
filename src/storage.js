import {projectsList} from "./index.js";
import {clearsDomProjects, clearsDomTasks, renderProject} from "./dom.js";




export function saveStorage () {
    localStorage.setItem("projects", 
        JSON.stringify(projectsList, null, 2)
    );
};

export function clearStorage () {
    localStorage.clear()

};

export function loadStorage () {
    const savedData =
    localStorage.getItem("projects");

    //empty storage default
        if(savedData === null){
        projectsList.length = 0;
        clearsDomProjects();
        clearsDomTasks();
        return;
    };

    //existing storage default
    const parsedData= JSON.parse(savedData);
       
    //clears Projects Lists
    projectsList.length = 0;

    //Pushes retrieved projects into ProjectsList
    parsedData.forEach((project) =>{
        projectsList.push(project);
    });
    //clears DOM
    clearsDomProjects();
    clearsDomTasks();
    
    //renders each project
    projectsList.forEach((element) => {
        renderProject(element);
 
    });

    
    
}