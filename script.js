const resetButton = document.getElementById('reset');
function prettify(num) {
    var n = num.toString();
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
}

function checkInput(input, div, label) {
    if ((!Number.isNaN(input.value.split(' ').join(''))) && (Number(input.value.split(' ').join('')) > 0)) {
        label.innerText = ``;
        div.classList.remove('border-error');
        div.classList.add('border-focus');
    } else if (Number(input.value.split(' ').join('')) == 0) {
        div.classList.remove('border-focus');
        div.classList.add('border-error');
        label.innerText = `Can't be zero`;
    } else {
        div.classList.remove('border-focus');
        div.classList.add('border-error');
        label.innerText = `Error type`;
    }
}
function checkCustomInput(input) {
    if ((!Number.isNaN(input.value.split(' ').join(''))) && (Number(input.value.split(' ').join('')) >= 0) && (Number(input.value.split(' ').join('')) <= 1000)) {
        input.classList.remove('border-error');
        input.classList.add('border-focus');
    } else {
        input.classList.remove('border-focus');
        input.classList.add('border-error');
    }
}
function calculate(bill, number, percent, tipLabel, totalLabel) {
    if (number != undefined && bill != undefined && number > 0 && bill > 0 && percent >= 0 && percent <= 1000) {
        let textTip;
        let textTotal;
        textTotal = Math.round((Number(bill) + Number(bill) * percent / 100) / number * 100) / 100;
        textTip = Math.round(bill * percent / 100 / number * 100) / 100;
        if (Number.isNaN(textTip) || Number.isNaN(textTotal) || textTip == Infinity || textTotal == Infinity) {
            tipLabel.setAttribute('title', `$0.00`);
            tipLabel.innerText = `$0.00`;
            totalLabel.setAttribute('title', `$0.00`);
            totalLabel.innerText = `$0.00`;
        } else {
            if (prettify(textTip).length > 10) {
                tipLabel.innerText = `$${prettify(textTip)}`.slice(0, 7) + `...`;
            } else {
                tipLabel.innerText = `$${prettify(textTip)}`;

            }
            if (prettify(textTotal).length > 10) {
                totalLabel.innerText = `$${prettify(textTotal)}`.slice(0, 7) + `...`;
            } else {
                totalLabel.innerText = `$${prettify(textTotal)}`;
            }

            totalLabel.setAttribute('title', `$${prettify(textTotal)}`);
            tipLabel.setAttribute('title', `$${prettify(textTip)}`);
            resetButton.classList.add('button-focus');
        }

    } else {
        tipLabel.setAttribute('title', `$0.00`);
        tipLabel.innerText = `$0.00`;
        totalLabel.setAttribute('title', `$0.00`);
        totalLabel.innerText = `$0.00`;
    }

}


//for result
const labelTip = document.getElementById('tip');
const labelTotal = document.getElementById('total');
let percent = 0;
//check numberInput
const numberInput = document.querySelector('#number-people');
const numberDiv = document.getElementById('number-input');
const numberLabelError = document.getElementById('error-number');
//check billInput
const billInput = document.querySelector('#bill');
const billDiv = document.getElementById('bill-input');
const billLabelError = document.getElementById('error-bill');

numberInput.addEventListener('input', function () {

    checkInput(numberInput, numberDiv, numberLabelError);

    calculate(billInput.value.split(' ').join(''), numberInput.value.split(' ').join(''), percent, labelTip, labelTotal);
});

billInput.addEventListener('input', function () {
    checkInput(billInput, billDiv, billLabelError);
    calculate(billInput.value.split(' ').join(''), numberInput.value.split(' ').join(''), percent, labelTip, labelTotal);
});


//Adder eventListener on mouse
let inputNumberFocus = false;
let inputBillFocus = false;


numberInput.addEventListener('mouseenter', function () {
    if (!numberDiv.classList.contains('border-error')) {
        numberDiv.classList.add('border-focus');
    }
});

numberInput.addEventListener('mouseleave', function () {
    if (!inputNumberFocus) {
        numberDiv.classList.remove('border-focus');
    }
});

