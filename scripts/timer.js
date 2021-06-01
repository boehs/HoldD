function timeToString(time) {
	let diffInHrs = time / 3600000;
	let hh = Math.floor(diffInHrs);

	let diffInMin = (diffInHrs - hh) * 60;
	let mm = Math.floor(diffInMin);

	let diffInSec = (diffInMin - mm) * 60;
	let ss = Math.floor(diffInSec);

	let diffInMs = (diffInSec - ss) * 100;
	let ms = Math.floor(diffInMs);

	let formattedHH = hh.toString().padStart(2, "0");
	let formattedMM = mm.toString().padStart(2, "0");
	let formattedSS = ss.toString().padStart(2, "0");
	let formattedMS = ms.toString().padStart(2, "0");

	return `${formattedHH}:${formattedMM}:${formattedSS}:${formattedMS}`;
}

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

let startTime;
let elapsedTime = 0;
let timerInterval;

function print(txt, id) {
	document.getElementById(id).innerHTML = txt;
}

function start() {
	startTime = Date.now() - elapsedTime;
	timerInterval = setInterval(function printTime() {
		elapsedTime = Date.now() - startTime;
		print(timeToString(elapsedTime), "timer");
	}, 10);
	print("You have been holding D for:", "info");
	var audioArray = document.getElementsByClassName("song");
	var arr = [...audioArray];
	shuffle(arr);
	jQuery(document).ready(function () {
		var i = 0;
		arr[i].play();
		for (i = 0; i < arr.length - 1; ++i) {
			arr[i].addEventListener("ended", function (e) {
				var currentSong = e.target;
				var next = $(currentSong).nextAll("audio");
				if (next.length) $(next[0]).trigger("play");
			});
		}
	});
}

function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}

function pause() {
	clearInterval(timerInterval);
	print("You gave up. What a loser!", "info");
	var sounds = document.getElementsByTagName("audio");
	for (i = 0; i < sounds.length; i++)
		sounds[i].pause(), (sounds[i].currentTime = 0);
}

function reset() {
	clearInterval(timerInterval);
	print("00:00:00:00", "timer");
	elapsedTime = 0;
}

window.onload = function () {
	let Pressed = false;
	document.body.addEventListener("keydown", (event) => {
		if (event.keyCode === 68 && !Pressed) {
			reset();
			start();
			Pressed = true;
		}
	});
	document.body.addEventListener("keyup", (event) => {
		if (event.keyCode === 68 && Pressed) {
			Pressed = false;
			pause();
		}
	});
	document.addEventListener("visibilitychange", function (event) {
		if (document.hidden) {
			pause();
			print("LMAO u try so hard but u failure", "info");
		}
	});
};
