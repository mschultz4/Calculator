/*
global beforeEach
global inject
global expect
*/

describe("Calculator Controller", function(){
	
	beforeEach(module('app'));
	var scope;
	var vm;
	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		vm = $controller("calculator", {
			$scope: scope
		});
    }));		
	
	describe("keyPress", function(){
		
		it("should update the display to given number when display is '0'", function() {
			vm.display = '0';
			vm.keyPress(5);
			expect(vm.display).toEqual('5');
		});	
		
		it("should concatenate decimal if display is 0", function() {
			vm.display = '0';
			vm.keyPress('.');
			expect(vm.display).toEqual('0.');
		});	
		
		it("should concatenate decimal when display is any number", function() {
			vm.display = '23';
			vm.keyPress('.');
			expect(vm.display).toEqual('23.');
		});

		it("should concatenate number when last digit is decimal", function() {
			vm.display = '23';
			vm.keyPress('.');
			vm.keyPress(3);
			expect(vm.display).toEqual('23.3');
		});

		it("should not add a second decimal if one already exists", function() {
			vm.display = '23';
			vm.keyPress('.');
			vm.keyPress(3);
			vm.keyPress('.');
			expect(vm.display).toEqual('23.3');
		});			
				
	});
	
	describe("clearEntry", function(){
		
		it("clears the display", function() {
			vm.keyPress(3);
			vm.keyPress('x');
			vm.keyPress(4);
			vm.clearEntry();
			expect(vm.display).toEqual('0');
		});

		it("should use operation and value from memory to calculate result", function() {
			vm.keyPress(3);
			vm.keyPress('x');
			vm.keyPress(4);
			vm.clearEntry();
			vm.keyPress(5);
			vm.keyPress('=');
			expect(vm.display).toEqual('15');
		});

		it("uses 0 as previous value when an operation immediately follows a CE", function() {
			vm.keyPress(3);
			vm.keyPress('x');
			vm.keyPress(4);
			vm.clearEntry();
			vm.keyPress('x');
			vm.keyPress(2);
			vm.keyPress('=');
			expect(vm.display).toEqual('0');
		});

		it("should not concatenate number when pressed after CE", function() {
			vm.keyPress(3);
			vm.keyPress('x');
			vm.keyPress(4);
			vm.clearEntry();
			vm.keyPress(2);
			expect(vm.display).toEqual('2');
		});					
	});
	
		describe("allClear", function(){

		it("should not concatenate number and 0 when number selected after AC", function() {
			vm.keyPress(3);
			vm.allClear();
			vm.keyPress(4);
			expect(vm.display).toEqual('4');
		});								
	});

});
