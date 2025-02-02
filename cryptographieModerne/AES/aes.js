// AES Encryption & Decryption using CryptoJS
function encryptAES() {
    let plaintext = document.getElementById("plainText").value;
    let key = document.getElementById("aesKey").value;

    if (!plaintext || !key) {
        alert("Please enter both text and key!");
        return;
    }

    try {
        let encrypted = CryptoJS.AES.encrypt(plaintext, key).toString();
        document.getElementById("cipherText").value = encrypted;
    } catch (error) {
        alert("Encryption failed!");
    }
}

function decryptAES() {
    let cipherText = document.getElementById("cipherInput").value;
    let key = document.getElementById("decryptKey").value;

    if (!cipherText || !key) {
        alert("Please enter both encrypted text and key!");
        return;
    }

    try {
        let decrypted = CryptoJS.AES.decrypt(cipherText, key).toString(CryptoJS.enc.Utf8);

        if (!decrypted) {
            alert("Decryption failed! Check your key.");
            return;
        }

        document.getElementById("decryptedText").value = decrypted;
    } catch (error) {
        alert("Invalid encryption data or key!");
    }
}
