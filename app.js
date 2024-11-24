let btn = document.getElementById('btn');
let encryptBtn = document.getElementById('encryptBtn');
let decryptBtn = document.getElementById('decryptBtn');

function leftClick(){

    btn.style.left = '0%';
    encryptBtn.style.color = 'white';
    decryptBtn.style.color = '';

}

function rightClick(){
   
    btn.style.left = '50%';
    decryptBtn.style.color = 'white';
    encryptBtn.style.color = 'black';

}