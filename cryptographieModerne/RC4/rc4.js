// // RC4 Algorithm for Encryption & Decryption
// function rc4(key, text) {
//     let s = [], j = 0, x, res = '';
    
//     for (let i = 0; i < 256; i++) {
//         s[i] = i;
//     }

//     for (let i = 0; i < 256; i++) {
//         j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
//         [s[i], s[j]] = [s[j], s[i]];  // Swap
//     }

//     i = j = 0;
//     for (let y = 0; y < text.length; y++) {
//         i = (i + 1) % 256;
//         j = (j + s[i]) % 256;
//         [s[i], s[j]] = [s[j], s[i]];  // Swap
//         x = s[(s[i] + s[j]) % 256];
//         res += String.fromCharCode(text.charCodeAt(y) ^ x);
//     }

//     return res;
// }

// Encrypt Function
document.getElementById("key").addEventListener("input", function() {
    encrypt();
});

document.getElementById("plaintext").addEventListener("input", function() {
    encrypt();
});

document.getElementById("key-decrypt").addEventListener("input", function() {
    decrypt();
});

document.getElementById("ciphertext-input").addEventListener("input", function() {
    decrypt();
});


function rc4(data, key) {
    // Convert the key to bytes
    let keyBytes = stringToBytes(key);

    // Determine if the input data is hexadecimal
    console.log(data);
    let isHex = /^[0-9A-Fa-f]+$/.test(data);
    console.log(isHex);
    let dataBytes;

    if (isHex) {
        // If the input is hexadecimal, convert it to bytes
        dataBytes = hexToBytes(data);
    } else {
        // If the input is a string, convert it to bytes
        dataBytes = stringToBytes(data);
    }

    // Initialize the S-box
    let S = [];
    for (let i = 0; i < 256; i++) {
        S[i] = i;
    }

    // Key-scheduling algorithm (KSA)
    let j = 0;
    for (let i = 0; i < 256; i++) {
        j = (j + S[i] + keyBytes[i % keyBytes.length]) % 256;
        // Swap S[i] and S[j]
        [S[i], S[j]] = [S[j], S[i]];
    }

    // Pseudo-random generation algorithm (PRGA)
    let i = 0;
    j = 0;
    let outputBytes = [];
    for (let k = 0; k < dataBytes.length; k++) {
        i = (i + 1) % 256;
        j = (j + S[i]) % 256;
        // Swap S[i] and S[j]
        [S[i], S[j]] = [S[j], S[i]];
        let K = S[(S[i] + S[j]) % 256];
        outputBytes.push(dataBytes[k] ^ K);
    }

    // If the input was hexadecimal, return the output as a string
    if (isHex) {
        return bytesToString(outputBytes);
    } else {
        // Otherwise, return the output as a hexadecimal string
        return bytesToHex(outputBytes);
    }
}

// Helper function to convert a string to bytes
function stringToBytes(str) {
    let bytes = [];
    for (let i = 0; i < str.length; i++) {
        bytes.push(str.charCodeAt(i) & 0xFF);
    }
    return bytes;
}

// Helper function to convert bytes to a hexadecimal string
function bytesToHex(bytes) {
    return bytes.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

// Helper function to convert a hexadecimal string to bytes
function hexToBytes(hex) {
    let bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return bytes;
}

// Helper function to convert bytes to a string
function bytesToString(bytes) {
    return String.fromCharCode(...bytes);
}

function stringToHex(str) {
    return stringToBytes(str).map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function encrypt() {
    let key = document.getElementById("key").value;
    let plaintext = document.getElementById("plaintext").value;
    
    

    let encryptedText = (rc4(plaintext,key)); // Encode to Base64
    document.getElementById("ciphertext").value = encryptedText;
}

// Decrypt Function
function decrypt() {
    let key = document.getElementById("key-decrypt").value;
    let ciphertext = document.getElementById("ciphertext-input").value;


    let decryptedText = rc4((ciphertext),key ); // Decode from Base64
    document.getElementById("decryptedText").value = decryptedText;
}

