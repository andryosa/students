// Variables
var initialPlay = false;
var menuIn = true;

// Time Variables
var currentTime;
var halfwayPoint;
var durationTime;

var video1;
$(document).ready(function(){
console.log("ADSFGSba")
})
// Video JS ready
videojs('video1').ready(function(){
	video1 = videojs('video1');

	this.on('loadedmetadata', function(){
		// alert(Math.round(this.duration()));
	})

	this.on('timeupdate', function(){
		console.log(this.currentTime());
	})

	video1.markers({
		markerStyle:{
     		'border-radius': '20px',
     		'background-color': 'blue'
		},
		markers:[
			{time:5, text: "First marker"},
			{time:10, text: "Second marker"},
		],
		onMarkerClick: function(marker){
			alert(marker.text);
		},
		onMarkerReached: function(marker){
			if (marker.text == "First marker") {
				$('#modal1').modal('show');
			}
		}
	})

})

function updateTime(time){
	video1.currentTime(time);
	video1.play();
}

function muteAudio(){
	var isVolumeMuted = video1.muted();
	if (isVolumeMuted) {
		video1.muted(false);
	} else{
		video1.muted(true);
	}
}

function togglePlay(){
	video1.requestFullscreen();
}

// Animate in menu
function animateMenu(){
	if (menuIn) {
		$('.menu').animate({right: "0"}, 500);
		menuIn = false;
	} else{
		$('.menu').animate({right: "-405px"}, 500);
		menuIn = true;
	}
}

// Jump to point
function jumpToPoint(time){
	video1.currentTime(time);
	animateMenu();
	video1.play();
}

// Modal Show
$(document).on('show.bs.modal','#modal1', function () {
	video1.pause();
});

// Modal Hide
$(document).on('hide.bs.modal','#modal1', function () {
	video1.play();
});

function loadVideo(e){
	video1.src(e);
	animateMenu();
	video1.play();
}
