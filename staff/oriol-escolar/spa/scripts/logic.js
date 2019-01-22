//#region (business) logic

function login(email, password, callback) {
    
    if(!( typeof email === 'string' )) throw TypeError (email + ' should be a string')
    if(!( typeof password === 'string' )) throw TypeError (email + ' should be a string')
    if(!( callback instanceof Function )) throw TypeError (email + ' should be a string')



    var user = users.find(function (user) {
        return user.email === email;
    });

    if (!user) throw Error('user ' + email + ' not found');

    if (user.password !== password) throw Error('wrong password');

    callback(user);
}

function register(name, surname, email, password, passwordConfirmation, callback) {
    
    if(!( typeof email === 'string' )) throw TypeError (email + ' should be a string')
    if(!( typeof password === 'string' )) throw TypeError (email + ' should be a string')
    if(!( typeof name === 'string' )) throw TypeError (email + ' should be a string')
    if(!( typeof surname === 'string' )) throw TypeError (email + ' should be a string')
    if(!( typeof passwordConfirmation === 'string' )) throw TypeError (email + ' should be a string')
    if(!( callback instanceof Function )) throw TypeError (email + ' should be a string')
   
   
   
   
    var user = users.find(function (user) {
        return user.email === email;
    });

    if (user) throw Error('user ' + email + ' already exists');

    if (password !== passwordConfirmation) throw Error('passwords do not match');

    users.push({
        name: name,
        surname: surname,
        email: email,
        password: password
    });

    callback();
}

//#endregion