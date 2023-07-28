export class Messages {

    channelId: string; 
    userId: string; 
    content: string; 
    timestamp: any;  
   
    constructor(obj?:any) {
        this.channelId = obj ? obj.channelId : '';
        this.userId = obj ? obj.userId : '';
        this.content = obj ? obj.content : '';
        this.timestamp = obj ? obj.timestamp : false;
    }

    toJSON() {
        return {
            channelId: this.channelId,
            userId: this.userId,
            content: this.content,
            timestamp: this.timestamp
        }
    }
      
    

}