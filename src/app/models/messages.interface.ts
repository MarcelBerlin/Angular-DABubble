export class Messages {

    channelId: string; 
    userName: string; 
    userImg: any; 
    userId: string; 
    content: string; 
    timestamp: any;  
   
    constructor(obj?:any) {
        this.channelId = obj ? obj.channelId : '';
        this.userName = obj? obj.name : '';
        this.userId = obj ? obj.userId : '';
        this.userImg = obj? obj.userImg : '';
        this.content = obj ? obj.content : '';
        this.timestamp = obj ? obj.timestamp : false;
    }

    toJSON() {
        return {
            channelId: this.channelId,
            userName: this.userName,
            userId: this.userId,
            userImg: this.userImg,
            content: this.content,
            timestamp: this.timestamp
        }
    }
      
    

}