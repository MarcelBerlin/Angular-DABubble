export class ChatDataSet {
    id: string;
    firstMember: string;
    secondMember: string;
    lastTimeStamp: any;
    chat: any[];


    constructor(obj?:any) {
        this.id = obj ? obj.id : 'unset';
        this.firstMember = obj ? obj.firstMember : 'unset';
        this.secondMember = obj ? obj.secondMember : 'unset';
        this.lastTimeStamp = obj ? obj.lastTimeStamp : {
            dateTimeNumber: 0, 
            dateString:'unset', 
            clockString:'unset'
        };
        this.chat = obj ? obj.chat : [];
    }

    
    /**
     * Converts the object to a JSON representation.
     * 
     * @returns {object} - The JSON representation of the object.
     */
    public toJSON(): any {
        return {
            id: this.id,
            firstMember: this.firstMember,
            secondMember: this.secondMember,
            lastTimeStamp: this.lastTimeStamp,
            chat: this.chat,
        }
    }
}