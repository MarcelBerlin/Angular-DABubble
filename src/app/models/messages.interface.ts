export class Messages {

    channelId: string; 
    userName: string; 
    userImg: any; 
    userId: string; 
    content: string; 
       
   
    constructor(obj?: any) {
        this.channelId = obj ? obj.channelId : '';
        this.userName = obj? obj.userName : '';
        this.userId = obj ? obj.userId : '';
        this.userImg = obj? obj.userImg : '';
        this.content = obj ? obj.content : '';     
    }

    toJSON() {
        return {
            channelId: this.channelId,
            userName: this.userName,
            userId: this.userId,
            userImg: this.userImg,
            content: this.content,          
        }
    }
      
    

}