let btn = document.getElementById('btn');
let encryptBtn = document.getElementById('encryptBtn');
let decryptBtn = document.getElementById('decryptBtn');
let plainText = document.getElementById('plain-text');
let cypherText = document.getElementById('cypher-text');
const clear_text = document.getElementById('clear_text');
const cypher_text = document.getElementById('cypher_text');
const key = document.getElementById('input');

clear_text.addEventListener('input', () => { cypher_text.textContent = caesarCipher(clear_text.value,key.value) });


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

function toggleDiv() {
    const dropdown = document.getElementById('dropdown');
    const hiddenDiv = document.getElementById('hiddenDiv');
    if (dropdown.value === 'option1') {
        hiddenDiv.style.display = 'block';
    } else {
        hiddenDiv.style.display = 'none';
    }
}

function caesarCipher(text, shift) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    shift = shift % 26; // Handle large keys
    let result = '';

    for (let char of text) {
        const upperChar = char.toUpperCase();
        if (alphabet.includes(upperChar)) {
            const index = alphabet.indexOf(upperChar);
            const newIndex = (index + shift) % 26;
            const newChar = alphabet[newIndex];
            result += char === char.toUpperCase() ? newChar : newChar.toLowerCase();
        } else {
            result += char; // Non-alphabetic characters remain unchanged
        }
    }

    return result;
}