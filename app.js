let btn = document.getElementById('btn');
let encryptBtn = document.getElementById('encryptBtn');
let decryptBtn = document.getElementById('decryptBtn');
let inputTextLabel = document.getElementById('input-text-label');
let outputTextLabel = document.getElementById('output-text-label');
const input_text = document.getElementById('input_text');
const output_text = document.getElementById('output_text');
const key = document.getElementById('input');
let operation_type = 'ENCRYPT';
let selectedOperation = 'ceasar';


const operations = ['ceasar', 'multiplication'];
toggleDiv(); // enable ceasar text box on launch




input_text.addEventListener('input', () => {
    PROCESS();

});

key.addEventListener('input', () => {
    PROCESS();

});


function leftClick() {


    operation_type = 'ENCRYPT';
    btn.style.left = '0%';
    encryptBtn.style.color = 'white';
    decryptBtn.style.color = '';
    inputTextLabel.textContent = 'Plain text';
    outputTextLabel.textContent = 'Cypher text';
    PROCESS();
}

function rightClick() {


    operation_type = 'DECRYPT';
    btn.style.left = '50%';
    decryptBtn.style.color = 'white';
    encryptBtn.style.color = 'black';
    inputTextLabel.textContent = 'Cypher text';
    outputTextLabel.textContent = 'Plain text';
    PROCESS();
}


function toggleDiv() {
    const dropdown = document.getElementById('dropdown');
    for (i = 0; i < operations.length; i++) {
        const hiddenDiv = document.getElementById('hiddenDiv' + operations[i]);
        clearFields();
        if (dropdown.value === operations[i]) {
            hiddenDiv.style.display = 'block';
            selectedOperation = operations[i];

        } else {
            hiddenDiv.style.display = 'none';
        }
    }
}


function caesarDecrypt(text, shift) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    shift = shift % 26; // Handle large keys
    let result = '';

    for (let char of text) {
        const upperChar = char.toUpperCase();
        if (alphabet.includes(upperChar)) {
            const index = alphabet.indexOf(upperChar);
            const newIndex = (index - shift + 26) % 26;
            const newChar = alphabet[newIndex];
            result += char === char.toUpperCase() ? newChar : newChar.toLowerCase();
        } else {
            result += char; // Non-alphabetic characters remain unchanged
        }
    }

    return result;
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

function caesarBruteForce(text) {
    let result = "";
    for (i = 0; i < 26; i++) {

        result = result + "k = " + i + "   " + caesarDecrypt(text, i) + " <br> ";


    }


    return result;
}

function PROCESS() {
    hideError();


    if (operation_type == 'ENCRYPT') { output_text.textContent = encrypt(input_text.value, key.value); }

    else if (key.value != "") { output_text.innerHTML = decrypt(input_text.value, key.value); }

    else {

        output_text.innerHTML = bruteForce(input_text.value, key.value);
    }
}


function encrypt(text, key) {
    switch (selectedOperation) {
        case operations[0]:
            return caesarCipher(text, key);
            break;
        case operations[1]:
            return multiplication(text, key);
            break;

    }


}

function decrypt(text, key) {
    switch (selectedOperation) {
        case operations[0]:
            return caesarDecrypt(text, key);
            break;
        case operations[1]:
            return multiplicationDecrypt(text, key);
            break;

    }


}
function bruteForce(text, key) {
    switch (selectedOperation) {
        case operations[0]:
            return caesarBruteForce(text);
            break;
        case operations[1]:
            return multiplicationBruteForce(text);
            break;

    }


}
function clearFields() {

    output_text.textContent = "";

    input_text.value = "";
}



function multiplication(text, key) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    key = key % 26;
    let result = '';

    if (Number.isInteger(inverseZ26(key))) {
        for (let char of text) {
            const upperChar = char.toUpperCase();
            if (alphabet.includes(upperChar)) {
                const index = alphabet.indexOf(upperChar);
                const newIndex = (index * key) % 26;
                const newChar = alphabet[newIndex];
                result += char === char.toUpperCase() ? newChar : newChar.toLowerCase();
            } else {
                result += char; // Non-alphabetic characters remain unchanged
            }
        }
    } else {
        showError("key is not inversible in Z 26");
        return;
    }

    return result;
}
function multiplicationDecrypt(text, key) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    key = key % 26;
    let result = '';

    if (Number.isInteger(inverseZ26(key))) {
        for (let char of text) {
            const upperChar = char.toUpperCase();
            if (alphabet.includes(upperChar)) {
                const index = alphabet.indexOf(upperChar);
                const newIndex = (index * inverseZ26(key)) % 26;
                const newChar = alphabet[newIndex];
                result += char === char.toUpperCase() ? newChar : newChar.toLowerCase();
            } else {
                result += char; // Non-alphabetic characters remain unchanged
            }
        }
    } else {
        showError("key is not inversible in Z 26");
        return;
    }

    return result;
}


function multiplicationBruteForce(text) {

    let result = "";
    for (i = 0; i < 26; i++) {

        if (Number.isInteger(inverseZ26(i))) {
            result = result + "k = " + i + "   " + multiplicationDecrypt(text, i) + " <br> ";
        }

    }


    return result;



}

function showError(errtext) {
    const err = document.getElementById('error');

    err.textContent = errtext;

    err.style.display = 'block';

}

function hideError() {
    const err = document.getElementById('error');


    err.style.display = 'none';

}

function inverseZ26(num) {
    num = num % 26;
    if (!Number.isInteger(26 / num) || num == 1) {
        for (let i = 25; i > 0; i--) {
            if ((i * num % 26) == 1) { return i; }

        }
    } else return 'error';

}