const selectors = {
    cookiesAccept: '#onetrust-accept-btn-handler',
    loginButton: 'button[type="submit"]',
    loginPasswordInput: 'input[type="password"]',
    loginUsernameInput: 'input[name]',
    loginSubmitButton: 'button[type="submit"]:nth-child(3)', // not so happy about it
    checkIfLoggedIn: '#user-info',
    iframeSelector: '#iframe-content',
    checkForTimerSelector: 'div[class="timer-label"] > span',
    spinButton: 'div[class="button-spin"]'
}

exports.selectors = selectors