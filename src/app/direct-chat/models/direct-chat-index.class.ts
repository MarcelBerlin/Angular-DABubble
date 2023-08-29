export class DirectChatIndex{
    ownId: string; //Own user id
    partnerId: string; //User ID of chat partner
    lastTimeStamp: any; //last update of the chat
    directChatId: string; // ID of the Chat.
    newMessageAmount: number;

    constructor(obj?:any) {
        this.ownId = obj ? obj.ownId : 'unset';
        this.partnerId = obj ? obj.partnerId : 'unset';
        this.lastTimeStamp = obj ? obj.lastTimeStamp : {};
        this.directChatId = obj ? obj.directChatId : undefined; // changed from false to undefine
        this.newMessageAmount = obj ? obj.newMessageAmount : 0;
    }

    
    toJSON() {
        return {
            ownId: this.ownId,
            partnerId: this.partnerId,
            lastTimeStamp: this.lastTimeStamp,
            directChatId: this.directChatId,
            newMessageAmount: this.newMessageAmount
        }
    }
}