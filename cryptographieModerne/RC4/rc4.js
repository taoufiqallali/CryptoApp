// RC4 Algorithm for Encryption & Decryption
function rc4(key, text) {
    let s = [], j = 0, x, res = '';
    
    for (let i = 0; i < 256; i++) {
        s[i] = i;
    }

    for (let i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        [s[i], s[j]] = [s[j], s[i]];  // Swap
    }

    i = j = 0;
    for (let y = 0; y < text.length; y++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        [s[i], s[j]] = [s[j], s[i]];  // Swap
        x = s[(s[i] + s[j]) % 256];
        res += String.fromCharCode(text.charCodeAt(y) ^ x);
    }

    return res;
}

// Encrypt Function
function encrypt() {
    let key = document.getElementById("key").value;
    let plaintext = document.getElementById("plaintext").value;
    
    if (!key || !plaintext) {
        alert("Please enter both key and text.");
        return;
    }

    let encryptedText = btoa(rc4(key, plaintext)); // Encode to Base64
    document.getElementById("ciphertext").value = encryptedText;
}

// Decrypt Function
function decrypt() {
    let key = document.getElementById("key-decrypt").value;
    let ciphertext = document.getElementById("ciphertext-input").value;

    if (!key || !ciphertext) {
        alert("Please enter both key and encrypted text.");
        return;
    }

    let decryptedText = rc4(key, atob(ciphertext)); // Decode from Base64
    document.getElementById("decryptedText").value = decryptedText;
}
