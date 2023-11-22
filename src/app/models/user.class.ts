export class User {

    name: string;
    img: any;
    email: string;
    online: boolean;
    directChats: any[];
    channels: any[];
    userId: any;
    logInEmail: string;
    logInName: string;

    constructor(obj?:any) {
        this.name = obj ? obj.name : '';
        this.img = obj ? obj.img : '/assets/img/members/avatar2.png';
        this.email = obj ? obj.email : '';
        this.online = obj ? obj.online : false;
        this.directChats = obj ? obj.directChats : [];
        this.channels = obj ? obj.channels : [];
        this.userId = obj ? obj.userId : '';
        this.logInEmail = obj ? obj.logInEmail : '';
        this.logInName = obj ? obj.logInName : '';
    }

    toJSON() {
        return {
            name: this.name,
            img: this.img,
            email: this.email,
            online: this.online,
            directChats: this.directChats,
            channels: this.channels,
            userId: this.userId,
            logInEmail: this.logInEmail,
            logInName: this.logInName,
        }
    }
}