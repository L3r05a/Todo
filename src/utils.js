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


