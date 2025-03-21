function createEmployeeRecord(employeeData){
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour :employeeData [3],
        timeInEvents : [],
        timeOutEvents : []
         };
        }
function createEmployeeRecords(employeeData){
            return employeeData.map(createEmployeeRecord);
        }
function createTimeInEvent(employeeRecord, dateTime) {
            const [date, time] = dateTime.split(' ');
            const hour = time.slice(0, 2);
            employeeRecord.timeInEvents.push({
              type: 'TimeIn',
              date: date,
              hour: time.split(':').join(''), 
            });
            return employeeRecord;
          }        
function createTimeOutEvent(employeeRecord, dateTime) {
            const [date, time] = dateTime.split(' ');
            const hour = time.slice(0, 2);
            employeeRecord.timeOutEvents.push({
              type: 'TimeOut',
              date: date,
              hour: time.split(':').join(''), 
            });
            return employeeRecord;
          }
function hoursWorkedOnDate(employeeRecord, date) {
            const timeIn = employeeRecord.timeInEvents.find((event) => event.date === date);
            const timeOut = employeeRecord.timeOutEvents.find((event) => event.date === date);
          
            if (!timeIn || !timeOut) {
              return 0; 
            }
            const timeInHour = parseInt(timeIn.hour.slice(0, 2));
            const timeOutHour = parseInt(timeOut.hour.slice(0, 2));
          
            return timeOutHour - timeInHour;
          
          
           // return parseInt(timeOut.hour) - parseInt(timeIn.hour);
          }
function wagesEarnedOnDate(employeeRecord, date) {
            const hours = hoursWorkedOnDate(employeeRecord, date);
            return hours * employeeRecord.payPerHour;
          }
function allWagesFor(employeeRecord) {
            const dates = [...new Set(employeeRecord.timeInEvents.map((event) => event.date))];
            return dates.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
          }
          function calculatePayroll(employeeRecords) {
            return employeeRecords.reduce((total, record) => total + allWagesFor(record), 0);
          }



// Your code here
