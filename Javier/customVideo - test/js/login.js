const form_sign_IN = document.getElementById('sign_IN');
const btn_sign_IN = document.getElementById('sub_sign_IN');
const test = document.getElementById('test');
const username_LOG = document.getElementById('username_LOG');
const password_LOG = document.getElementById('password_LOG');
const username = document.getElementById('username_SIGN');
const email = document.getElementById('email');
const password = document.getElementById('password_SIGN');
const password2 = document.getElementById('password2_SIGN');
const sub_Log_IN = document.getElementById('sub_Log_IN');

//clean
localStorage.clear();
function* userCreator() {
  let index = localStorage.length;
  console.log(index);
  while (true) {
    yield index++
  }
}
const gen = userCreator()
const my_prefix = 'user';
//console.log(my_prefix+gen.next().value)
form_sign_IN.hidden = true

const jmonteros81 = {
  "mail": "monteros.javier@gmail.com",
  "pwd": "amircael69",
  "id": "user1"
}

const adm = {
  "mail": "adm@gmail.com",
  "pwd": "adm123456789",
  "id": "user2"
}

//var jsonPerson = JSON.stringify(jmonteros81);
localStorage.setItem("jmonteros81", JSON.stringify(jmonteros81));
localStorage.setItem("adm", JSON.stringify(adm));
//console.log(localStorage.key("adm"))
console.log(localStorage.length)



// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
    return 1
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
      return 1
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
    return 1
  } 
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  } else return 1
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function loginUser() {
  //console.log(username_LOG.value);
  var personJSONFromLS = localStorage.getItem(username_LOG.value);
  if (personJSONFromLS) {
    var personFromLS = JSON.parse(personJSONFromLS);
    const validPassword = password_LOG.value == personFromLS.pwd;
    console.log(validPassword)
    if (validPassword){
        //window.location = "http://www.google.com/"
        window.location = "index.html"
         return alert(`User ${username_LOG.value} successfully logged-in!`)
    }
    else return alert(`Incorrect password for username ${username_LOG.value}, RETRY! `);
  } else {
    form_sign_IN.hidden = false
    log_IN.hidden = true
    return alert(`Username ${username_LOG.value} has not been registered....SIGN IN! `);

  }
}




function registerUser() {
  console.log(username.value);
  const registeredUser = window.localStorage.getItem(username.value);
  console.log(registeredUser);
  aux = username.value
  //console.log("ID" + gen.next().toString())
  if (!registeredUser) {
    window[aux] = {}
    window[aux].mail = email.value
    window[aux].pwd = password.value;
    window[aux].id = my_prefix + gen.next().value
    //var jsonPerson = JSON.stringify(window[aux]);
    //localStorage.setItem(username.value, jsonPerson);
    localStorage.setItem(username.value, JSON.stringify(window[aux]));
    //localStorage.setItem(username.value, JSON.stringify(jmonteros81));
    form_sign_IN.hidden = true
    log_IN.hidden = false
    return alert(`New user ${username.value} now registered!`);
  } else {
    return alert(`User ${username.value} is taked it!`);
  }
}

// Event listeners
sub_Log_IN.addEventListener('click', function (e) {
  e.preventDefault();
  // checkLength(username, 3, 15);
  // checkLength(password, 6, 25);
  //console.log(username_LOG.value)
  loginUser();

})

btn_sign_IN.addEventListener('click', function (e) {
  e.preventDefault();
  //checkRequired([username, email, password, password2]);
  if (checkLength(username, 3, 15) && checkLength(password, 6, 25) && checkEmail(email) && checkPasswordsMatch(password, password2)) {
    registerUser();
  }
});

