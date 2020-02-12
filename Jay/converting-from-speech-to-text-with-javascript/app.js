try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
  }
  catch(e) {
    console.error(e);
    $('.no-browser-support').show();
    $('.app').hide();
  }
  
  let textArea = document.getElementById('note-textarea')
  let startBtn =document.getElementById('start-record-btn')
  let pauseBtn = document.getElementById('pause-record-btn')
  let saveNoteBtn = document.getElementById('save-note-btn')
  let instruction = document.getElementById('recording-instructions') 

  /*-----------------------------
      Voice Recognition 
------------------------------*/

// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds),
// allowing us to keep recording even when the user pauses. 
recognition.continuous = false;
let transcript;
let savedSentence ;
window.onload = function(){
    startRecording()
}



recognition.onresult = function(event) {

    let current = event.resultIndex
  transcript = event.results[current][0].transcript;
    textArea.value = transcript

    if(transcript.includes('head')){
        console.log(transcript)
    document.getElementById('head').classList.add('bounce')
  
    
    setTimeout(function(){
        document.getElementById('head').classList.remove('bounce')
    },4000)

    }else if(transcript.includes('ask')){
       
        readOutLoud('OHHHH really?,,,,,,,,,,, i am ready for your questions baby')
    }else if (transcript.includes('how old')){
readOutLoud('I dont know but my creator is 28 years old  ')
    }else if(transcript.includes('repeat')){
        savelastSentence()
    }else if(transcript.includes('your name')){

        readOutLoud('my name is jay')
    }else if(transcript.includes('go away')){
        readOutLoud('ohhh thats mean ......,ok in which direction left or right')
    }else if (transcript.includes('right')){
        document.getElementById('boy').classList.remove('rotateInDownLeft')
       

        document.getElementById('boy').classList.add('fadeOutRightBig')
       
        document.body.style.overflowX='hidden'
    }else if (transcript.includes('come back')){
readOutLoud('hmmm in which direction?')

    }else if (transcript.includes('the same')){
        document.getElementById('boy').classList.remove('fadeOutRightBig')
      
        document.getElementById('boy').classList.add('fadeInRightBig')
        setTimeout(function(){
            document.getElementById('boy').classList.remove('fadeInRightBig')
        },2000)
        

    
    }else if(transcript.includes('stop recording')){
pauseRecording()
    }else if(transcript.includes('yourself')){

readOutLoud('hi there  I am a very tiny little robot , in progress and my name is fbw4')

    }
    
    /////////////////////////ACTIONS ////////////////////
    else if(transcript.includes('hand')){
    readOutLoud('you should tell me exactly which hand')

    }else if(transcript.includes('left')){
document.getElementById('leftHand').classList.add('shake')

setTimeout(function(){
    document.getElementById('leftHand').classList.remove('shake')
},4000)


    }else if(transcript.includes('understand')){
        document.getElementById('boy').classList.remove('rotateInDownLeft')
       document.getElementById('boy').classList.add('tada') 

readOutLoud('yes i understand')


setTimeout(function(){
  
    document.getElementById('boy').classList.remove('tada')
    
},4000)


    }else if(transcript.includes('great job')){
        document.getElementById('boy').classList.remove('rotateInDownLeft')
document.getElementById('boy').classList.add('shake')
readOutLoud('YES')
setTimeout(function(){
    document.getElementById('boy').classList.add('rotateInDownLeft') 
    document.getElementById('boy').classList.remove('shake')
    
},4000)
    }else if(transcript.includes('other game')){
       readOutLoud('the gun game you mean?')

    }else if(transcript.includes('the gun game')){

        readOutLoud('ok')
        setTimeout(function(){

              window.location = '/gunGame.html'
        },2000)
      
    }
}

// start button recording
startBtn.addEventListener('click',startRecording)

function startRecording(){
instruction.innerHTML = 'yout voice is being recorded ,speak loudly'
    recognition.start()

  

   
}

  

//stop recording

pauseBtn.addEventListener('click',pauseRecording)

function pauseRecording(){
 savedSentence=`i think  that   you said   ${transcript}`
instruction.innerText= 'you paused recording try again '

setTimeout(function(){
    instruction.innerHTML= 'Press the <strong>Start Recognition</strong> button and allow access.'
},3000)
    recognition.stop()
}


function savelastSentence(){
readOutLoud(savedSentence)

}


/////////Save not button/////////


saveNoteBtn.addEventListener('click',saveNotes)
function saveNotes(){


    let ul = document.querySelector('ul')
let li = document.createElement('li')

li.innerHTML = `<p class='no-notes'>${textArea.value}.</p>`

ul.appendChild(li)



}



function readOutLoud(message) {
	let speech = new SpeechSynthesisUtterance();

  // Set the text and voice attributes.
	speech.text = message;
	speech.volume = 1;
	speech.rate = .7;
	speech.pitch = 1;
  
    window.speechSynthesis.speak(speech);
    


}

