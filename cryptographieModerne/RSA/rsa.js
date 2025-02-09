// RSA encryption and decryption logic (using a basic library or custom implementation)
function H_encrypt() {
    const plainText = document.getElementById('plainText').value;
    const publicKey = document.getElementById('publickey').value;
    const Key_pub=document.getElementById('Key_pub').value;
    e= publicKey;
    n= Key_pub;
    const key = { e, n };
   
    const encryptedText = encrypt(plainText, key);

    
    document.getElementById('encryptedText').value = encryptedText;
}

function H_decrypt() {
    const encryptedText = document.getElementById('encryptedInput').value;
    const privateKey = document.getElementById('privateKey').value;
    const Key_pri=document.getElementById('Key_pri').value;

    d= privateKey;
    n= Key_pri;
    const key = { d, n };
  
    const arr  = encryptedText.split(",").map(Number);

   
    const decryptedText = decrypt(arr, key);


    document.getElementById('decryptedText').value = decryptedText;
}


function Generate_keys(){
    
    key=generateKeyPair(8);

    key_G=key.privateKey.n;
    publicKey_G=key.publicKey.e;
    privateKey_G=key.privateKey.d;

    document.getElementById('key_G').value = key_G;
    document.getElementById('publicKey_G').value = publicKey_G;
    document.getElementById('privateKey_G').value = privateKey_G;
}

function copy_keys(){
    n=document.getElementById('key_G').value ;
    e=document.getElementById('publicKey_G').value;
    d=document.getElementById('privateKey_G').value;
    

    document.getElementById('publickey').value=e;
    document.getElementById('Key_pub').value=n;
    document.getElementById('privateKey').value=d;
    document.getElementById('Key_pri').value=n;
}










// Helper function to check if a number is prime
function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;

    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}

// Generate a random prime number within a range
function generatePrime(min, max) {
    let num;
    do {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (!isPrime(num));
    return num;
}

// Calculate GCD using Euclidean algorithm
function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Calculate modular multiplicative inverse using extended Euclidean algorithm
function modInverse(e, phi) {
    let m0 = phi;
    let y = 0;
    let x = 1;

    if (phi === 1) return 0;

    while (e > 1) {
        const quotient = Math.floor(e / phi);
        let temp = phi;

        phi = e % phi;
        e = temp;
        temp = y;

        y = x - quotient * y;
        x = temp;
    }

    if (x < 0) x += m0;
    return x;
}

// Generate RSA key pair
function generateKeyPair(bitLength = 8) {
    const min = Math.pow(2, bitLength - 1);
    const max = Math.pow(2, bitLength) - 1;

    // Generate two distinct prime numbers
    const p = generatePrime(min, max);
    let q;
    do {
        q = generatePrime(min, max);
    } while (q === p);

    // Calculate n and phi
    const n = p * q;
    const phi = (p - 1) * (q - 1);

    // Choose public exponent e
    let e;
    do {
        e = Math.floor(Math.random() * (phi - 3)) + 3;
    } while (gcd(e, phi) !== 1);

    // Calculate private exponent d
    const d = modInverse(e, phi);

    return {
        publicKey: { e, n },
        privateKey: { d, n }
    };
}

// Encrypt a message using RSA
function encrypt(message, publicKey) {
    const { e, n } = publicKey;
    
    // Convert message to number (simple ASCII conversion)
    const m = message.split('').map(char => char.charCodeAt(0));
    
    // Encrypt each character
    return m.map(charCode => {
        return modPow(charCode, e, n);
    });
}

// Decrypt a message using RSA
function decrypt(encryptedMessage, privateKey) {
    const { d, n } = privateKey;
    
    // Decrypt each number
    const decryptedChars = encryptedMessage.map(c => {
        const charCode = modPow(c, d, n);
        return String.fromCharCode(charCode);
    });
    
    return decryptedChars.join('');
}

// Modular exponentiation for large numbers
function modPow(base, exponent, modulus) {
    if (modulus === 1) return 0;
    
    let result = 1;
    base = base % modulus;
    
    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        base = (base * base) % modulus;
        exponent = Math.floor(exponent / 2);
    }
    
    return result;
}

