//Polyfill for Call

const person1 = {
    "name":"Person Name",
    "address":"Person Address",
    "phoneNumber":"+91-0089765623"
}

function printOnDocument(textData, large)
{
    const board = document.getElementsByClassName('main-box')[0];
    let line = document.createElement('p');
    if(large)
    {
        line = document.createElement('h3');
    }
    line.textContent = textData;
    board.appendChild(line);
}

function printDetails(arg1, arg2){
    printOnDocument("DETAILS:-");
    printOnDocument(`${this.name}-${this.address}-${this.phoneNumber}`);
    printOnDocument(`${arg1}-${arg2}`);
}

printOnDocument("****** Polyfill of call ******",true);
printDetails.call(person1, "Argument1","Argument2");
Function.prototype.polyfillCall = function (context, ...args){
    const callerFn = this;
    context['__fn'] = callerFn;
    context['__fn'](...args);
    delete context['__fn'];
}

printDetails.polyfillCall(person1, "Argument1","Argument2");

printOnDocument("****** Polyfill of Apply ******",true);
printDetails.apply(person1, ["Arg 1", "Arg 2"]);

Function.prototype.polyfillApply = function (context, args){
    const callerFn = this;
    context['__fn'] = callerFn;
    context['__fn'](...args);
    delete context['__fn'];
}
printDetails.polyfillApply(person1, ["Arg 1", "Arg 2"]);


printOnDocument("****** Polyfill of bind ******", true);
const bindedPrintDetails = printDetails.bind(person1,"arg1");
bindedPrintDetails("arg2");

Function.prototype.polyfillBind = function(context,...args){
    const callerFn = this;
    context['__fn'] = callerFn;
    return function(...args2){
        context['__fn'](...args,...args2);
        delete context['__fn'];
    }
}

const myBindedPrintDetails = printDetails.polyfillBind(person1,"arg1");
myBindedPrintDetails("arg2");