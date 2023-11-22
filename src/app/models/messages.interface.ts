export class Messages {

    channelId: string; 
    messageId: string;
    userName: string; 
    userImg: any; 
    userId: string; 
    content: any[] = [];        
    dateTimeNumber: number;
    dateString: string; 
    clockString: string; 
    channelMessageAmount: number;
    amountAnswers: number;
    lastClockTime: string; 
    messageEmojis: [];
    
       
   
    constructor(obj?: any) {
        this.channelId = obj ? obj.channelId : '';
        this.messageId = obj ? obj.messageId : 'unset';
        this.userName = obj? obj.userName : '';
        this.userId = obj ? obj.userId : '';
        this.userImg = obj? obj.userImg : '';
        this.content = obj ? obj.content : [];        
        this.dateTimeNumber = obj ? obj.dateTimeNumber : 0;
        this.dateString = obj ? obj.dateString : 'unset';
        this.clockString = obj ? obj.clockString : 'unset';  
        this.channelMessageAmount = obj ? obj.channelMessageAmount : 0;
        this.amountAnswers = obj ? obj.amountAnswers : 0; 
        this.lastClockTime = obj ? obj.lastClockTime : 'unset';
        this.messageEmojis = obj ? obj.messageEmojis : [];
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
            channelMessageAmount: this.channelMessageAmount,
            amountAnswers: this.amountAnswers,
            lastClockTime: this.lastClockTime,
            messageEmojis: this.messageEmojis       
        }
    }
}

