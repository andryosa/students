let gun =document.getElementById('gun')
let fire = document.getElementById('fire')
let bullet= document.getElementById('bullet')
let div= document.getElementById('div')
let rightHand = document.getElementById('leftHand')
let body = document.getElementById('body')
gun.addEventListener('keypress',shoot)
gun.addEventListener('keypress',moveDown)
gun.addEventListener('keypress',moveUp)
gun.addEventListener('keyup',hideFire)
//gun.addEventListener('mouseup',reset)


let interval;
function shoot(e){

  let state = true
if(e.code=='Space'){

   
let pos = 0

 interval = setInterval(() => {

if( -10< getPosition(bullet) && state){
fire.classList.remove('d-none')
  bullet.classList.remove('d-none')

  pos+=10
  bullet.style.transform = `translate(-${pos}px , -11px)`
setTimeout(function(){
   state = false
},400)
console.log(getPosition(bullet))

} else if(-10> getPosition(bullet) && !state){
  pos =0
   bullet.classList.add('d-none') 
    bullet.style.transform = `translate(-${pos}px , -11px)`
  fire.classList.add('d-none')
 
hideFire(e)
console.log('passed')

}
 
}, .1000);


}


}





// hiding the fire after shooting

function hideFire(e){
  if(e.code=='Space'&& -10> getPosition(bullet) ){
  
    clearInterval(interval)
  }
  
  }


// moveing down
let  marginTop = 0
function moveDown(e){

if(e.code =='KeyS'){
  
  marginTop++
div.style.marginTop = `${marginTop}%`
console.log(marginTop)
}


}

///////////////////moveing up////////////////////



function moveUp(e){

if(e.code =='KeyW'){
  
  marginTop--
div.style.marginTop = `${marginTop}%`
console.log(marginTop)
}


}

function getPosition(element) {
  var clientRect = element.getBoundingClientRect();
  return  clientRect.left + document.body.scrollLeft
          
}

//console.log()