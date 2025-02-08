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

const operations = ['ceasar', 'multiplication', 'affine', 'Vigenere', 'Permutation', 'Transposition', 'Hill'];

//values for Permutation

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const PermutationTableBody = document.getElementById("PermutationTableBody");

const TranspositiontableBody = document.getElementById("TranspositionTableBody");
const TranspositionKeySize = document.getElementById("TranspositionKeySize");

generateMatrix();
createTable();

TranspositioncreateTable();
// List of supported operations

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
        case ('Permutation'):
            if (operation_type == 'ENCRYPT') {
                output_text.textContent = Permutation(input_text.value);
            } else {
                output_text.textContent = DecryptPermutation(input_text.value);
            }

            break;

        case ('Transposition'):
            if (operation_type == 'ENCRYPT') {
                output_text.textContent = Transposition(input_text.value);
            } else {
                output_text.textContent = DecryptTransposition(input_text.value);
            }

            break;
        case ('Hill'):
            if (operation_type == 'ENCRYPT') {
                output_text.textContent = Hill(input_text.value);
            } else {
                output_text.textContent = DecryptHill(input_text.value);
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
    errors = 0;

    key2 = key.toUpperCase();
    for (let k of key2) {
        if (!alphabet.includes(k)) { errors++; }
    }
    if (errors == 0) { hideError(); } else { showError('valeurs de cles non alphabetiques'); }

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
            return Permutation(text);
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
            return DecryptPermutation(text);
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

        PermutationTableBody.appendChild(tr);
    });

}

function randomizeRow() {
    let shuffled = [...alphabet].sort(() => Math.random() - 0.5);
    let inputs = PermutationTableBody.getElementsByTagName('input');
    for (let i = 0; i < 26; i++) {
        inputs[i].value = shuffled[i];
    }
    toggleDiv();

}


function enforceUnique(event) {
    errors = 0;
    let inputs = Array.from(PermutationTableBody.getElementsByTagName('input'));
    let seen = new Set();
    permTable = inputs.map(input => input.value);
    inputs.forEach(input => {
        let value = input.value.toUpperCase();
        if (value && seen.has(value)) {
            showError('lettre doubler  ' + value);
            errors++;
        } else {
            seen.add(value);
        }
    });
    if (errors == 0) { hideError(); }

    toggleDiv();
}

function Permutation(text) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    cleartext = text.toUpperCase();  // Clean input, remove non-alphabet characters
    let inputs = Array.from(PermutationTableBody.getElementsByTagName('input'));
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

function DecryptPermutation(text) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    cleartext = text.toUpperCase();  // Clean input, remove non-alphabet characters
    let inputs = Array.from(PermutationTableBody.getElementsByTagName('input'));
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


function TranspositioncreateTable() {
    keySize = (TranspositionKeySize.value);
    TranspositiontableBody.innerHTML = '';
    mytable = [];

    for (i = 0; i < keySize; i++) {

        mytable.push(i + 1);
    }

    mytable.forEach(num => {
        let tr = document.createElement('tr');

        let th = document.createElement('th');
        th.textContent = num;
        tr.appendChild(th);

        let td = document.createElement('td');
        let input = document.createElement('input');
        input.type = 'number';
        input.maxLength = 1;
        input.oninput = TranspositionEnforceUnique;
        input.value = num;

        td.appendChild(input);
        tr.appendChild(td);

        TranspositiontableBody.appendChild(tr);


    });

}

function TranspositionRandomizeRow() {
    keySize = (TranspositionKeySize.value);
    const arr = Array.from({ length: keySize }, (_, i) => i + 1);
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    let inputs = TranspositionTableBody.getElementsByTagName('input');
    for (let i = 0; i < keySize; i++) {
        inputs[i].value = arr[i];
    }
    TranspositionEnforceUnique();
    toggleDiv();
}

