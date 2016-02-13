/*
global angular
*/

angular
	.module('app', [])
	.controller('calculator', [calculator]);

function calculator(){
    var vm = this;
    
    vm.display ='0';
    vm.keyPress = keyPress;
    vm.allClear = allClear;
    vm.clearEntry = clearEntry;
	vm.percent = percent;
    
    vm.memory = {
		key: null,
		value: 0, 
		operation: null
	};
	
  	vm.operations = {
  		'+': add,
  		'-': subtract,
  		'x': multiply,
  		'/': divide,
  		'%': percent,
  		'=': equals
  	};
    
    function keyPress(key){

  		var operation = vm.operations[key];
  		var previousOperation = vm.memory.operation;
  		
  		if(typeof key === 'number'){
			  if(typeof vm.memory.key === 'number' || vm.memory.key === '.'){
				vm.display = vm.display += key;
			  } else{
				vm.display = key.toString();
			  }
  		} else if(key === '.'){
			vm.display = vm.display.indexOf('.') === -1 ? vm.display += key : vm.display;
		} else if(operation && !previousOperation){
  		    vm.memory.value = parseFloat(vm.display);
  		    vm.memory.operation = operation;
  		} else if(operation && previousOperation){
    			vm.memory.value = previousOperation(vm.memory.value, parseFloat(vm.display));
    			vm.display = vm.memory.value.toString();
    			vm.memory.operation = operation;
  		} 
		vm.memory.key = key;
    }
    
    function allClear(){
        vm.display = '0';
        vm.memory.value = 0;
        vm.memory.operation = null;
		vm.memory.key = null;
    }
    
    function clearEntry(){
      vm.display = '0';
	  vm.memory.key = null;
    }
  
    function multiply(val1, val2){
        return val1 * val2;
    }
    
    function add(val1, val2){
        return val1 + val2;
    }
    
    function subtract(val1, val2){
        return val1 - val2;
    }
    
    function divide(val1, val2){
        return val1 / val2;
    }
    
    function percent(){
      vm.display =  (parseFloat(vm.display) * 0.01).toString();
    }
    
    function equals(val1, val2){
      return val2;
    }
}