//Add eventListener on focus
numberInput.addEventListener('focus', function () {
    numberDiv.classList.add('border-focus');
    inputNumberFocus = true;
});

//add onfocus 
numberInput.addEventListener('blur', function () {
    numberDiv.classList.remove('border-focus');
    inputNumberFocus = false;
});

billInput.addEventListener('mouseenter', function () {
    if (!billDiv.classList.contains('border-error')) {
        billDiv.classList.add('border-focus');
    }
});

billInput.addEventListener('mouseleave', function () {
    if (!inputBillFocus) {
        billDiv.classList.remove('border-focus');
    }
});

//Add eventListener on focus
billInput.addEventListener('focus', function () {
    billDiv.classList.add('border-focus');
    inputBillFocus = true;
});

//add onfocus 
billInput.addEventListener('blur', function () {
    billDiv.classList.remove('border-focus');
    inputBillFocus = false;
});

//block listener of percent
const percentButton = document.getElementsByClassName('percentButton');

for (let i = 0; i < percentButton.length; i++) {
    percentButton[i].addEventListener('mouseenter', function () {
        percentButton[i].classList.add('button-active');
    });
    percentButton[i].addEventListener('mouseleave', function () {
        percentButton[i].classList.remove('button-active');
    });
}

//custom percent
const customPercent = document.getElementById('custom');

customPercent.addEventListener('input', function () {
    checkCustomInput(customPercent);

});
let customFocus = false;

customPercent.addEventListener('mouseenter', function () {
    if (!customPercent.classList.contains('border-error')) {
        customPercent.classList.add('border-focus');
    }
});

customPercent.addEventListener('mouseleave', function () {
    if (!customFocus) {
        customPercent.classList.remove('border-focus');
    }
});

//Add eventListener on focus
customPercent.addEventListener('focus', function () {
    customPercent.classList.add('border-focus');
    customFocus = true;
});

//add onfocus 
customPercent.addEventListener('blur', function () {
    customPercent.classList.remove('border-focus');
    customFocus = false;
});

//reset button
let resetFlag = false;
resetButton.addEventListener('mouseenter', function () {
    if (resetButton.classList.contains('button-focus')) {
        resetFlag = true;
        resetButton.classList.remove('button-focus');
    }
    resetButton.classList.add('button-active');
});
resetButton.addEventListener('mouseleave', function () {
    if (resetFlag) {
        resetButton.classList.add('button-focus');
        resetFlag = false;
    }
    resetButton.classList.remove('button-active');
});

resetButton.addEventListener('click', function () {
    billInput.value = '';
    numberInput.value = '';
    customPercent.value = '';
    for (let i = 0; i < percentButton.length; i++) {
        percentButton[i].classList.remove('button-focus');
    }
    resetButton.classList.remove('button-focus');
    resetFlag = false;
    labelTip.innerText = `$0.00`;
    labelTotal.innerText = `$0.00`;
    labelTip.removeAttribute('title');
    labelTotal.removeAttribute('title');
    billLabelError.innerText='';
    numberLabelError.innerText='';
    numberDiv.classList.remove('border-error');
    billDiv.classList.remove('border-error');
    customPercent.classList.remove('border-error');

});



//calculate

customPercent.addEventListener('input', function () {
    percent = Number(customPercent.value.split(' ').join(''));
    calculate(billInput.value.split(' ').join(''), numberInput.value.split(' ').join(''), percent, labelTip, labelTotal);
    for (let j = 0; j < percentButton.length; j++) {
        percentButton[j].classList.remove('button-focus');
    }

});
for (let i = 0; i < percentButton.length; i++) {
    percentButton[i].addEventListener('click', function () {
        for (let j = 0; j < percentButton.length; j++) {
            percentButton[j].classList.remove('button-focus');
        }
        percentButton[i].classList.add('button-focus');
        customPercent.value = '';
        percent = Number(percentButton[i].value.substring(0, percentButton[i].value.length - 1));
        calculate(billInput.value.split(' ').join(''), numberInput.value.split(' ').join(''), percent, labelTip, labelTotal);

    });
};











