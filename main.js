const disabledButtons = document.querySelector(".navbar-calculator");
const display = document.querySelector(".display");
const buttonsNumbers = document.querySelectorAll("[id*=tecla]")
const operationNumbers = document.querySelectorAll("[id*=operador]")

 

disabledButtons.firstElementChild.disabled = true;
disabledButtons.lastElementChild.disabled = true;
disabledButtons.children[1].disabled = true;

let newNumber = true;
let operation;
let numberBack;
let numberCurrent
operationPending = () => operation != undefined;


// Calculos

const calculate = () => {
    if(operationPending()){
        numberCurrent = parseFloat(display.textContent); 
       newNumber = true;
        if(operation === '+'){
            result = numberBack + numberCurrent;
            updateNumbers(result);
            ArmarzenarValor(result, numberCurrent, numberBack);
        } else if(operation === '-'){
             result = numberBack - numberCurrent;
            updateNumbers(result);
            ArmarzenarValor(result, numberCurrent, numberBack);
        } else if(operation === 'X'){
             result = numberBack * numberCurrent;
            updateNumbers(result);
            ArmarzenarValor(result, numberCurrent, numberBack);
        } else if(operation === '÷'){
             result = numberBack / numberCurrent;
            updateNumbers(result);
            ArmarzenarValor(result, numberCurrent, numberBack);
        }
    }
}

// Aparecer os numeros na tela

const updateNumbers = (text) => {
    if(newNumber){
        display.textContent = text;
        newNumber = false;
    }else{
    display.textContent += text;
    }
}

const insertNumber = (event) => updateNumbers(event.target.textContent);
buttonsNumbers.forEach (Number => 
    Number.addEventListener('click',insertNumber)
    );



const selectOperation = (event) => {
    if(!newNumber){
        newNumber = true;
        operation = event.target.textContent;
        numberBack = parseFloat(display.textContent);  
    }
}

operationNumbers.forEach (operation=> 
   operation.addEventListener('click',selectOperation)
    );


const triggerEqual = () => {
    calculate();
    operador = undefined;
}
 document.getElementById('igual').addEventListener('click', triggerEqual)


//Limpeza tela

const clearDisplay = () => {
    display.textContent = ''; 
}

 document.getElementById('clearDisplay').addEventListener('click', clearDisplay)

const clearCalculation = () => {
    clearDisplay();
    navbar.textContent = ''
    operador = undefined;
    numberBack = undefined;
    newNumber = true;
}

 document.getElementById('clearCalculation').addEventListener('click', clearCalculation);

const DeleteLastNumber = () =>{
    display.textContent = display.textContent.slice(0, -1);
}

 document.getElementById('backspace').addEventListener('click', DeleteLastNumber)

const ReverseSignal = () => {
    newNumber = true;
    updateNumbers(display.textContent * -1);
}

document.getElementById('operadorReverseSignal').addEventListener('click', ReverseSignal);

// Botão '.'

const existDecimal = () => display.textContent.indexOf('.') !== -1;
const existValor = () => display.textContent.length > 0;

const transformDecimal = () => {
    if(!existDecimal()){
        newNumber = false;
        if(existValor()){
            updateNumbers(".")
        }
    } if(!existValor()) {
        updateNumbers('0.')
    }
    
}

document.getElementById('operadorDecimal').addEventListener('click', transformDecimal);


// Ações teclado

const mapKeyboard = {
    '0' : 'tecla0',
    '1' : 'tecla1',
    '2' : 'tecla2',
    '3' : 'tecla3',
    '4' : 'tecla4',
    '5' : 'tecla5',
    '6' : 'tecla6',
    '7' : 'tecla7',
    '8' : 'tecla8',
    '9' : 'tecla9',
    '-' : 'operador-',
    '+' : 'operador+',
    '/' : 'operadorDivision',
    '%' : 'tecla%',
    '*' : 'operadorX',
    'X' : 'operadorX',
    '.' : 'operadorDecimal',
    'C' : 'clearDisplay',
    'Escape' : 'clearCalculation',
    'Enter' : 'igual',
    '=' : 'igual',
    'Backspace' : 'backspace'
}

