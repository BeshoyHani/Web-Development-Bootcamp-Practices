let img1 = document.getElementsByClassName('img1')[0];
let img2 = document.getElementsByClassName('img2')[0];
let title = document.querySelector('h1');
let idx1 = Math.random() * 6;
let idx2 = Math.random() * 6;

idx1 = Math.floor(idx1) + 1;
idx2 = Math.floor(idx2) + 1;

img1.setAttribute('src', `./images/dice${idx1}.png`);
img2.src = `./images/dice${idx2}.png`;

if(idx1 > idx2)
    title.innerHTML = "Player 1 Wins!";
else if(idx2 > idx1)
    title.innerHTML = "Player 2 Wins!";
else
    title.innerHTML = "Draw";