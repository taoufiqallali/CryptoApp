// Define references to various elements on the page
let btn = document.getElementById('btn');
let encryptBtn = document.getElementById('encryptBtn');
let decryptBtn = document.getElementById('decryptBtn');
let inputTextLabel = document.getElementById('input-text-label');
let outputTextLabel = document.getElementById('output-text-label');
const input_text = document.getElementById('input_text');
const output_text = document.getElementById('output_text');
let key = document.getElementById('inputceasar');
let operation_type = 'ENCRYPT'; // Default operation type
let selectedOperation = 'ceasar'; // Default selected operation
let key_a = "";
let key_b = "";


//values for Transposition

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const tableBody = document.getElementById('tableBody');

createTable();
// List of supported operations
const operations = ['ceasar', 'multiplication', 'affine', 'Vigenere', 'Transposition'];
toggleDiv(); // Enable Caesar textbox on launch

// Event listener to toggle operation-specific inputs
input_text.addEventListener('input', () => {
    toggleDiv(); // to update the output text
});

// Set UI elements for encryption
function leftClick() {
    operation_type = 'ENCRYPT';
    btn.style.left = '0%';
    encryptBtn.style.color = 'white';
    decryptBtn.style.color = '';
    inputTextLabel.textContent = 'Plain text';
    outputTextLabel.textContent = 'Cypher text';
    toggleDiv(); // to update the output text
}

// Set UI elements for decryption
function rightClick() {
    operation_type = 'DECRYPT';
    btn.style.left = '50%';
    decryptBtn.style.color = 'white';
    encryptBtn.style.color = 'black';
    inputTextLabel.textContent = 'Cypher text';
    outputTextLabel.textContent = 'Plain text';
    toggleDiv(); // to update the output text
}

// Toggle visibility of input fields based on selected operation
function toggleDiv() {
    let dropdown = document.getElementById('dropdown');

    for (i = 0; i < operations.length; i++) {
        let hiddenDiv = document.getElementById('hiddenDiv' + operations[i]);

        clearFields(); // Clear input/output fields
        if (dropdown.value === operations[i]) {
            hiddenDiv.style.display = 'block';
            selectedOperation = operations[i];
        } else {
            hiddenDiv.style.display = 'none';
        }
    }

    switch (dropdown.value) {
        case ('ceasar'):
            key = document.getElementById('inputceasar');
            key.addEventListener('input', () => {
                PROCESS();
            });
            PROCESS();
            break;
        case ('multiplication'):
            key = document.getElementById('inputmultiplication');
            key.addEventListener('input', () => {
                PROCESS();
            });
            PROCESS();
            break;
        case ('affine'):
            key_a = document.getElementById('inputaffine_a');
            key_a.addEventListener('input', () => {
                PROCESS_affine();
            });
            key_b = document.getElementById('inputaffine_b');
            key_b.addEventListener('input', () => {
                PROCESS_affine();
            });
            PROCESS_affine();
            break;
        case ('Vigenere'):
            key = document.getElementById('inputVigenere');
            key.addEventListener('input', () => {
                PROCESS();
            });
            PROCESS();
            break;
        case ('Transposition'):
            if (operation_type == 'ENCRYPT'){
                output_text.textContent = Transposition(input_text.value);
            }else{
                output_text.textContent = DecryptTransposition(input_text.value);
            }
            
            break;

        default:
            break;
    }
}

// Caesar cipher decryption function
function caesarDecrypt(text, shift) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    shift = regulate26(shift); // Normalize the shift value
    let result = '';

    for (let char of text) {
        const upperChar = char.toUpperCase();
        if (alphabet.includes(upperChar)) {
            const index = alphabet.indexOf(upperChar);
            const newIndex = (index - shift + 26) % 26;
            const newChar = alphabet[newIndex];
            result += char === char.toUpperCase() ? newChar : newChar.toLowerCase();
        } else {
            result += char; // Keep non-alphabetic characters unchanged
        }
    }

    return result;
}

