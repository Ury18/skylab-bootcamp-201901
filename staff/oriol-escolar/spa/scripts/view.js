'use strict';

//#region panel

function Panel(element) {
    this.element = element;
}

Panel.prototype.hide = function() {
    this.element.hide();
};

Panel.prototype.show = function() {
    this.element.show();
};

//#endregion

//#region login panel

function LoginPanel() {
    Panel.call(this, document.createElement('section'));

    var container = this.element;
    container.className = 'login';

    var title = document.createElement('h2');
    title.innerText = 'Login';
    container.appendChild(title);

    var form = document.createElement('form');
    form.className = 'login__form';
    container.appendChild(form);
    this.__form__ = form;

    var emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'email');
    emailLabel.innerText = 'E-mail:';
    form.appendChild(emailLabel);

    var emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'email';
    emailInput.placeholder = 'email';
    emailInput.required = true;
    form.appendChild(emailInput);
    this.__emailInput__ = emailInput;

    var passwordLabel = document.createElement('label');
    passwordLabel.setAttribute('for', 'password');
    passwordLabel.innerText = 'Password:';
    form.appendChild(passwordLabel);

    var passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';
    passwordInput.placeholder = 'password';
    passwordInput.required = true;
    form.appendChild(passwordInput);
    this.__passwordInput__ = passwordInput;

    var submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.innerText = 'Login';
    form.appendChild(submitButton);

    var error = document.createElement('section');
    error.className = 'login__error';
    container.appendChild(error);
    this.__error__ = error;

    var registerLink = document.createElement('a');
    registerLink.href = '#';
    registerLink.innerText = 'Register'
    registerLink.className = 'login__register-link';
    container.appendChild(registerLink);
    this.__registerLink__ = registerLink;
}

LoginPanel.prototype = Object.create(Panel.prototype);
LoginPanel.prototype.constructor = LoginPanel;

Object.defineProperty(LoginPanel.prototype, 'onLogin', { 
    set: function(callback) { 
        this.__form__.addEventListener('submit', function (event) {
            event.preventDefault();
    
            var email = this.__emailInput__.value;
            var password = this.__passwordInput__.value;
    
            callback(email, password);
        }.bind(this));
    } 
});

Object.defineProperty(LoginPanel.prototype, 'onRegisterPage', { 
    set: function(callback) { 
        this.__registerLink__.addEventListener('click', callback);
    } 
});

Object.defineProperty(LoginPanel.prototype, 'error', { 
    set: function(message) { 
        this.__error__.innerText = message;
        this.__error__.show();
    } 
});



LoginPanel.prototype.clear = function() {
    this.__emailInput__.value = '';
    this.__passwordInput__.value = '';
    this.__error__.innerText = '';
    this.__error__.hide();
};

//#endregion

//#region home panel

function HomePanel() {
    Panel.call(this, document.createElement('section'));

    var container = this.element;
    container.className = 'welcome';

    var title = document.createElement('h2');
    container.appendChild(title);

    var welcomeText = document.createTextNode('Welcome, ');
    title.appendChild(welcomeText);

    var userSpan = document.createElement('span');
    userSpan.className = 'welcome__name';
    title.appendChild(userSpan);
    this.__userSpan__ = userSpan;

    var exclamationText = document.createTextNode('!');
    title.appendChild(exclamationText);

    var logoutButton = document.createElement('button');
    logoutButton.className = 'welcome__logout';
    logoutButton.innerText = 'Logout';
    container.appendChild(logoutButton);
    this.__logoutButton__ = logoutButton;

    
}

HomePanel.prototype = Object.create(Panel.prototype);
HomePanel.prototype.constructor = HomePanel;

Object.defineProperty(HomePanel.prototype, 'user', { 
    set: function(user) { 
        this.__userSpan__.innerText = user.name;
    } 
});



Object.defineProperty(HomePanel.prototype, 'onLogout', { 
    set: function(callback) { 
        this.__logoutButton__.addEventListener('click', callback);
    } 
});





//#endregion

//#region register panel

