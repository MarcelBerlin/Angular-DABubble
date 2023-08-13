export class ActualChat {
    name: string;
    date: string;
    time: string;
    message: string;
    dateTimeNumber: number;

    constructer(obj?: any) {
        this.name = obj ? obj.name : 'unset';
        this.date = obj ? obj.date : 'unset';
        this.time = obj ? obj.time : 'unset';
        this.dateTimeNumber = obj ? obj.dateTimeNumber : 0;
        this.message = obj ? obj.message : false;
    }

    /**
     * Converts the object to a JSON representation.
     * 
     * @returns {object} - The JSON representation of the object.
     */
    public toJSON(): any {
        return {
            name: this.name,
            date: this.date,
            time: this.time,
            dateTimeNumber: this.dateTimeNumber,
            message: this.message,
        }
    }

}