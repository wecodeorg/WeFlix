const OMNIBOX_KEYWORD = "DuoCodies";
const MENU_SESSION_COPY_ID = "MENU_SESSION_COPY";
const MENU_SESSION_PASTE_ID = "SESSION_PARSE";
const AES_KEY = "iLFB0yJSLsObtH6tNcfXMqo7L8qcEHqZ";
const MENU_TEXT_COPY = "";
const MENU_TEXT_PASTE = "";

var backgroundPage = chrome.extension.getBackgroundPage();
backgroundPage.handleCopyClick = handleCopyClick;
backgroundPage.handlePasteClick = handlePasteClick;

// 创建右键复制菜单


// 复制到粘贴板
var copyToClipboard = function(text) {
    // var backgroundPage = chrome.extension.getBackgroundPage();
    var clipboard = backgroundPage.document.getElementById("clipboard");
    clipboard.value = text;
    clipboard.select();
    backgroundPage.document.execCommand("Copy");
};

// 从粘贴板提取文字
var pasteFromClipboard = function() {
    // var backgroundPage = chrome.extension.getBackgroundPage();
    var clipboard = backgroundPage.document.getElementById("clipboard");
    clipboard.value = text;
    clipboard.select();
    var text = '';
    if (document.execCommand('paste')) {
        text = clipboard.value;
    }
    clipboard.value = '';
    return text;
}

// 处理点击复制按钮操作
function handleCopyClick(pageUrl) {
    try {
        var cookie_data = getDomainCookies(pageUrl, function(cookies) {
            cookies = JSON.stringify(cookies);
            var encrypted = CryptoJS.AES.encrypt(cookies, AES_KEY);
            copyToClipboard(
                // 这里加入关键字
                OMNIBOX_KEYWORD + " " + encrypted
            );
        });
    } catch (err){
        alert('HAHA NO NETFLIX FOR YOU');
    }
    
}

// 处理点击粘贴按钮操作
function handlePasteClick() {
    var text = pasteFromClipboard();
    if (text.indexOf(OMNIBOX_KEYWORD) !== 0) {
        return false;
    }
    solveSessionPaste(text.substr(OMNIBOX_KEYWORD.length + 1));
}

// 菜单点击事件监听


// 处理session粘贴后逻辑
function solveSessionPaste(text) {
    try {
        var decrypted = CryptoJS.AES.decrypt(text, AES_KEY);
        text = decrypted.toString(CryptoJS.enc.Utf8);
        var data = JSON.parse(text);
        console.log(text);
        var url = loadCookies(data);
        chrome.tabs.update({
            url: url
        });
    } catch (err) {
        alert('Please get the Code');
    }
}

// 地址栏监听
chrome.omnibox.onInputEntered.addListener(solveSessionPaste);

// 地址栏提示
var updateOmniboxSuggestion = function(text) {
    var description = "Paste Session Here";
    if (text) {
        try {
            var cookie_data = JSON.parse(text);
            if (cookie_data && cookie_data.url) {
                description = "Paste Session <url>" + cookie_data.url + "</url>";
            }
        } catch (e) {
            console.warn('ohh may be have an error~', e);
        }
    }
    chrome.omnibox.setDefaultSuggestion({
        description: description
    });
};
updateOmniboxSuggestion();

chrome.omnibox.onInputStarted.addListener(updateOmniboxSuggestion);
chrome.omnibox.onInputChanged.addListener(updateOmniboxSuggestion);