export class User {

    name: string;
    img: any;
    email: string;
    online: boolean;


    constructor(obj?:any) {
        this.name = obj ? obj.name : '';
        this.img = obj ? obj.img : '/assets/img/members/avatar2.png';
        this.email = obj ? obj.email : '';
        this.online = obj ? obj.online : false;
    }

    toJSON() {
        return {
            name: this.name,
            img: this.img,
            email: this.email,
            online: this.online
        }
    }
}