// Caesar cipher encryption function
function caesarCipher(text, shift) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    shift = regulate26(shift); // Normalize the shift value
    let result = '';

    for (let char of text) {
        const upperChar = char.toUpperCase();
        if (alphabet.includes(upperChar)) {
            const index = alphabet.indexOf(upperChar);
            const newIndex = (index + shift) % 26;
            const newChar = alphabet[newIndex];
            result += char === char.toUpperCase() ? newChar : newChar.toLowerCase();
        } else {
            result += char; // Keep non-alphabetic characters unchanged
        }
    }
    return result;
}

// Brute force decryption for Caesar cipher
function caesarBruteForce(text) {
    let result = "";
    for (i = 0; i < 26; i++) {
        result = result + "k = " + i + "   " + caesarDecrypt(text, i) + " <br> ";
    }
    return result;
}

function vigenere(text, key) {
    text = text.toLowerCase(); // Normalize text
    key = key.toLowerCase();  // Normalize key
    errors=0;

    key2 = key.toUpperCase();
    for(let k of key2){
        if(!alphabet.includes(k)){errors++;}
    }
    if(errors==0){hideError();}else{showError('valeurs de cles non alphabetiques');}
    
    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (char >= 'a' && char <= 'z') {
            let shift = key[keyIndex % key.length].charCodeAt(0) - 'a'.charCodeAt(0);

            let newChar = String.fromCharCode(((char.charCodeAt(0) - 'a'.charCodeAt(0) + shift) % 26) + 'a'.charCodeAt(0));

            result += newChar;
            keyIndex++;
        } else {
            result += char; // Non-alphabetic characters are preserved
        }
    }

    return result;
}

function vigenereDecrypt(text, key) {
    text = text.toLowerCase(); // Ensure text is lowercase
    key = key.toLowerCase();   // Ensure key is lowercase

    let decryptedText = '';
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (char >= 'a' && char <= 'z') {
            const textCharCode = char.charCodeAt(0) - 97; // 'a' -> 0
            const keyCharCode = key[keyIndex % key.length].charCodeAt(0) - 97; // 'a' -> 0

            const decryptedCharCode = (textCharCode - keyCharCode + 26) % 26 + 97; // Wrap around
            decryptedText += String.fromCharCode(decryptedCharCode);

            keyIndex++;
        } else {
            decryptedText += char;
        }
    }

    return decryptedText;
}


// Process function for Caesar and Multiplication ciphers
function PROCESS() {
    hideError(); // Clear any existing error messages

    if (operation_type == 'ENCRYPT') {
        output_text.textContent = encrypt(input_text.value, key.value);
    } else if (key.value != "") {

        output_text.innerHTML = decrypt(input_text.value, key.value);

    } else if (selectedOperation == 'Vigenere') {

        output_text.innerHTML = '';
    } else {
        output_text.innerHTML = bruteForce(input_text.value, key.value);

    }
}

// Process function for Affine cipher
function PROCESS_affine() {
    hideError();

    if (operation_type == 'ENCRYPT') {
        output_text.textContent = affine(input_text.value, key_a.value, key_b.value);
    } else if (key_a.value != "" && key_b.value != "") {
        output_text.innerHTML = affineDecrypt(input_text.value, key_a.value, key_b.value);
    } else if (key_a.value == "" && key_b.value != "") {
        output_text.innerHTML = affineDecrypt_b(input_text.value, key_b.value);
    } else if (key_b.value == "" && key_a.value != "") {
        output_text.innerHTML = affineDecrypt_a(input_text.value, key_a.value);
    } else {
        output_text.innerHTML = 'type value for a or b';
    }
}

// Encrypt text based on the selected operation
function encrypt(text, key) {
    switch (selectedOperation) {
        case operations[0]:
            return caesarCipher(text, key);
        case operations[1]:
            return multiplication(text, key);
        case operations[3]:
            return vigenere(text, key);
        case operations[4]:
            return Transposition(text);
    }
}

