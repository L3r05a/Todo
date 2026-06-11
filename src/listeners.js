import {projectForm} from "./forms.js"


const projects = document.getElementById("projects");

const todoDiv = document.getElementById("todo");

const addPro = document.getElementById("addPro");


export function initListeners() {
//Add project button
addPro.addEventListener("click", () => {
  
    projectForm();
    
    });

} ;





