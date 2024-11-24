let btn = document.getElementById('btn');
let encryptBtn = document.getElementById('encryptBtn');
let decryptBtn = document.getElementById('decryptBtn');
let plainText = document.getElementById('plain-text');
let cypherText = document.getElementById('cypher-text');

function leftClick(){

    btn.style.left = '0%';
    encryptBtn.style.color = 'white';
    decryptBtn.style.color = '';
    plainText.textContent = 'Plain text';
    cypherText.textContent = 'Cypher text';

}

function rightClick(){
   
    btn.style.left = '50%';
    decryptBtn.style.color = 'white';
    encryptBtn.style.color = 'black';
    plainText.textContent = 'Cypher text';
    cypherText.textContent = 'Plain text';

}