// Decrypt text based on the selected operation
function decrypt(text, key) {
    switch (selectedOperation) {
        case operations[0]:
            return caesarDecrypt(text, key);
        case operations[1]:
            return multiplicationDecrypt(text, key);
        case operations[3]:
            return vigenereDecrypt(text, key);
        case operations[4]:
            return DecryptTransposition(text);
    }
}

// Brute force decryption based on the selected operation
function bruteForce(text, key) {
    switch (selectedOperation) {
        case operations[0]:
            return caesarBruteForce(text);
        case operations[1]:
            return multiplicationBruteForce(text);
    }
}

// Clear input and output fields
function clearFields() {
    output_text.textContent = "";
}

// Multiplication cipher encryption function
function multiplication(text, key) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    key = regulate26(key); // Normalize the key value
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
                result += char; // Keep non-alphabetic characters unchanged
            }
        }
    } else {
        showError("key is not inversible in Z 26");
        return;
    }

    return result;
}

// Multiplication cipher decryption function
function multiplicationDecrypt(text, key) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    key = regulate26(key); // Normalize the key value
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
                result += char; // Keep non-alphabetic characters unchanged
            }
        }
    } else {
        showError("key is not inversible in Z 26");
        return;
    }

    return result;
}

// Brute force decryption for Multiplication cipher
function multiplicationBruteForce(text) {
    let result = "";
    for (i = 0; i < 26; i++) {
        if (Number.isInteger(inverseZ26(i))) {
            result = result + "k = " + i + "   " + multiplicationDecrypt(text, i) + " <br> ";
        }
    }
    return result;
}

// Affine cipher encryption function
function affine(text, key_a, key_b) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    key_a = regulate26(key_a); // Normalize the key_a value
    key_b = regulate26(key_b); // Normalize the key_b value
    let result = "";

    if (Number.isInteger(inverseZ26(key_a))) {
        for (let c of text) {
            const char = c.toUpperCase();
            if (alphabet.includes(char)) {
                const index = alphabet.indexOf(char);
                let newindex = (index * key_a + key_b) % 26;
                newindex = (newindex + 26) % 26; // Ensure positive index
                if (c === char) {
                    result += alphabet[newindex];
                } else {
                    result += alphabet[newindex].toLowerCase();
                }
            } else {
                result += c;
            }
        }
        return result;
    } else {
        showError("a is not inversible in Z 26");
    }
}

// Affine cipher decryption function
function affineDecrypt(text, key_a, key_b) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    key_a = regulate26(key_a); // Normalize the key_a value
    key_b = regulate26(key_b); // Normalize the key_b value

    let result = "";

    if (Number.isInteger(inverseZ26(key_a))) {
        for (let c of text) {
            const char = c.toUpperCase();
            if (alphabet.includes(char)) {
                const index = alphabet.indexOf(char);
                let newindex = ((index - key_b) * inverseZ26(key_a)) % 26;
                newindex = (newindex + 26) % 26; // Ensure positive index
                if (c === char) {
                    result += alphabet[newindex];
                } else {
                    result += alphabet[newindex].toLowerCase();
                }
            } else {
                result += c;
            }
        }
        return result;
    } else {
        showError("a is not inversible in Z 26");
    }
}

// Decrypt Affine cipher using brute force for key_b
function affineDecrypt_b(text, key_b) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    key_b = regulate26(key_b); // Normalize the key_b value

    let result = "";

    for (let i = 1; i < 26; i++) {
        if (Number.isInteger(inverseZ26(i))) {
            result += ("a = " + i + " ");
            for (let c of text) {
                const char = c.toUpperCase();
                if (alphabet.includes(char)) {
                    const index = alphabet.indexOf(char);
                    let newindex = ((index - key_b) * inverseZ26(i)) % 26;
                    newindex = (newindex + 26) % 26; // Ensure positive index
                    if (c === char) {
                        result += alphabet[newindex];
                    } else {
                        result += alphabet[newindex].toLowerCase();
                    }
                } else {
                    result += c;
                }
            }
            result += " <br> ";
        }
    }
    return result;
}