const chartKeyboard = (event) =>{
    const tecla = event.key;

    const keyAllowed = () => Object.keys(mapKeyboard).indexOf(tecla) !== -1;
    if(keyAllowed()) document.getElementById(mapKeyboard[tecla]).click();
}

document.addEventListener('keydown', chartKeyboard);


// Operações avançadas

const porcentagem = () => {
    newNumber = true;
    numberCurrent = parseFloat(display.textContent);
    let porcent = numberCurrent / 100;
    numberCurrent = porcent * numberBack;
    if (operation === '+'){
    result = parseFloat(numberBack + numberCurrent)
    display.textContent = numberCurrent
    } else if (operation === '-'){
    result = parseFloat(numberBack - numberCurrent)
    display.textContent = numberCurrent
    } else if (operation === 'X'){
    result = parseFloat(numberBack * numberCurrent)
    display.textContent = numberCurrent
    } else if (operation === '÷' ){
    result = parseFloat(numberBack / numberCurrent)
    display.textContent = numberCurrent
    }   
}

document.getElementById('tecla%').addEventListener('click', porcentagem);

let ONaoQuadrado = false;

const XaoQuadrado = () => {
    newNumber = true;
    ONaoQuadrado = true;
    numberCurrent = parseFloat(display.textContent);
    result = numberCurrent * numberCurrent;
    updateNumbers(result);
    ArmarzenarValor(result, numberCurrent, numberBack);
}

document.getElementById('operadorXaoQuadrado').addEventListener('click', XaoQuadrado);

let ONraizQuadrada = false;

const raizQuadradaX = () => {
    newNumber = true;
    ONraizQuadrada = true;
    numberCurrent = parseFloat(display.textContent);
    result = Math.sqrt(numberCurrent);;
    updateNumbers(result);
    ArmarzenarValor(result, numberCurrent, numberBack);

}

document.getElementById('operadorRaizX').addEventListener('click', raizQuadradaX);

let ONporcento = false;

porcento = () =>{
    newNumber = true;
    ONporcento = true;
    numberCurrent = parseFloat(display.textContent);
    result = 1 / numberCurrent;
    updateNumbers(result);
    ArmarzenarValor(result, numberCurrent, numberBack);

}

document.getElementById('operador1/x').addEventListener('click', porcento);


// Historico

var resultado = []
var anterior = []
var atual = []
let cont = 999;
let newHistory = true;

const ArmarzenarValor = (result, numberCurrent, numberBack) =>{
    for(i = 0; i < cont; i++){
        resultado[i] = result;
        anterior[i] = numberBack;
        atual[i] = numberCurrent;
        cont--;
        historico(result, numberBack, numberCurrent,cont);
        return; 
    }
}

const navbar = document.getElementById('history-content')
let ativar = false;


const Ativarhistorico = () => {
        ativar = true;
        if(ativar === true){
         navbar.classList.toggle('active')
         ativar = false;    
        }
}

const historico = (result, numberBack, numberCurrent,cont) => {

    if(numberBack !== undefined && cont !== '0'){
        if(ONaoQuadrado === true){
            navbar.innerHTML += numberBack + '²' + ' = ' + result;
        } else if(ONraizQuadrada === true){
            navbar.innerHTML +=  '√' + numberCurrent + ' = ' + result;
        } else if(ONporcento === true){
            navbar.innerHTML +=  '1/(' + numberCurrent +')'+ ' = ' + result;
        } else {
        navbar.innerHTML += numberBack + ' ' + operation + ' ' + numberCurrent + ' = ' + '' + result + '<br>'
        }
    } else{
        newHistory = false;
        navbar.textContent = '';
    }

    if(ativar ===true){
    Ativarhistorico();
    }
}

document.getElementById('btn-history').addEventListener('click', Ativarhistorico )
