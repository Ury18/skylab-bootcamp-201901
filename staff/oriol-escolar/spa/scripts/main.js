var loginPanel = new LoginPanel
var homePanel = new HomePanel
var registerPanel = new RegisterPanel

document.body.appendChild(loginPanel.element);
document.body.appendChild(homePanel.element);
document.body.appendChild(registerPanel.element)

loginPanel.onLogin = function (email, password) {
    try {
        login(email, password, function (user) {
            loginPanel.hide();

            homePanel.user = user;
            homePanel.show();
        });
    } catch (err) {
        loginPanel.error = err.message;
    }
};


registerPanel.onRegister = function (name, surname, email, password, passwordConfirmation) {
    try {
        register(name, surname, email, password, passwordConfirmation, function () {

            registerPanel.clear();
            registerPanel.hide();
            registerPanel.hide();
            loginPanel.show();

        });

    } catch (err) {

        registerPanel.error = err.message;

    }

}



homePanel.onLogout = function () {
    homePanel.hide();
    loginPanel.clear();
    loginPanel.show();
};



loginPanel.onRegisterPage = function () {
    loginPanel.clear();
    loginPanel.hide();
    registerPanel.show();

}

registerPanel.onLoginPage = function () {
    registerPanel.clear();
    registerPanel.hide();
    loginPanel.show();

}