function TranspositionEnforceUnique(event) {
    keySize = Number((TranspositionKeySize.value));
    errors = 0;
    let inputs = Array.from(TranspositionTableBody.getElementsByTagName('input'));
    let seen = new Set();
    permTable = inputs.map(input => input.value);
    inputs.forEach(input => {
        let value = Number(input.value);

        if (value && seen.has(value)) {
            showError('Nombre doubler  ' + value);
            errors++;
        } else {
            seen.add(value);
        }
        if (value < 1 || value > keySize) {
            showError('Nombre non valide  ' + value);
            errors++;
        }
    });
    if (errors == 0) { hideError(); }

    toggleDiv();
}


function Transposition(text) {
    let inputs = Array.from(TranspositionTableBody.getElementsByTagName('input'));
    permutation = inputs.map(input => input.value);

    const cleanText = text.replace(/\s+/g, '');
    const n = permutation.length;
    const result = [];

    // Process text in blocks of size n
    for (let i = 0; i < cleanText.length; i += n) {
        const block = cleanText.slice(i, i + n);

        // If the block is smaller than n, pad it with empty spaces
        const paddedBlock = block.padEnd(n, ' ');

        // Create the transposed block using the permutation
        const transposedBlock = new Array(n);
        for (let j = 0; j < n; j++) {
            transposedBlock[j] = paddedBlock[permutation[j] - 1];
        }
        // Add the transposed block to the result
        result.push(transposedBlock.join(''));
    }

    // Join all blocks and trim any padding spaces
    return result.join('').trimEnd();
}


function DecryptTransposition(text) {

    let inputs = Array.from(TranspositionTableBody.getElementsByTagName('input'));
    permutation = inputs.map(input => input.value);

    const cleanText = text.replace(/\s+/g, '');
    const n = permutation.length;
    const result = [];
    const arr = Object.values(permutation);
    const perm_temp = [];

    for (i = 0; i < n; i++) {
        perm_temp[i] = arr.indexOf(String(i + 1)) + 1;
    }

    // Process text in blocks of size n
    for (let i = 0; i < cleanText.length; i += n) {
        const block = cleanText.slice(i, i + n);

        // If the block is smaller than n, pad it with empty spaces
        const paddedBlock = block.padEnd(n, ' ');

        // Create the transposed block using the perm_temp
        const transposedBlock = new Array(n);
        for (let j = 0; j < n; j++) {
            transposedBlock[j] = paddedBlock[perm_temp[j] - 1];
        }

        // Add the transposed block to the result
        result.push(transposedBlock.join(''));
    }

    // Join all blocks and trim any padding spaces
    return result.join('').trimEnd();

}


function generateMatrix() {
    const n = parseInt(document.getElementById("size").value);
    if (isNaN(n) || n < 1 || n > 6) return;

    let container = document.getElementById("matrix-container");
    container.innerHTML = ""; // Clear previous matrix

    let table = document.createElement("table");
    for (let i = 0; i < n; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < n; j++) {
            let cell = document.createElement("td");
            let input = document.createElement("input");
            input.type = "number";
            input.style.width = "100%";
            input.style.border = "none";
            input.style.textAlign = "center";
            input.oninput = updateHill;
            row.appendChild(cell);
            cell.appendChild(input);
        }
        table.appendChild(row);
    }
    container.appendChild(table);
}

 function fillMatrixWithRandomValues() {
    const matrixContainer = document.getElementById("matrix-container");
    const inputs = matrixContainer.querySelectorAll("input");
    let matrix_A = Array.from(matrixContainer.getElementsByTagName('input'));
    matrix_t = matrix_A.map(input => Number(input.value));

    const n = Math.sqrt(matrix_t.length);


    matrix=generateInvertibleMatrixZ26(n)

    inputs.forEach((input, index) => {
        let i = Math.floor(index / n); // Determine the row (i)
        let j = index % n;             // Determine the column (j)
        
        input.value = matrix[i][j];    // Fill input with the corresponding value from the matrix
    });
    
    if(!matrixInvertibleZ26(matrix)){showError('matrice non inversible dans Z26');}else{hideError();}
    toggleDiv();

}

function updateHill(event){
    const matrixContainer = document.getElementById("matrix-container");

    let matrix_A = Array.from(matrixContainer.getElementsByTagName('input'));
    matrix_t = matrix_A.map(input => Number(input.value));

    const n = Math.sqrt(matrix_t.length);
    matrix=[];
    
    for (let i = 0; i < n; i++) {
        matrix.push(matrix_t.slice(i * n, (i + 1) * n));
    }

    if(!matrixInvertibleZ26(matrix)){showError('matrice non inversible dans Z26');}else{hideError();}

    toggleDiv();
}


