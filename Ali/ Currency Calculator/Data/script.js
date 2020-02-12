// const registerSwich = document.getElementById('registerSwich');
// const signInSwich = document.getElementById('signInSwich');
// const container = document.getElementById('container');
// const signIn = document.getElementById('signIn');
// let data, datas;



// signIn.addEventListener('click', () => {
//     let dataSignIn = {
//         email: document.getElementById('emailSignIn').value,
//         password: document.getElementById('passwordSignIn').value,
//         logined: true
//     }
//     let exist = false
//     datas = JSON.parse(localStorage.getItem('datas'));

//     datas.forEach(item => {
//         if (dataSignIn.email == item.email && dataSignIn.password == item.password) {
//             exist = true

//         }
//     })
//     if (exist) {
//         window.location.href = "/Currency*.html";

//     } else {
//         alert('Your user name or Password Wrong')
//         // window.close()
//     }

// })

// registerSwich.addEventListener('click', () => {
//     container.classList.add("right-panel-active");
// });

// signInSwich.addEventListener('click', () => {
//     container.classList.remove("right-panel-active");
// });






// document.querySelector('#register').addEventListener('click', function (e) {
//     data = {
//         name: document.getElementById('registerName').value,
//         email: document.getElementById('registerEmail').value,
//         password: document.getElementById('registerPassword').value

//     }

//     datas = JSON.parse(localStorage.getItem('datas'));

//     if (!datas) {
//         datas = [];
//         datas.push(data);
//         container.classList.remove("right-panel-active");


//     } else {
//         // console.log(JSON.parse(localStorage.getItem('datas')))
//         let exist = false
//         datas.forEach(item => {
//             if (data.email == item.email) {
//                 exist = true
//             }

//         })
//         if (!exist) {
//             datas.push(data);
//             container.classList.remove("right-panel-active");

//         } else {
//             alert("The Email is already exist!")
//         }
//         console.log(exist)
//         console.log(datas)
//         //  datas = JSON.parse(localStorage.getItem('datas'));
//     }


//     localStorage.setItem('datas', JSON.stringify(datas));


//     e.preventDefault();
//     document.getElementById('registerName').value = ''
// });

// datas = JSON.parse(localStorage.getItem('datas'));