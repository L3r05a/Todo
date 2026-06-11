export class CreateProject {

    constructor (title) {

        this.title = title;
        this.id = self.crypto.randomUUID();
        this.tasks = [];
        this.priority = "";
        this.completed = false;

    };

}