function matrixMultiplyVector(matrix, vector) {
    const result = new Array(matrix.length).fill(0);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < vector.length; j++) {
            result[i] += matrix[i][j] * vector[j];
        }
        result[i] = result[i] % 26; // Apply mod 26
    }
    return result;
}


function Hill(text) {
    const matrixContainer = document.getElementById("matrix-container");
    let matrix_A = Array.from(matrixContainer.getElementsByTagName('input'));
    matrix_t = matrix_A.map(input => Number(input.value));

    const n = Math.sqrt(matrix_t.length);

    let matrix = [];
    for (let i = 0; i < n; i++) {
        matrix.push(matrix_t.slice(i * n, (i + 1) * n));
    }




    let cleanText = text.replace(/[^A-Z]/gi, '').toUpperCase(); // Remove non-letters
    while (cleanText.length % n !== 0) cleanText += 'A'; // Padding with 'X' if needed

    let numbers = cleanText.toUpperCase().split('').map(char => char.charCodeAt(0) - 65);
    let cipherNumbers = [];

    for (let i = 0; i < numbers.length; i += n) {
        let block = numbers.slice(i, i + n);
        let encryptedBlock = matrixMultiplyVector(matrix, block);
        cipherNumbers.push(...encryptedBlock);
    }

    return cipherNumbers.map(num => String.fromCharCode(num + 65)).join('');
}

function DecryptHill(text) {

    const matrixContainer = document.getElementById("matrix-container");
    let matrix_A = Array.from(matrixContainer.getElementsByTagName('input'));
    matrix_t = matrix_A.map(input => Number(input.value));

    const n = Math.sqrt(matrix_t.length);

    let matrix = [];
    for (let i = 0; i < n; i++) {
        matrix.push(matrix_t.slice(i * n, (i + 1) * n));
    }

    matrix=inverseMatrixZ26(matrix);


    let cleanText = text.replace(/[^A-Z]/gi, '').toUpperCase(); // Remove non-letters
    while (cleanText.length % n !== 0) cleanText += 'A'; // Padding with 'X' if needed

    let numbers = cleanText.toUpperCase().split('').map(char => char.charCodeAt(0) - 65);
    let cipherNumbers = [];

    for (let i = 0; i < numbers.length; i += n) {
        let block = numbers.slice(i, i + n);
        let encryptedBlock = matrixMultiplyVector(matrix, block);
        cipherNumbers.push(...encryptedBlock);
    }

    return cipherNumbers.map(num => String.fromCharCode(num + 65)).join('');
}

function matrixInvertibleZ26(matrix) {
    function gcd(a, b) {
        return b ? gcd(b, a % b) : Math.abs(a);
    }
    
    function determinant(mat) {
        let n = mat.length;
        if (n === 1) return ((mat[0][0] % 26) + 26) % 26;
        if (n === 2) {
            let det = ((mat[0][0] * mat[1][1]) % 26 - (mat[0][1] * mat[1][0]) % 26 + 26) % 26;
            return det;
        }
        
        let det = 0;
        for (let i = 0; i < n; i++) {
            let subMatrix = mat.slice(1).map(row => row.filter((_, j) => j !== i));
            let subDet = determinant(subMatrix);
            let sign = i % 2 === 0 ? 1 : 25; // Using 25 instead of -1 in Z26
            let term = (((sign * mat[0][i]) % 26) * subDet) % 26;
            det = (det + term + 26) % 26;
        }
        return det;
    }
    
    let det = determinant(matrix);
    return det && gcd(det, 26) === 1 ? 1 : 0;
}


