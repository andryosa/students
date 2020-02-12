let userName = document.getElementById('username')
let pass = document.getElementById('password')
let login = document.querySelector('button')
login.addEventListener('click',logIn)
let fatherUsername = document.getElementById('userNameFather')
let fatherPassword =document.getElementById('passwordFather')
let createNewAccount = document.getElementById('newAccount')
let inputs = Array.from(document.querySelectorAll('input'))
console.log(inputs)



function logIn(e){

userEmails = JSON.parse(localStorage.getItem('userEmails'))




inputs.forEach(function(item){




    if(item.value==''){
    
    
        let small = document.createElement('small')
        small.innerHTML='Field must not be empty'
      // small.classList.add('mb-1') 
        small.classList.add('text-danger')
   
        if(item.parentElement.lastElementChild.className!=='text-danger'){
    
            item.parentElement.appendChild(small)
          }
      
          setTimeout(function(){
            if(item.parentElement.lastElementChild.className=='text-danger'){
                small.parentNode.removeChild(small)
               
            }
          
          },4000)
    
    }else if(item.value!=''){

      let match =  matchFound(userEmails)
      console.log(match)


if(!match){

    let small = document.createElement('small')
    small.innerHTML='username does not exist'
  // small.classList.add('mb-1') 
    small.classList.add('text-danger')

    if(fatherUsername.lastElementChild.className!=='text-danger'){

        fatherUsername.appendChild(small)
      }
  
      setTimeout(function(){
        if(fatherUsername.lastElementChild.className=='text-danger'){
            small.parentNode.removeChild(small)
           
        }
      
      },4000)


}else{


 let checked = checkPassword (userEmails,userName.value)

    if(checked){
window.location= '../hangman.html'

    }else if(pass.value ==''){

        let small = document.createElement('small')
        small.innerHTML='Type Your Password Please'
      // small.classList.add('mb-1') 
        small.classList.add('text-danger')
    
        if(fatherPassword.lastElementChild.className!=='text-danger'){
    
            fatherPassword.appendChild(small)
          }
      
          setTimeout(function(){
            if(fatherPassword.lastElementChild.className=='text-danger'){
                small.parentNode.removeChild(small)
               
            }
          
          },4000)

    }else if(!checked){

        let small = document.createElement('small')
        small.innerHTML='The Password is wrong'
      // small.classList.add('mb-1') 
        small.classList.add('text-danger')
    
        if(fatherPassword.lastElementChild.className!=='text-danger'){
    
            fatherPassword.appendChild(small)
          }
      
          setTimeout(function(){
            if(fatherPassword.lastElementChild.className=='text-danger'){
                small.parentNode.removeChild(small)
               
            }
          
          },4000)

    }

}



    }
    
    })






e.preventDefault()
}


createNewAccount.addEventListener('click',goToSignUp)
function goToSignUp(e){


window.location = '../registeration.html'

}



//////////////this function ckecks if the given username exist or not///////
function matchFound(arrEmails){
let result;

for(i=0;i<arrEmails.length;i++){

  if(userName.value==arrEmails[i].email){

 result = true
 break
}else{

  result = false
}

}
return result

}


///////////////this function checks the password if it is matched or not

function checkPassword (arrobj,email){

let result;
for(i=0;i<arrobj.length;i++){

if(email === arrobj[i].email){
if(pass.value===arrobj[i].password){

result = true
break
}else{
  result = false

}

}else{
  result = false
}

}

return result
}