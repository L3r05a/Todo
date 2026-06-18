export function createTodo(taskData) {
    return {
        title: taskData.title, 
        description: "",
        dueDate: taskData.dueDate,
        priority: "",
        notes: "",
        priority: "",
        completed: false,
        id: self.crypto.randomUUID(),
        projectOwner: taskData.projectID,
        
    };
}