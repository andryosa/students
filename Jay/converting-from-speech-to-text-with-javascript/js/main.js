let submit = document.getElementById('submit')
submit.addEventListener('click',submitFunc)
let inputs = Array.from(document.querySelectorAll('input'))
console.log(inputs)
let pass = document.getElementById('password')
let email = document.getElementById('email')
let checkboxfather = document.getElementById('checkboxFather')
let login = document.getElementById('gotologin')
login.addEventListener('click',goToLoginPage)

function submitFunc(e){
let count = 0


  inputs.forEach(function(item,i){
 if(item.value == ''){
 status = false
 item.classList.add('border')
item.classList.add('border-danger')
setTimeout(function(){

  item.classList.remove('border')
item.classList.remove('border-danger')

},3000)

}else if(item.id == 're_password' && item.value != pass.value){
  
status= false
  let confirmPassFather = document.getElementById('confirmPass')
 
  
    let small = document.createElement('small')
    small.innerHTML='the password does not match'
   item.classList.add('mb-1') 
    small.classList.add('text-danger')
    if(confirmPassFather.lastElementChild.className!='text-danger'){
      confirmPassFather.appendChild(small)
    }


setTimeout(function(){
  if(confirmPassFather.lastElementChild.className=='text-danger'){
      small.parentNode.removeChild(small)
  
  }

},4000)




  
//  window.location.replace('../hangman.html')

}else if(item.type=='checkbox' && !item.checked){
 
  
    let small = document.createElement('small')
    small.innerHTML='you must accept terms and conditions'
   item.classList.add('mb-1') 
    small.classList.add('text-danger')

    if(checkboxfather.lastElementChild.className!=='text-danger'){

      checkboxfather.appendChild(small)
    }

    setTimeout(function(){
      if(checkboxfather.lastElementChild.className=='text-danger'){
          small.parentNode.removeChild(small)
         
      }
    
    },4000)
    



  }else if(item.value!=''){
    
    count++
  }else if(item.id=='checkbox' && item.checked){
    count++
  }else if(item.id == 're_password' && item.value === pass.value){
    count++
  }

})

// //////// sending the users to locaal storage
if(count==5){
let userEmails;
let newUser = {}

 if(localStorage.getItem('userEmails') == null){
userEmails = []

 }else{
userEmails = JSON.parse(localStorage.getItem('userEmails'))

 }





 
///here means the first time that useremail is empty
if(userEmails.length==0){
  submit.setAttribute("href", "#myModal");
setTimeout(function(){

  window.location ='./Login_v12/login.html'

},3000)


  newUser.email= email.value
  newUser.password=pass.value
  
  userEmails.push(newUser)
  
  

}else{

let matched = matchFound(userEmails)
console.log(matched)
if(!matched){
  submit.setAttribute("href", "#myModal");
  newUser.email= email.value
  newUser.password=pass.value
  
  userEmails.push(newUser)
  console.log(userEmails)
  setTimeout(function(){

    window.location ='./Login_v12/login.html'
  
  },3000)
}else{
let div = document.createElement('div')
div.className='isa_info'
div.innerHTML=`<i class="fa fa-info-circle"></i> this email is already
 registerd `
 checkboxfather.appendChild(div)

 document.querySelector('p.loginhere').classList.add('shake')



setTimeout(function(){
  document.querySelector('p.loginhere').classList.remove('shake')
  div.parentNode.removeChild(div)
},4000)

}
//})
}




 localStorage.setItem('userEmails',JSON.stringify(userEmails))
 
}
console.log(count)

e.preventDefault()

}



///////go to log in /////
function goToLoginPage(){

  window.location='./Login_v12/login.html'
  }




  function matchFound(arrofObj){

 let result;


 for(i=0;i<arrofObj.length;i++){

if (email.value== arrofObj[i].email){
 result = true
 break;
}else{
result = false
}

 }


return result
  }
//  let arrEmails= ['edf@gmail.com','jacob.radan2@gmail.com','dsdd']
//  let result =  matchFound(arrEmails)
//  console.log(result)