function RegisterPanel() {
    
    Panel.call(this, document.createElement('section'))

    var container = this.element;
    container.className = 'register';

    var title = document.createElement('h2');
    title.innerText = 'Register';
    container.appendChild(title)

    var form = document.createElement('form');
    form.className = 'register__form'
    container.appendChild(form);
    this.__form__ = form;

    var labelName = document.createElement('label');
    labelName.innerText = 'Name'
    labelName.setAttribute('for','name')
    form.appendChild(labelName);

    var inputName = document.createElement('input');
    inputName.type = 'text'
    inputName.name = 'name'
    inputName.placeholder = 'name'
    inputName.required = true
    form.appendChild(inputName);
    this.__inputName__ = inputName;

    var labelSurname = document.createElement('label');
    labelSurname.innerText = 'Surname'
    labelSurname.setAttribute('for','surname')
    form.appendChild(labelSurname);

    var inputSurname = document.createElement('input');
    inputSurname.type = 'text'
    inputSurname.name = 'surname'
    inputSurname.placeholder = 'surname'
    inputSurname.required = true
    form.appendChild(inputSurname);
    this.__inputSurname__ = inputSurname;

    var labelEmail = document.createElement('label');
    labelEmail.innerText = 'Email'
    labelEmail.setAttribute('for','email')
    form.appendChild(labelEmail);

    var inputEmail = document.createElement('input');
    inputEmail.type = 'email'
    inputEmail.name = 'email'
    inputEmail.placeholder = 'email'
    inputEmail.required = true
    form.appendChild(inputEmail);
    this.__inputEmail__ = inputEmail;

    var labelPassword = document.createElement('label');
    labelPassword.innerText = 'Password'
    labelPassword.setAttribute('for','password')
    form.appendChild(labelPassword);

    var inputPassword = document.createElement('input');
    inputPassword.type = 'password'
    inputPassword.name = 'password'
    inputPassword.placeholder = 'password'
    inputPassword.required = true
    form.appendChild(inputPassword);
    this.__inputPassword__ = inputPassword;

    var labelConfirmPassword = document.createElement('label');
    labelConfirmPassword.innerText = 'Confirm Password'
    labelConfirmPassword.setAttribute('for','password')
    form.appendChild(labelConfirmPassword);

    var inputConfirmPassword = document.createElement('input');
    inputConfirmPassword.type = 'password'
    inputConfirmPassword.name = 'password-confirmation'
    inputConfirmPassword.placeholder = 'confirm password'
    inputConfirmPassword.required = true
    form.appendChild(inputConfirmPassword);
    this.__inputConfirmPassword__ = inputConfirmPassword;

    var submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.innerText = 'Register';
    form.appendChild(submitButton);
    
    var error = document.createElement('section');
    error.className = 'register__error';
    container.appendChild(error);
    this.__error__ = error;

    var loginLink = document.createElement('a');
    loginLink.href = '#';
    loginLink.innerText = 'Login'
    loginLink.className = 'register__login-link';
    container.appendChild(loginLink);
    this.__loginLink__ = loginLink;

    

}

RegisterPanel.prototype = Object.create(Panel.prototype)
RegisterPanel.prototype.constructor = RegisterPanel;



Object.defineProperty(RegisterPanel.prototype, 'onRegister', { 
    set: function(callback) { 
        this.__form__.addEventListener('submit', function (event) {
            event.preventDefault();
    
            var name = this.__inputName__.value;
            var surname = this.__inputSurname__.value;
            var email = this.__inputEmail__.value;
            var password = this.__inputPassword__.value;
            var passwordConfirmation = this.__inputConfirmPassword__.value;
    
            callback(name,surname, email, password,passwordConfirmation);
        }.bind(this));
    } 
});


Object.defineProperty(RegisterPanel.prototype, 'onLoginPage', { 
    set: function(callback) { 
        this.__loginLink__.addEventListener('click', callback);
    } 
});

Object.defineProperty(RegisterPanel.prototype, 'error', { 
    set: function(message) { 
        this.__error__.innerText = message;
        this.__error__.show();
    } 
});



RegisterPanel.prototype.clear = function() {
    this.__inputEmail__.value = '';
    this.__inputPassword__.value = '';
    this.__inputConfirmPassword__.value = '';
    this.__inputName__.value = '';
    this.__inputSurname__.value = '';
    this.__error__.innerText = '';
    this.__error__.hide();
};


//#endregion

//#region search panel

function SearchPanel()
{

    Panel.call(this, document.createElement('section'))
    var container = this.element;


    var ducklingTitle = document.createElement('h3');
    ducklingTitle.innerText = 'Duckling Search Engine'
    container.appendChild(ducklingTitle);


    var form = document.createElement('form');
    form.action= 'https://duckling-api.herokuapp.com/api/search'
    form.method = 'get';
    container.appendChild(form);
    this.__form__=form;

    var queryInput = document.createElement ('input');
    queryInput.type='text';
    queryInput.name='q';
    queryInput.placeholder = 'search'
    form.appendChild(queryInput)
    this.queryInput=queryInput;

    var searchButton = document.createElement('button');
    searchButton.type='submit';
    searchButton.innerText='Search';
    form.appendChild(searchButton);
    

    var resultList = document.createElement('ul');
    container.appendChild(resultList);
    this.__resultList__=resultList



}




//#endregion