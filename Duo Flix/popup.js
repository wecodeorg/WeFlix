var backgroundPage = chrome.extension.getBackgroundPage();

function hideCopySuccessDelay(time) {
  setTimeout(function() {
    $('#copy_success').addClass('hidden');
    window.close();
  }, time);
}

$('#id_session_copy').click(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
  {
    if (tabs && tabs[0]) {
      backgroundPage.handleCopyClick(tabs[0].url);
      $('#copy_success').removeClass('hidden');
      hideCopySuccessDelay(5000);
    }
  });
});

$('#id_session_paste').click(function() {
  backgroundPage.handlePasteClick();
  window.close();
});