function generateInvertibleMatrixZ26(n) {
    // Helper function to check if matrix is invertible
    function isInvertibleZ26(matrix) {
        function gcd(a, b) {
            return b ? gcd(b, a % b) : Math.abs(a);
        }
        
        function determinant(mat) {
            let n = mat.length;
            if (n === 1) return ((mat[0][0] % 26) + 26) % 26;
            if (n === 2) {
                let det = ((mat[0][0] * mat[1][1]) % 26 - (mat[0][1] * mat[1][0]) % 26 + 26) % 26;
                return det;
            }
            
            let det = 0;
            for (let i = 0; i < n; i++) {
                let subMatrix = mat.slice(1).map(row => row.filter((_, j) => j !== i));
                let subDet = determinant(subMatrix);
                let sign = i % 2 === 0 ? 1 : 25; // Using 25 instead of -1 in Z26
                let term = (((sign * mat[0][i]) % 26) * subDet) % 26;
                det = (det + term + 26) % 26;
            }
            return det;
        }
        
        let det = determinant(matrix);
        return det && gcd(det, 26) === 1;
    }

    // Generate matrix with numbers coprime to 26 on diagonal
    // and random numbers elsewhere
    function generateMatrix(size) {
        // Numbers coprime to 26 (potential diagonal elements)
        const coprimeNumbers = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
        
        // Initialize matrix with zeros
        let matrix = Array(size).fill().map(() => Array(size).fill(0));
        
        // Fill diagonal with coprime numbers
        for (let i = 0; i < size; i++) {
            const randomIndex = Math.floor(Math.random() * coprimeNumbers.length);
            matrix[i][i] = coprimeNumbers[randomIndex];
        }
        
        // Fill rest with random numbers
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (i !== j) {
                    matrix[i][j] = Math.floor(Math.random() * 26);
                }
            }
        }
        
        return matrix;
    }

    // Generate matrices until we find an invertible one
    let matrix;
    do {
        matrix = generateMatrix(n);
    } while (!isInvertibleZ26(matrix));

    return matrix;
}


function inverseMatrixZ26(matrix) {
    const n = matrix.length;

    // Helper function to calculate the determinant of a matrix
    function determinant(matrix) {
        const n = matrix.length;
        if (n === 1) return matrix[0][0];
        if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        if (n === 3) {
            return (
                matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
                matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
                matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])
            );
        }
        // For n > 3, use a recursive Laplace expansion
        let det = 0;
        for (let i = 0; i < n; i++) {
            let subMatrix = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
            det += matrix[0][i] * (i % 2 === 0 ? 1 : -1) * determinant(subMatrix);
        }
        return det;
    }

    // Helper function to calculate the modular inverse of a number modulo 26
    function modularInverse(a, mod) {
        a = ((a % mod) + mod) % mod; // Ensure a is positive
        for (let x = 1; x < mod; x++) {
            if ((a * x) % mod === 1) {
                return x;
            }
        }
        return null; // No inverse exists
    }

    // Helper function to calculate the adjugate matrix
    function adjugate(matrix) {
        const adj = [];
        for (let i = 0; i < n; i++) {
            adj[i] = [];
            for (let j = 0; j < n; j++) {
                // Create the submatrix for the minor
                const subMatrix = matrix
                    .filter((_, row) => row !== i)
                    .map(row => row.filter((_, col) => col !== j));
                const sign = (i + j) % 2 === 0 ? 1 : -1;
                adj[i][j] = sign * determinant(subMatrix);
            }
        }
        // Transpose the adjugate matrix
        return adj[0].map((_, col) => adj.map(row => row[col]));
    }

    // Step 1: Calculate the determinant
    const det = determinant(matrix);
    const detMod26 = ((det % 26) + 26) % 26; // Ensure positive value

    // Step 2: Check if the matrix is invertible in Z26
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    if (gcd(detMod26, 26) !== 1) {
        throw new Error("Matrix is not invertible in Z26");
    }

    // Step 3: Calculate the modular inverse of the determinant
    const detInverse = modularInverse(detMod26, 26);
    if (detInverse === null) {
        throw new Error("Modular inverse of determinant does not exist");
    }

    // Step 4: Calculate the adjugate matrix
    const adj = adjugate(matrix);

    // Step 5: Calculate the inverse matrix
    const inverse = adj.map(row =>
        row.map(value => {
            const modValue = ((value * detInverse) % 26 + 26) % 26; // Ensure positive value
            return modValue;
        })
    );

    return inverse;
}
