const values = {
    numbers: '0123456789',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    symbols: '`~!@#$%^&*()-_=+[]{}\\|;:\'",./<>?'
}

const form = document.querySelector('#form');

const slider = document.querySelector('#slider');
const sliderValue = document.querySelector('#slider-value');

const copyBtn = document.querySelector('#copy-icon');

// Set the initial value for the slider
sliderValue.value = slider.value;

// Update slider value each time the slider handle is dragged
slider.addEventListener('input', () => {
    sliderValue.value = slider.value;
});

form.addEventListener('submit', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);

function generatePassword(e) {
    e.preventDefault();
    
    const string = generateString();

    if (string.length > 0) {
        const pswLength = form.slider.value;
        
        let psw = '';
        for (let i = 0; i < pswLength; i++) {
            const min = 0;
            const max = string.length - 1;
            const random = Math.floor(Math.random() * (max - min) + min);
            // This verification avoids two characters in a row
            string.charAt(random) === psw.charAt(psw.length - 1) ? i-- : psw += string.charAt(random);
        }
    
        form.password.value = psw;
    } else {
        form.password.placeholder = 'select at least one type';
    }

}

function generateString() {
    const optionArray = [form.numbers, form.symbols, form.lowercase, form.uppercase];

    let string = '';

    optionArray.forEach(option => {
        if (option.checked) {
            const optionId = option.id;
            string += values[optionId];
        }
    });

    return string;
}

// This function copies the generated password to clipboard
function copyToClipboard() {
    if (form.password.value.length >= 4) {
        const pswCopied = form.password.value;
        navigator.clipboard.writeText(pswCopied);

        changeIcon();
        showTooltip();
    }
}


function showTooltip() {
    const tooltip = document.querySelector('#tooltip');
    tooltip.classList.add('tooltip-active');

    setTimeout(function() {
        tooltip.classList.remove('tooltip-active');
    }, 3000);
}

// Change the icon from copy to check
function changeIcon() {
    copyBtn.firstElementChild.classList.remove('bi-clipboard');
    copyBtn.firstElementChild.classList.add('bi-check-lg');

    setTimeout(function() {
        copyBtn.firstElementChild.classList.remove('bi-check-lg');
        copyBtn.firstElementChild.classList.add('bi-clipboard');
    }, 3000);
}