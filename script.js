const display = document.getElementById('display');
let isDegreeMode = false;
let isInverseMode = false;

function calculate(input) {
    if (input === 'log') {
        display.value += 'log(';
    } else if (input === 'ln') {
        display.value += 'ln(';
    } else {
        display.value += input;
    }
}



function deleteinput() {
    display.value = "";
}

function deleteChar() {
    display.value = display.value.slice(0, -1);
}

function output() {
    try {
        let expression = display.value
    .replace(/sin\(/g, 'Math.sin(')
    .replace(/cos\(/g, 'Math.cos(')
    .replace(/tan\(/g, 'Math.tan(')
    .replace(/asin\(/g, 'Math.asin(')
    .replace(/acos\(/g, 'Math.acos(')
    .replace(/atan\(/g, 'Math.atan(')
    .replace(/√\(/g, 'Math.sqrt(')
    .replace(/\^/g, '**')
    .replace(/(\d+)!/g, 'factorial($1)')
    .replace(/π/g, 'Math.PI')
    .replace(/e/g, 'Math.E')
    .replace(/log/g, 'Math.log10')
    .replace(/ln/g, 'Math.log');


    if (isDegreeMode) {
             expression = expression.replace(/Math\.sin\(([^)]+)\)/g, (match, p1) => `Math.sin((${p1}) * (Math.PI / 180))`)
                                           .replace(/Math\.cos\(([^)]+)\)/g, (match, p1) => `Math.cos((${p1}) * (Math.PI / 180))`)
                                           .replace(/Math\.tan\(([^)]+)\)/g, (match, p1) => `Math.tan((${p1}) * (Math.PI / 180))`)
                                           .replace(/Math\.asin\(([^)]+)\)/g, (match, p1) => `(Math.asin(${p1}) * (180 / Math.PI))`)
                                           .replace(/Math\.acos\(([^)]+)\)/g, (match, p1) => `(Math.acos(${p1}) * (180 / Math.PI))`)
                                           .replace(/Math\.atan\(([^)]+)\)/g, (match, p1) => `(Math.atan(${p1}) * (180 / Math.PI))`);
    }
    console.log('Expression before evaluation:', expression);

    let result = eval(expression);
        
        // Check if result is Infinity or -Infinity
    if (result === Infinity) {
        display.value = 'Infinity';
    } else if (result === -Infinity) {
        display.value = '-Infinity';
    } else {
        display.value = result;
    }
    console.log('Expression before evaluation:', expression);
    } 
    catch (error) {
        console.error('Error occurred during evaluation:', error);
        display.value = 'Error';
    }
}

function radianmode() {
    isDegreeMode = false;
    document.getElementById('rad').style.color = 'orange';
    document.getElementById('deg').style.color = 'white';
}

function degreemode() {
    isDegreeMode = true;
    document.getElementById('deg').style.color = 'orange';
    document.getElementById('rad').style.color = 'white';
}

function inversemode() {
    isInverseMode = !isInverseMode;
    document.getElementById('inv').style.color = isInverseMode ? 'orange' : 'white';
    updateTrigButtons();
}

// // Custom inverse trigonometric functions
// function asin(value) {
//     return (180 / Math.PI) * Math.asin(value);
// }

// function acos(value) {
//     return (180 / Math.PI) * Math.acos(value);
// }

// function atan(value) {
//     return (180 / Math.PI) * Math.atan(value);
// }

function calculateTrigFunction(input) {
    if (isInverseMode) {
        if (input === 'sin') {
            display.value += 'asin(';
        } else if (input === 'cos') {
            display.value += 'acos(';
        } else if (input === 'tan') {
            display.value += 'atan(';
        }
    } else {
        if (input === '√') {
            display.value += 'Math.sqrt(';
        } else {
            display.value += input + '(';
        }
    }
}



function calculateFactorial() {
    display.value += '!';
}

function factorial(number) {
    if (number < 0) return NaN;
    if (number === 0 || number === 1) return 1;
    let result = 1;
    for (let i = 2; i <= number; i++) {
        result *= i;
    }
    return result;
}

function updateTrigButtons() {
    const sinButton = document.getElementById('sinButton');
    const cosButton = document.getElementById('cosButton');
    const tanButton = document.getElementById('tanButton');
    if (isInverseMode) {
        console.log(isInverseMode)
        sinButton.textContent = 'sin⁻¹';
        cosButton.textContent = 'cos⁻¹';
        tanButton.textContent = 'tan⁻¹';
        sinButton.setAttribute('onclick', "calculateTrigFunction('sin')");
        cosButton.setAttribute('onclick', "calculateTrigFunction('cos')");
        tanButton.setAttribute('onclick', "calculateTrigFunction('tan')");
    } else {
        sinButton.textContent = 'sin';
        cosButton.textContent = 'cos';
        tanButton.textContent = 'tan';
        sinButton.setAttribute('onclick', "calculateTrigFunction('sin')");
        cosButton.setAttribute('onclick', "calculateTrigFunction('cos')");
        tanButton.setAttribute('onclick', "calculateTrigFunction('tan')");
    }
}
