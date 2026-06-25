export function createTodo(taskData) {
    return {
        title: taskData.title, 
        dueDate: taskData.dueDate,
        priority: taskData.priority,
        details: taskData.details,
        notes: "",
        completed: false,
        id: self.crypto.randomUUID(),
        projectOwner: taskData.projectID,
        
    };
}