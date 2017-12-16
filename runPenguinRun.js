const canvas = document.getElementById('canvas1');
const context = canvas.getContext("2d");

const backgroundImage = new Image();
backgroundImage.src = "https://ae01.alicdn.com/kf/HTB1sPGkRpXXXXXUaXXXq6xXFXXXF/5x7FT-Cartoon-Tropical-Forest-Palm-Leaves-Jungles-Custom-Photo-Studio-Backdrop-Background-Vinyl-220cm-x-150cm.jpg";
const rand = function(num) {
    return Math.floor(Math.random() * num) + 1;
};
const img1 = new Image();
img1.src = "https://vignette4.wikia.nocookie.net/moviepedia/images/5/59/Maurice_in_Madagascar.png/revision/latest?cb=20150205223409";


const gameData = {
  hero: {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 100,
    height: 100,
    xDelta: 1,
    yDelta: 1
},
badGuys: [],
gameOver: false,
score: 0
}
const hero = gameData.hero;

const checkCollide = function(object1, object2) {
    return object1.x < object2.x + object2.width && object1.x + object1.width > object2.x && object1.y < object2.y + object2.height && object1.y + object1.height > object2.y
}
const createBadGuys = function(count, canvasWidth, canvasHeight) {
    const helper = function(n) {
        if (n <= 0) {
            return ""
        }
const x = rand(canvasWidth - 100);
const y = rand(canvasHeight - 100);
const obj = {
            x: x,
            y: y,
            width: 85,
            height: 85,
            yDelta: 1,
            xDelta: 1
        }
if (!checkCollide(obj, hero)) {
  gameData.badGuys.push(obj);
  helper(n - 1)
} else {
  helper(n);
}
    };
    helper(count);
};
setInterval(function() {
createBadGuys(1, canvas.width, canvas.height);
}, 7000);
setInterval(function(){gameData.score = gameData.score + 1}, 1000);
imgHero = new Image();
imgHero.src = "https://www.ingegnocreativo.it/wp-content/uploads/2016/08/tux.png";
createBadGuys(5, canvas.width, canvas.height);
const forEach = function(arr, f) {
    const helper = function(n) {
        if (n === arr.length)
            return;
        f(arr[n]);
        helper(n + 1);
    };
    helper(0);
};
const draw = function() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    const drawBadGuys = function(pt) {
        context.drawImage(img1, pt.x, pt.y, pt.width, pt.height);
    }
    context.drawImage(imgHero, hero.x, hero.y, hero.width, hero.height);
    forEach(gameData.badGuys, drawBadGuys);
}
document.addEventListener('keydown', function(event) {
    if (event.keyCode === 37 && hero.x >= 0) {
        hero.x -= 10;
    } else if (event.keyCode === 38 && hero.y >= 0) {
        hero.y -= 10;
    } else if (event.keyCode === 39 && hero.x + hero.width <= canvas.width) {
        hero.x += 10;
    } else if (event.keyCode === 40 && hero.y + hero.height <= canvas.height) {
        hero.y += 10;
    }

});
const updateData = function() {
    const help = function(point) {
        if (point.x + point.width >= canvas.width || point.x <= 0) {
            point.xDelta = -point.xDelta;
        }
        if (point.y + point.height >= canvas.height || point.y <= 0) {
            point.yDelta = -point.yDelta;
        }
        if (checkCollide(point, hero)) {
          alert("You lose! Try Again! Your score is "+ gameData.score );
          gameData.gameOver = true;
          setTimeout("window.location.reload()",1000)

        }
        if (gameData.score === 60) {
            alert("You finally escaped from the zombies. Congrats.");
            gameData.gameOver = true;
        }
        point.x = point.x + point.xDelta;
        point.y = point.y + point.yDelta;
    }
    forEach(gameData.badGuys, help);
}
const loop = function() {
  if (gameData.gameOver) {return}
    draw();
    updateData();
    requestAnimationFrame(loop);
}
loop();

window.onload = setTimeout(function(){
    alert('Type: You are awesome!!!!');
    window.location = 'qyartuPenguins.html';
}, 30000);
