function setMuteTime() {
  var startTime = document.getElementById('start-time').value;
  var endTime = document.getElementById('end-time').value;
  saveOptions(startTime, endTime);
  scheduleMuteTime(startTime, endTime);
}

function scheduleMuteTime(startTime, endTime) {
  scheduleDailyAlarm('muteStart', startTime);
  scheduleDailyAlarm('muteEnd', endTime);
}

function scheduleDailyAlarm(alarmName, timeString) {
  chrome.alarms.create(alarmName, {
    when: convertToDate(timeString),
    periodInMinutes: 1440
  });
}

// Converts the string time from the HTML inputs into a schedulable date.
function convertToDate(timeString) {
  [hours, minutes] = timeString.split(':');
  date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds('00')
  return date.getTime();
}

// Saves options to chrome.storage
function saveOptions(startTime, endTime) {
  chrome.storage.sync.set({
    muteStartTime: startTime,
    muteEndTime: endTime
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Times scheduled.';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get(['muteStartTime', 'muteEndTime'], function(items) {
    document.getElementById('start-time').value = items.muteStartTime;
    document.getElementById('end-time').value = items.muteEndTime;
  });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('save').addEventListener('click', setMuteTime);
})
