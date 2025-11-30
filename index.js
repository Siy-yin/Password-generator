const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

const lengthInput = document.getElementById("password-length");
const generateEl = document.getElementById("generate-el")
const pw1Box = document.getElementById("pw1");
const pw2Box = document.getElementById("pw2");

function getRandomChar() {
    return characters[Math.floor(Math.random() * characters.length)];
}

function createPassword() {
    const length = Number(lengthInput.value) || 16;

    let pass1 = "";
    let pass2 = "";

    for (let i = 0; i < length; i++) {
        pass1 += getRandomChar();
        pass2 += getRandomChar();
    }

    pw1Box.textContent = pass1;
    pw2Box.textContent = pass2;
    
    generateEl.blur();
}


document.querySelectorAll(".copy-btn").forEach(button => {
    button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-target");
        const target = document.getElementById(targetId);
        if (!target) return;

        const text = target.textContent || target.innerText;

        // Versuch moderne Clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                console.log("Password copied (Clipboard API):", text);
                // Kurzes visuelles Feedback
                button.style.transform = "scale(0.95)";
                setTimeout(() => { button.style.transform = ""; }, 150);
            }).catch(err => {
                console.warn("Clipboard API failed, fallback will be used:", err);
                fallbackCopy(text, button);
            });
        } else {
            // Wenn Clipboard API nicht unterstützt
            fallbackCopy(text, button);
        }
    });
});

// Fallback-Methode für alte Browser oder blockierte Clipboard API
function fallbackCopy(text, button) {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
        const successful = document.execCommand("copy");
        if (successful) {
            console.log("Password copied (fallback):", text);
            // Visuelles Feedback
            button.style.transform = "scale(0.95)";
            setTimeout(() => { button.style.transform = ""; }, 150);
        } else {
            console.error("Fallback copy failed");
        }
    } catch (err) {
        console.error("Fallback copy exception:", err);
    }
    document.body.removeChild(tempInput);
}