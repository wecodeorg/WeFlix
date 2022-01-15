// cookie
const cookieFilterKeys = [ 'name', 'domain', 'value', 'path', 'secure', 'httpOnly', 'expirationDate' ];

//cookies
var getDomainCookies = function(url, callback) {
    return chrome.cookies.getAll({
        url: url
    }, function(cookies) {
        let cookiesRetArr = _.map(cookies, function (cookie) {
            return _.pick(cookie, cookieFilterKeys);
        });
        callback({url: url, cookies: cookiesRetArr});
    });
};

// cookies
var loadCookies = function(data) {
    _.each(data.cookies, function(cookie) {
        cookie.url = data.url;
        chrome.cookies.set(cookie);
    });
    return data.url;
};
