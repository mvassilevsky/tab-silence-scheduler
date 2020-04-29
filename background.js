chrome.alarms.onAlarm.addListener(function(alarm) {
  chrome.tabs.query({}, function(tabList) {
    tabList.forEach(function(tab) {
      updateTab(tab, alarm);
    });
  });
});

function updateTab(tab, alarm) {
  if (alarm['name'] == 'muteStart') {
    chrome.tabs.update(tab.id, { muted: true } );
  } else if (alarm['name'] == 'muteEnd') {
    chrome.tabs.update(tab.id, { muted: false } );
  }
}
