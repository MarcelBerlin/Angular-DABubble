export class DirectChatIndex{
    ownId: string; //Own user id
    partnerId: string; //User ID of chat partner
    lastTimeStamp: any; //last update of the chat
    directChatId: string; // ID of the Chat.


    constructor(obj?:any) {
        this.ownId = obj ? obj.ownId : 'unset';
        this.partnerId = obj ? obj.partnerId : 'unset';
        this.lastTimeStamp = obj ? obj.lastTimeStamp : {};
        this.directChatId = obj ? obj.directChatId : false;
    }

    
    toJSON() {
        return {
            ownId: this.ownId,
            partnerId: this.partnerId,
            lastTimeStamp: this.lastTimeStamp,
            directChatId: this.directChatId,
        }
    }
}