export function createTodo(title, projectID) {
    return {
        title, 
        description: "",
        dueDate: "",
        priority: "",
        notes: "",
        priority: "",
        completed: false,
        id: self.crypto.randomUUID(),
        projectOwner: projectID,
        
    };
}