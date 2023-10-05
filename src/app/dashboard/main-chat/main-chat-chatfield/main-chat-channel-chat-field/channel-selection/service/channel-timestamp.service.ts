import { Injectable } from '@angular/core';
import { ChannelTimeStamp } from '../models/channel-timestamp.class';

@Injectable({
  providedIn: 'root'
})
export class ChannelTimestampService {

  channelTimeStamp: ChannelTimeStamp = new ChannelTimeStamp();

  constructor(
    
  ) { }

/**
   * Returns the current timestamp, date string, and clock string FOR THE CHANNELS !!!!.
   *
   * @returns {Object} An object containing the current timestamp, date string, and clock string.
   */
getActualTimeStampForChannels(): ChannelTimeStamp {
  let today: Date = new Date();
  this.channelTimeStamp.dateTimeNumber = today.getTime();
  this.channelTimeStamp.dateString = this.createDateString(today);
  this.channelTimeStamp.clockString =
    this.createClockString(today);
  return new ChannelTimeStamp({
    dateTimeNumber: today.getTime(),
    dateString: this.createDateString(today),
    clockString: this.createClockString(today),
  });
}

/**
 * Creates a formatted date string in the format 'day.month.year'.
 *
 * @param {Date} today - The Date object from which to extract the day, month, and year.
 * @returns {string} A formatted date string in the format 'day.month.year'.
 */
createDateString(today: Date): string {
  let day: string = today.getDate().toString();
  let month: string = (today.getMonth() + 1).toString();
  let year: string = today.getFullYear().toString();
  if (day.length == 1) day = '0' + day;
  if (month.length == 1) month = '0' + month;
  let dateString: string = year + '-' + month + '-' + day;
  return dateString;
}

/**
 * Creates a formated clock string in the format 'hour:minutes'.
 *
 * @param {Date} today - The Date object from which to extract the hour and minutes.
 * @returns {string} A formatted clock string in the format 'hour:minutes'.
 */
createClockString(today: Date): string {
  let hour: string = today.getHours().toString();
  let minutes: string = today.getMinutes().toString();
  if (hour.length == 1) hour = '0' + hour;
  if (minutes.length == 1) minutes = '0' + minutes;
  let clockString: string = hour + ':' + minutes;
  return clockString;
}



}