// Decrypt Affine cipher using brute force for key_a
function affineDecrypt_a(text, key_a) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    key_a = regulate26(key_a); // Normalize the key_a value

    let result = "";

    for (let i = 1; i < 26; i++) {
        if (Number.isInteger(inverseZ26(key_a))) {
            result += ("b = " + i + " ");
            for (let c of text) {
                const char = c.toUpperCase();
                if (alphabet.includes(char)) {
                    const index = alphabet.indexOf(char);
                    let newindex = ((index - i) * inverseZ26(key_a)) % 26;
                    newindex = (newindex + 26) % 26; // Ensure positive index
                    if (c === char) {
                        result += alphabet[newindex];
                    } else {
                        result += alphabet[newindex].toLowerCase();
                    }
                } else {
                    result += c;
                }
            }
            result += " <br> ";
        } else {
            showError('a is not inversible in Z 26');
        }
    }
    return result;
}

// display key errors
function showError(errtext) {
    const err = document.getElementById('error');

    err.textContent = errtext;

    err.style.display = 'block';

}

// hide key errors
function hideError() {
    const err = document.getElementById('error');


    err.style.display = 'none';

}

// inverse a number in z26
function inverseZ26(num) {
    num = num % 26;
    if (!Number.isInteger(26 / num) || num == 1) {
        for (let i = 25; i > 0; i--) {
            if ((i * num % 26) == 1) { return i; }

        }
    } else return 'error';

}

//normalize a number to be positive and in z26
function regulate26(key) {
    key = ((key % 26) + 26) % 26;

    if (Number.isInteger(key)) {
        return key;
    }
    else { return 0; }
}
function createTable() {
    alphabet.forEach(letter => {
        let tr = document.createElement('tr');

        let th = document.createElement('th');
        th.textContent = letter;
        tr.appendChild(th);

        let td = document.createElement('td');
        let input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.value = letter;
        input.oninput = enforceUnique;
        td.appendChild(input);
        tr.appendChild(td);

        tableBody.appendChild(tr);
    });

}

function randomizeRow() {
    let shuffled = [...alphabet].sort(() => Math.random() - 0.5);
    let inputs = tableBody.getElementsByTagName('input');
    for (let i = 0; i < 26; i++) {
        inputs[i].value = shuffled[i];
    }
    toggleDiv();

}


function enforceUnique(event) {
    errors=0;
    let inputs = Array.from(tableBody.getElementsByTagName('input'));
    let seen = new Set();
    permTable = inputs.map(input => input.value);
    inputs.forEach(input => {
        let value = input.value.toUpperCase();
        if (value && seen.has(value)) {
            showError('lettre doubler  '+value);
            errors++;
        } else {
            seen.add(value);
        }
    });
    if(errors==0){hideError();}

    toggleDiv();
}

function Transposition(text) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    cleartext = text.toUpperCase();  // Clean input, remove non-alphabet characters
    let inputs = Array.from(tableBody.getElementsByTagName('input'));
    permTable = inputs.map(input => input.value);
    let cipherText = '';
    for (let i = 0; i < cleartext.length; i++) {
        let char = cleartext[i];
        if (alphabet.includes(char)) {
            let index = alphabet.indexOf(char);
            if (index !== -1) {
                cipherText += permTable[index];
            }
        }
        else { cipherText += char; }
    }
    return cipherText;
}

function DecryptTransposition(text) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    cleartext = text.toUpperCase();  // Clean input, remove non-alphabet characters
    let inputs = Array.from(tableBody.getElementsByTagName('input'));
    permTable = inputs.map(input => input.value);
    let cipherText = '';

    for (let i = 0; i < cleartext.length; i++) {
        let char = cleartext[i];
        if (alphabet.includes(char)) {
            let index = permTable.indexOf(char);
            if (index !== -1) {
                cipherText += alphabet[index];
            }
        }

        else { cipherText += char; }
    }

    return cipherText;
}
