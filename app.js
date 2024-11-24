let btn = document.getElementById('btn');
let encryptBtn = document.getElementById('encriptBtn');
let decryptBtn = document.getElementById('decriptBtn');

function leftClick(){
    encryptBtn.style.color = ""; 
    decryptBtn.style.color = ""; 


    btn.style.left = '0%';
    encryptBtn.style.color = 'white';
    decryptBtn.style.color = '';

}

function rightClick(){
    encryptBtn.style.color = ""; 
    decryptBtn.style.color = ""; 


    btn.style.left = '50%';
    decryptBtn.style.color = 'white';
    encryptBtn.style.color = '';

}