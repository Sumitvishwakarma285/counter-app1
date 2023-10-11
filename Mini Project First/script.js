const inputSlider = document.querySelector("[data-lengthslider]");
const lengthDisplay =document.querySelector("[data-length]");
const PasswordDisplay =document.querySelector("[data-PasswordDisplay]");
const copyBtn =document.querySelector("[ data-copybtn]");
const copyMsg =document.querySelector("[ data-copyMassage]");
const upperCase =document.querySelector("#uppercase");
const lowerCase =document.querySelector("#lowercase");
const numbers =document.querySelector("#numbers");
const symbolCheck =document.querySelector("#symbols");
const indicator =document.querySelector("[ data-indicator]");
const generateButton =document.querySelector(".generate-button");
const allCheckbox =document.querySelectorAll("input[type=checkbox]");
const symbols ='!@#$%^&*()<>/||:;~`{}[]'

let password ="";
let passwordLength = 10;
let checkCount =0;
handleSlider();
//set strength circle color to grey

function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min =inputSlider.min;
    const max =inputSlider.max;
    inputSlider.style.baground =((passwordLength-min)*100/(max-min)) +"% 100%"
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow =`0px 0px 12px 1px ${color}`;
    //shadow
}

function getRndInteger(min,max){
 return  Math.floor(Math.random() * (max-min))+min;

}
function getRandomNumber(){
    return getRndInteger(0,9);
}
function generateLowercase(){
     return String.fromCharCode(getRndInteger(97,123));
}
function generateUppercase(){
    return String.fromCharCode(getRndInteger(65,90));
}
function generateSymbol(){
const randNum =getRndInteger(0,symbols.length);
return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper =false;
    let hasLower =false;
    let hasNum = false;
    let hasSym = false;
    if(upperCase.checked) hasUpper =true;
    if(lowerCase.checked) hasLower =true;
    if(numbers.checked) hasNum =true;
    if(symbolCheck.checked) hasSym =true;

    if(hasUpper && hasLower &&(hasNum || hasSym) && passwordLength >=8){
        setIndicator("#0f0");
    }
    else if (
        [hasLower || hasUpper] &&
        [hasNum ||hasSym] &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}
  async function copyContent() {
    try {

        await navigator.clipboard.writeText(PasswordDisplay.value);
        copyMsg.innerText ="copied";
    }
    catch (e) {
copyMsg.innerText("Failed");
    }
copyMsg.classList.add("active");

setTimeout( () => {
copyMsg.classList.remove("active");
},2000);


}
 
function shufflepassword(array){
    //fisher yastes method
    for (let i= array.length-1;i>0;i--) {
        const j =Math.floor(Math.random()*(i+1));
        const temp =array[i];
        array[i]=array[j];
        array[j] = temp;
    }
let str ="";
array.forEach((el) =>(str+=el));
return str;
}


function handleCheckBoxChange(){
checkCount = 0;
allCheckbox.forEach( (checkbox) => {
    if(checkbox.checked)
    checkCount++;
});
if (passwordLength < checkCount){
    passwordLength = checkCount;
    handleSlider();
}
}

allCheckbox.forEach((checkbox) =>  {
checkbox.addEventListener('change', handleCheckBoxChange);
})


inputSlider.addEventListener('input',(e) => {
    passwordLength =e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click' , () => {
    if(PasswordDisplay.value)
    copyContent();
})
 
generateButton.addEventListener('click',() => {
if(checkCount<=0) return;

if(passwordLength < checkCount){
    passwordLength = checkCount;
    handleSlider();
}

 password ="";


let funcArr = [];
if (upperCase.checked)
    funcArr.push(generateUppercase);

if (lowerCase.checked)
   funcArr.push(generateLowercase);

if (numbers.checked)
funcArr.push(getRandomNumber);

if (symbolCheck.checked)
funcArr.push(generateSymbol);

for (let i =0; i<funcArr.length; i++) {
    password +=funcArr[i]();
}
 for (let i=0; i<passwordLength-funcArr.length; i++){
    let randIndex =getRndInteger(0,funcArr.length);
    password +=funcArr[randIndex]();
 }

  password = shufflepassword(Array.from(password));

 PasswordDisplay.value =password;

 calcStrength();
});