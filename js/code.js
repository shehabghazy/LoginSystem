// check the local storage // 
var storageAccounts = localStorage.getItem('userAccounts');
if (storageAccounts == null) {
    var usersList = [];
} else {
    usersList = JSON.parse(storageAccounts);
}
// ---------------------------------------------------------- //

// Login funcition //
var userEmail = document.querySelector('#loginEmail');
var userPassword = document.querySelector('#loginPassword');
var goLoginPage = document.querySelector('#goLoginPage')
var loginInfo = {};
var loginName;
var loginButtun = document.querySelector('#loginButtun')
loginButtun.addEventListener('click', doLogin)

function doLogin() {
    var loginEmail = userEmail.value;
    var loginPassword = userPassword.value;
    var emailRegisted = false;
    var passNum;

    loginInfo = {
        email: loginEmail,
        password: loginPassword
    }

    for (var i = 0; i < usersList.length; i++) {
        if (usersList[i].email == loginInfo.email) {
            emailRegisted = true;
            passNum = i;
        }
    }
    if (emailRegisted == false) {
        loginAlert.classList.remove('d-none')
        loginAlert.innerHTML = "This email has not registed"
    }
    else if (emailRegisted == true) {
        if (usersList[passNum].password == loginInfo.password) {
            loginAlert.classList.add('d-none')
            console.log('welcome to your page')
            loginName = usersList[passNum].name;
            localStorage.setItem('loginName', loginName)
            goLoginPage.setAttribute('href', 'loginPage.html');

            loginButtun.removeEventListener('click') ;
        }
        else {
            loginAlert.classList.remove('d-none')
            loginAlert.innerHTML = "Do you forget your password ?!"
        }
    }
}

function sayWelcome() {
    var welcomeName = document.querySelector('#welcomeName')
    console.log(welcomeName)
    loginName = localStorage.getItem('loginName')
    console.log(loginName)
    welcomeName.innerHTML = `Welcome ${loginName}`;
}

// ---------------------------------------------------------- //


// display sign up box // 
var signUpBox = document.querySelector('#signUpForm')
var signInBox = document.querySelector('#signInForm')
var goSignUp = document.querySelector('#goSignUp')
var goSignIn = document.querySelector('#goSignIn')

goSignUp.addEventListener('click', function () {
    signUpBox.classList.remove('d-none')
    signInBox.classList.add('d-none')
    signUpName.focus();
})

goSignIn.addEventListener('click', function () {
    signInBox.classList.remove('d-none')
    signUpBox.classList.add('d-none')
    userEmail.focus();

})
// ---------------------------------------------------------- //


// registration funcition //
var newName = document.querySelector('#signUpName');
var newEmail = document.querySelector('#signUpEmail');
var newPassword = document.querySelector('#signUpPassword');
var userInfo = {};
var signUpButtun = document.querySelector('#signUpButtun')
signUpButtun.addEventListener('click', registration)

var emailUsed = false;

newName.setAttribute('autofocus' , true)    


function registration() {
    var signUpName = newName.value;
    var signUpEmail = newEmail.value;
    var signUpPasword = newPassword.value;

    userInfo = {
        name: signUpName,
        email: signUpEmail,
        password: signUpPasword
    }
    
    if (usersList.length == 0) {
        singUpValid();   
    }
    else {
        for (var i = 0; i < usersList.length; i++) {
            if (usersList[i].email == userInfo.email) {
                emailUsed = true;           
            }
        }
        singUpValid();
    }
}

function singUpValid() {
    var signUpAlert = document.querySelector('#signUpAlert')
    var emailRegex = /@/
    var passRegex = /[a-z1-9]{10}/

    if (userInfo.name == "" || userInfo.email == "" || userInfo.password == "") {
        signUpAlert.classList.remove('d-none')
        signUpAlert.innerHTML = "Please fill the data"
    }
    else if (emailUsed == false) {
        if (emailRegex.test(userInfo.email)) {
            signUpEmail.classList.remove('is-invalid')
            signUpPassword.classList.remove('is-invalid')

            if (passRegex.test(userInfo.password)) {
                usersList.push(userInfo)
                localStorage.setItem('userAccounts', JSON.stringify(usersList))
                signUpAlert.classList.add('d-none')
                signUpAlert.classList.remove('d-none')
                signUpAlert.classList.replace('alert-danger' , 'alert-success')
                signUpName.classList.add('is-valid')
                signUpEmail.classList.add('is-valid')
                signUpPassword.classList.add('is-valid')
                signUpAlert.innerHTML = "success"
            }
            else {
                signUpAlert.classList.remove('d-none')
                signUpAlert.classList.replace('alert-success' , 'alert-danger')
                signUpAlert.innerHTML = "The password shouldn't be less than 10 lettelrs and numbers"
                signUpPassword.classList.add('is-invalid')
            }    
        }
        else {
            signUpAlert.classList.remove('d-none')
            signUpAlert.classList.replace('alert-success' , 'alert-danger')
            signUpAlert.innerHTML = "Please enter a right email"
            signUpEmail.classList.add('is-invalid')
        }  
    }
    else if (emailUsed == true) {
        // console.log('enter another email')
        signUpAlert.classList.remove('d-none')
        signUpAlert.classList.replace('alert-success' , 'alert-danger')
        signUpAlert.innerHTML = "This email is already taken, please enter another email"
        signUpEmail.classList.add('is-invalid')
        console.log(usersList)
    }
}
// ---------------------------------------------------------- //

