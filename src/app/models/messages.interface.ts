export class Messages {

    channelId: string; 
    messageId: string;
    userName: string; 
    userImg: any; 
    userId: string; 
    content: string;         
    dateTimeNumber: number;
    dateString: string; 
    clockString: string; 
       
   
    constructor(obj?: any) {
        this.channelId = obj ? obj.channelId : '';
        this.messageId = obj ? obj.messageId : 'unset';
        this.userName = obj? obj.userName : '';
        this.userId = obj ? obj.userId : '';
        this.userImg = obj? obj.userImg : '';
        this.content = obj ? obj.content : '';     
        this.dateTimeNumber = obj ? obj.dateTimeNumber : 0;
        this.dateString = obj ? obj.dateString : 'unset';
        this.clockString = obj ? obj.clockString : 'unset';   
    }

    toJSON() {
        return {
            channelId: this.channelId,
            messageId: this.messageId,
            userName: this.userName,
            userId: this.userId,
            userImg: this.userImg,
            content: this.content,    
            dateTimeNumber: this.dateTimeNumber,
            dateString: this.dateString,
            clockString: this.clockString,       
        }
    }
}

