const email = document.getElementById('email')
const password = document.getElementById('password')
const btn = document.getElementById('signIn')

btn.addEventListener('click', e => {
    let getData = JSON.parse(localStorage.getItem('sendToStorage'))
    console.log(getData)
    let check = true
    getData.forEach(function(item) {
        console.log(item)
        console.log(email.value)
        if (email.value == item.email && password.value == item.password) {
           window.location.replace('http://127.0.0.1:5500/index.html')
           check = false
        }
    })
    if(check){
        alert('Your username or password is wrong')
    }
      e.preventDefault()
})