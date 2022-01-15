document.documentElement.setAttribute('extension-installed', true);

document.addEventListener("invokeVkEvent", function(data) {
    chrome.runtime.sendMessage("Start");
});