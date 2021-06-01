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
	window.onload = function () {
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

// gold

/*
const NUM_CONFETTI = 350;
const COLORS = [[248,182,70], [248,182,70], [248,182,70], [248,182,70], [248,182,70]];
const PI_2 = 2*Math.PI;


const canvas = document.getElementById("world");
const context = canvas.getContext("2d");
window.w = 0;
window.h = 0;

const resizeWindow = function() {
  window.w = (canvas.width = window.innerWidth);
  return window.h = (canvas.height = window.innerHeight);
};

window.addEventListener('resize', resizeWindow, false);
  
window.onload = () => setTimeout(resizeWindow, 0);

const range = (a, b) => ((b-a)*Math.random()) + a;

const drawCircle = function(x,y,r,style) {
  context.beginPath();
  context.arc(x,y,r,0,PI_2,false);
  context.fillStyle = style;
  return context.fill();
};

let xpos = 0.5;

document.onmousemove = e => xpos = e.pageX/w;

window.requestAnimationFrame = ((() => window.requestAnimationFrame       ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame    ||
window.oRequestAnimationFrame      ||
window.msRequestAnimationFrame     ||
(callback => window.setTimeout(callback, 1000 / 60))))();


class Confetti {

  constructor() {
    this.style = COLORS[~~range(1)];
    this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
    this.r = ~~range(1,6);
    this.r2 = 2*this.r;
    this.replace();
  }

  replace() {
    this.opacity = 0;
    this.dop = 0.01*range(1,5);
    this.x = range(-this.r2,w-this.r2);
    this.y = range(-20,h-this.r2);
    this.xmax = w-this.r;
    this.ymax = h-this.r;
    this.vx = (range(0,2)+(8*xpos))-5;
    return this.vy = (0.4*this.r)+range(-1,1);
  }

  draw() {
    this.x += this.vx;
    this.y += this.vy;
    this.opacity += this.dop;
    if (this.opacity > 1) {
      this.opacity = 1;
      this.dop *= -1;
    }
    if ((this.opacity < 0) || (this.y > this.ymax)) { this.replace(); }
    if (!(0 < this.x && this.x < this.xmax)) {
      this.x = (this.x + this.xmax) % this.xmax;
    }
    return drawCircle(~~this.x,~~this.y,this.r,`${this.rgb},${this.opacity})`);
  }
}


const confetti = (__range__(1, NUM_CONFETTI, true).map((i) => new Confetti));

window.step = function() {
  requestAnimationFrame(step);
  context.clearRect(0,0,w,h);
  return Array.from(confetti).map((c) => c.draw());
};

step();
function __range__(left, right, inclusive) {
  let range = [];
  let ascending = left < right;
  let end = !inclusive ? right : ascending ? right + 1 : right - 1;
  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i);
  }
  return range;
}
*/
