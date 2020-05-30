

export class User {
    public name: string;
    public id: string;
    public image_url: string;

    public constructor(name: string, id: string, image_url: string) {
        this.name = name;
        this.id = id;
        this.image_url = image_url;
    }
};
