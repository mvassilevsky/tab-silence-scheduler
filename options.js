// Saves options to chrome.storage
function save_options() {
  var startTime = document.getElementById('start-time').value;
  var endTime = document.getElementById('end-time').value;
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
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get(['muteStartTime', 'muteEndTime'], function(items) {
    document.getElementById('start-time').value = items.muteStartTime;
    document.getElementById('end-time').value = items.muteEndTime;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('save').addEventListener('click', save_options);
})
