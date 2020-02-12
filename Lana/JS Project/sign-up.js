const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmPass = document.getElementById('confirmPass')
const submit = document.getElementById("submit")

submit.addEventListener('click', e => {
    if(username.value == ''){
        alert('Please write username')
    } else if (email.value == ''){
        alert('Please write email')
    } else if(password.value == ''){
        alert('Please write password')
    } else if (confirmPass.value !== password.value){
        alert("Passwords don't match!")
    } else {
        
        let sendToStorage;
        let signUpData = {
            username : username.value,
            email : email.value,
            password : password.value,
            confirmPass : confirmPass.value
        }

        if(localStorage.getItem('sendToStorage') === null){
            sendToStorage = []
        } else {
            sendToStorage = JSON.parse(localStorage.getItem('sendToStorage'));
        }
        sendToStorage.push(signUpData)
        localStorage.setItem('sendToStorage', JSON.stringify(sendToStorage))
    }
    window.location.replace('http://127.0.0.1:5500/sign-in.html')
})





