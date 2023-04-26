var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var isStarted = false;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $('h1').text(`Level ${level}`);

    let randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColour = buttonColours[randomNumber];
    flashBox(randomChosenColour);
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);

}

function flashBox(boxID) {
    $(`#${boxID}`).fadeOut(100).fadeIn(100);

}

function playSound(soundName) {
    let sound = new Audio(`sounds/${soundName}.mp3`);
    sound.play();
}

$('.btn').click(function () {
    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass('pressed');
    setTimeout(function () {
        $(`#${currentColour}`).removeClass('pressed');
    }, 100)
}


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);
        startOver();
        $('h1').text('Game Over, Press Any Key to Restart');
    }
}


function startOver(){
    level = 0;
    isStarted = false;
    gamePattern = [];
}

$(document).keypress(function () {
    if (!isStarted) {
        nextSequence();
        isStarted = true;
    }
});