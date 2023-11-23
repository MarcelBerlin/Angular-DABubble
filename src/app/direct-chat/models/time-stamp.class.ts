export class TimeStamp{
    dateTimeNumber: number;
    dateString: string; 
    clockString: string;


    constructor(obj?:any) {
        this.dateTimeNumber = obj ? obj.dateTimeNumber : 0;
        this.dateString = obj ? obj.dateString : 'unset';
        this.clockString = obj ? obj.clockString : 'unset';
    }


    // toJSON() {
    //     return {
    //         dateTimeNumber: this.dateTimeNumber,
    //         dateString: this.dateString,
    //         clockString: this.clockString,
    //     }
    // }


    /**
     * Creates and returns an object containing dateTimeNumber, dateString, and clockString.
     * 
     * @returns {any} An object with dateTimeNumber, dateString, and clockString.
     */
    createTimeDateStringJson(): any {
        this.dateTimeNumber = this.getDateTimeNumber();
        this.dateString = this.getDateString();
        this.clockString = this.getClockString();
        return {
            dateTimeNumber: this.dateTimeNumber, 
            dateString: this.dateString, 
            clockString: this.clockString
        }
    }


    /**
     * Retrieves the current date and time as a Date object.
     * @returns {Date} The current Date object.
     */
    getDateTimeNumber(): number {
        this.dateTimeNumber = new Date().getTime();
        return this.dateTimeNumber;
    }


    /**
     * Creates a formatted date string in the format 'day.month.year'.
     * 
     * @param {Date} today - The Date object from which to extract the day, month, and year.
     * @returns {string} A formatted date string in the format 'day.month.year'.
     */
    getDateString(): string {
        let today: Date = new Date();
        let day: string = today.getDate().toString();
        let month: string = (today.getMonth() + 1).toString();
        let year: string = today.getFullYear().toString();
        if (day.length == 1) day = '0' + day;
        if (month.length == 1) month = '0' + month;
        let dateString: string = day + '.' + month + '.' + year;
        return dateString;
    }


    /**
     * Creates a formated clock string in the format 'hour:minutes'.
     * 
     * @param {Date} today - The Date object from which to extract the hour and minutes.
     * @returns {string} A formatted clock string in the format 'hour:minutes'.
     */
    getClockString(): string {
        let today: Date = new Date();
        let hour: string = today.getHours().toString();
        let minutes: string = today.getMinutes().toString();
        if (hour.length == 1) hour = '0' + hour;
        if (minutes.length == 1) minutes = '0' + minutes;
        let clockString: string = hour + ':' + minutes;
        return clockString;
      }
}