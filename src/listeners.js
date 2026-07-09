import {projectForm} from "./forms.js"

import { saveStorage } from "./storage.js";
import { loadStorage } from "./storage.js";
import { clearStorage } from "./storage.js";

const projects = document.getElementById("projects");

const todoDiv = document.getElementById("todo");

const addPro = document.getElementById("addPro");

const testDiv = document.getElementById("storageDiv")


//init Project Add button 
export function initListeners() {
//Add project button
addPro.addEventListener("click", () => {
  
    projectForm();
    
    });

} ;








