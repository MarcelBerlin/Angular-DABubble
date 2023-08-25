export class ChannelTimeStamp{
    dateTimeNumber: number;
    dateString: string; 
    clockString: string;


    constructor(obj?:any) {
        this.dateTimeNumber = obj ? obj.dateTimeNumber : 0;
        this.dateString = obj ? obj.dateString : 'unset';
        this.clockString = obj ? obj.clockString : 'unset';
    }

    toJSON() {
        return {
            dateTimeNumber: this.dateTimeNumber,
            dateString: this.dateString,
            clockString: this.clockString,
        }
    }
}