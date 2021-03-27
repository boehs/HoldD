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
	const audio = document.querySelector("audio");

	audio.volume = 1;
	audio.play();
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
	const audio = document.querySelector("audio");
	audio.volume = 1;
	audio.pause();
	audio.src = audio.src;
}

function reset() {
	clearInterval(timerInterval);
	print("00:00:00:00", "timer");
	elapsedTime = 0;
}

function getPrefix() {
	if ("hidden" in document) {
		return null;
	}
	var prefixes = ["moz", "ms", "o", "webkit"];

	for (var i = 0; i < prefixes.length; i++) {
		var testPrefix = prefixes[i] + "Hidden";
		if (testPrefix in document) {
			return prefixes[i];
		}
	}
	return null;
}

function getVisibilityEvent(prefix) {
	if (prefix) {
		return prefix + "visibilitychange";
	} else {
		return "visibilitychange";
	}
}

function getHiddenProperty(prefix) {
	if (prefix) {
		return prefix + "Hidden";
	} else {
		return "hidden";
	}
}

window.onload = function () {
	var prefix = getPrefix();
	let Pressed = false;
	var hidden = getHiddenProperty(prefix);
	document.body.addEventListener("keydown", (event) => {
		if (event.keyCode === 68 && !Pressed) {
			reset();
			start();
			Pressed = true;
			console.log("Reset");
		}
	});
	document.body.addEventListener("keyup", (event) => {
		if (event.keyCode === 68 && Pressed) {
			Pressed = false;
			pause();
			console.log("Done");
		}
	});
	document.addEventListener(getVisibilityEvent(prefix), function () {
		if (document[hidden]) {
			pause();
			print("LMAO u try so hard but u failure", "info");
		}
	});
};
