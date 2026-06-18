//Enumerate forms in document and returns lenght value
export function formTest () {

const formTest = document.querySelectorAll(`form`);

return formTest.length;
    
};

//Task Due Date text response 
export function countingDays (days){
        if (days === 0) {return "Due today."}
        else if (days === 1 ) {return `Due in ${days} day.`}
        else if (days > 1)  {return `Due in ${days} days.`}
        else if (days === -1) {return `${Math.abs(days)} day overdue.`}
        else if (days < -1) {return `${Math.abs(days)} days overdue.`}
    }

