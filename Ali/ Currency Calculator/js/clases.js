const registerSwich = document.getElementById('registerSwich');
const signInSwich = document.getElementById('signInSwich');
const container = document.getElementById('container');
const signIn = document.getElementById('signIn');
const emailSignIn = document.getElementById('emailSignIn');
const passwordSignIn = document.getElementById('passwordSignIn');
const register = document.getElementById('register')
// let data, datas;


// Clases Profile
class Profile {
    constructor(registerName, registerEmail, registerPassword) {
        this.registerName = registerName
        this.registerEmail = registerEmail
        this.registerPassword = registerPassword
    }

}
// registerName = document.getElementById('registerName')


// let p = new Profile(registerName.value, registerPassword.value, registerPassword.value)



// Static Clases for localStorage 

// signIn.addEventListener('click', () => {
//     let dataSignIn = {
//         email: document.getElementById('emailSignIn').value,
//         password: document.getElementById('passwordSignIn').value,
//         logined: true
//     }
//     let exist = false
//     // datas = JSON.parse(localStorage.getItem('datas'));

//     datas.forEach(item => {
//         if (dataSignIn.email == item.email && dataSignIn.password == item.password) {
//             exist = true

//         }
//     })
//     if (exist) {
//         window.location.href = "/Curncy.html";

//     } else {
//         alert('Your user name or Password Wrong')
//         // window.close()
//     }


// })
class Store {
    static getProfile() {
        let profiles;
        if (localStorage.getItem('profiles') === null) {
            profiles = [];
        } else {
            profiles = JSON.parse(localStorage.getItem('profiles'))
        }
        return profiles
    }
    static addProfile(profile) {
        const profiles = Store.getProfile();
        profiles.push(profile);
        localStorage.setItem('profiles', JSON.stringify(profiles))
    }


    static login(email, pW) {
        let profiles = getProfile()
        let res = 3
        profiles.forEach(item => {

            if (item.registerEmail === email && item.registerPassword === pW) {
                res = 2 //2 : email && password correct
            } else if (item.registerEmail === email) {
                res = 1 //1: password is incorrect
            } else {
                res = 0 // 0 : either email or password are incorrect
            }
        })

        return res
    }
}


// Event Listener

registerSwich.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInSwich.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});
register.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
})



// Sign in Eventlistener
document.getElementById('loginForm').addEventListener('submit', function (e) {
    let dataSing = JSON.parse(localStorage.getItem('profiles'))
    //     console.log(dataSing[0].registerName)
    e.preventDefault()
    let exist = false
    dataSing.forEach(item => {
        if (emailSignIn.value === item.registerEmail && passwordSignIn.value === item.registerPassword) {
            exist = true
            sessionStorage.user = JSON.stringify(item)
            // console.log('Hey')

        }
    })
    if (exist) {

        window.location.href = "/Currency.html";
    } else {
        alert('User Name or Pasword not Exist')
    }
})

// Form EventListner
document.getElementById('form').addEventListener('submit', function (e) {

    const registerName = document.getElementById('registerName').value;
    const registerEmail = document.getElementById('registerEmail').value;
    const registerPassword = document.getElementById('registerPassword').value;


    const profile = new Profile(registerName, registerEmail, registerPassword)
    console.log(profile)



    e.preventDefault();
    Store.addProfile(profile);
})

// register Event listner
document.querySelector('#register').addEventListener('click', function (e) {
    data = {
        name: document.getElementById('registerName').value,
        email: document.getElementById('registerEmail').value,
        password: document.getElementById('registerPassword').value

    }
})











// const registerSwich = document.getElementById('registerSwich');
// const signInSwich = document.getElementById('signInSwich');
// const container = document.getElementById('container');
// const signIn = document.getElementById('signIn');
// // let data, datas;

// registerSwich.addEventListener('click', () => {
//     container.classList.add("right-panel-active");
// });

// signInSwich.addEventListener('click', () => {
//     container.classList.remove("right-panel-active");
// });


// // document.querySelector('#register').addEventListener('click', function (e) {
// //     data = {
// //         name: document.getElementById('registerName').value,
// //         email: document.getElementById('registerEmail').value,
// //         password: document.getElementById('registerPassword').value

// //     }
// // })


// class Profile {
//     constructor(username, password, email) {
//         this.username = username
//         this.password = password
//         this.email = email
//     }

// }



// // let p = new Profile(registerName.value, registerPassword.value, registerPassword.value)

// class Store {
//     static getProfile() {
//         let profiles;
//         if (localStorage.getItem('profiles') === null) {
//             profiles = [];
//         } else {
//             profiles = JSON.parse(localStorage.getItem('profiles'))
//         }
//         return profiles
//     }
//     static addProfile(profile) {
//         const profiles = Store.getProfile();
//         profiles.push(profile);
//         localStorage.setItem('profiles', JSON.stringify(profiles))
//     }
// }

// document.getElementById('form').addEventListener('submit', function (e) {
//     const registerEmail = document.getElementById('registerEmail').value,
//         const registerPassword = document.getElementById('registerPassword').value;
//     const registerName = document.getElementById('registerName').value;




//     const profile = new Proffile(registerName.value, registerPassword.value, registerEmail.value)
//     console.log(profile)

//     e.preventDefault();
//     Store.addProfile(profile);
// })