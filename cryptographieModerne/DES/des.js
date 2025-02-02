// Basic DES encryption and decryption function
function encrypt() {
    let plainText = document.getElementById("plainText").value;
    let key = document.getElementById("key").value;
    
    if (key.length !== 8) {
        alert("Key must be exactly 8 characters long!");
        return;
    }

    // Simple "encryption" by shifting characters (just for demo purposes)
    let encrypted = desEncrypt(plainText, key);
    document.getElementById("encryptedText").value = encrypted;
}

function decrypt() {
    let encryptedText = document.getElementById("encryptedInput").value;
    let key = document.getElementById("decryptionKey").value;

    if (key.length !== 8) {
        alert("Key must be exactly 8 characters long!");
        return;
    }

    // Simple "decryption" (just for demo purposes)
    let decrypted = desDecrypt(encryptedText, key);
    document.getElementById("decryptedText").value = decrypted;
}

// A mock DES encryption function (for demo purposes)
function desEncrypt(plainText, key) {
    let encrypted = '';
    for (let i = 0; i < plainText.length; i++) {
        encrypted += String.fromCharCode(plainText.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return encrypted;
}

// A mock DES decryption function (for demo purposes)
function desDecrypt(encryptedText, key) {
    let decrypted = '';
    for (let i = 0; i < encryptedText.length; i++) {
        decrypted += String.fromCharCode(encryptedText.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return decrypted;
}
