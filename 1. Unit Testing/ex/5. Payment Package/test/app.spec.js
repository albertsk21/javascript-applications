const {PaymentPackage} = require("../src/app");
const expect =  require("chai").expect;
const assert = require("chai").assert;

describe('Payment package', function(){
    describe("Constructor" , () => {

        it("instance",() =>{
            let instance = new PaymentPackage("name",100);
            assert.equal(instance._name,"name",'1');
            assert.equal(instance._value,100,'3');
            assert.equal(instance.VAT,20,'4');
            assert.equal(instance._active,true,'5');
        });
        it ('Should throw error when the new Name is an array', () => {
            expect(() => new PaymentPackage(['abc'], 123)).to.throw('Name must be a non-empty string');
        });

        it ('Should throw error when the new Value is an array', () => {
            expect(() => new PaymentPackage('abc', [123])).to.throw('Value must be a non-negative number');
        });
        it ('Should return the new Name if the input is good', () => {
            expect(() => new PaymentPackage('abc', 123)).not.to.throw('Name must be a non-empty string');
        });
        it('Set value to null', () => {
            let instance = new PaymentPackage('Name', 100);
            assert.doesNotThrow(() => { instance.value = 0 })
        });
        it("first paramaeter is not a string should return an error",() => {
            expect(function(){  let newPayemnt = new PaymentPackage(1212,22)}).to.throw('Name must be a non-empty string');
        });
        it("first paramaeter is a empty string should return an error",() => {
            expect(function(){  let newPayemnt = new PaymentPackage("",22)}).to.throw('Name must be a non-empty string');
        });
        it("second paramaeter is not a number should return an error",() => {
            expect(function(){  let newPayemnt = new PaymentPackage("test","none")}).to.throw('Value must be a non-negative number');
        });
        it("second parameter is a negative number should return an error",() => {
            expect(function(){  let newPayemnt = new PaymentPackage("test",-121)}).to.throw('Value must be a non-negative number');
        });
        it("both parameters is invalid",()=>{
            expect(function(){  let newPayment = new PaymentPackage("none","none")}).to.throw('Value must be a non-negative number'); 
        });
    });
    describe("Setter Name",() =>{
        it("insert a correct parameter",() => {
            let newPeyment = new PaymentPackage("dsa",11);
            newPeyment.name = "test";
            let actual = newPeyment.name;
            expect(actual).to.be.equal("test");
        });
        it("insert a not a string",() =>{
            let newPayement  = new PaymentPackage("tester",1500);
            assert.throws(function(){newPayement.name = 2623},"Name must be a non-empty string");
            assert.throws(function(){newPayement.name = null},"Name must be a non-empty string");
            assert.throws(function(){newPayement.name = undefined},"Name must be a non-empty string");
            assert.throws(function(){newPayement.name = true},"Name must be a non-empty string");
            assert.throws(function(){newPayement.name = ["nothing else"]},"Name must be a non-empty string");
        });
    });
    describe("Setter Value",() => {
        it("insert a correct parameter",() => {
            let newPayement = new PaymentPackage("dsa",11);
            newPayement.value = 12;
            assert.equal(newPayement._value,12);
        });
        it("insert not number should return an error",() => {
            let newPayemnt = new PaymentPackage("test",1222);
            expect(function(){  newPayemnt.value = "none"}).to.throw('Value must be a non-negative number');
        });
        it("insert a negative number should return an error",() => {
            let newPayement = new PaymentPackage("test",1222);
            expect(function(){  newPayement.value = -22}).to.throw('Value must be a non-negative number');
        });

        it("insert correct parameter should return a new value",() =>{
            expect(() => new PaymentPackage('abc', 123)).not.to.throw('Value must be a non-negative number');
        })
    });
    describe("Setter VAT",() =>{
        it("insert correct parameter",() =>{
           let newPayement = new PaymentPackage("test",12212);
           newPayement.VAT = 23;
           assert.equal(newPayement._VAT, 23); 
        });
        
        it("insert correct parameter should return a new VAT",() =>{
            let newPayement = new PaymentPackage("test",12212);
            expect(() => newPayement.VAT = 24).not.to.throw('Value must be a non-negative number');
        })
        it ('Should return the new VAT if the input is good', () => {
            let newPayement = new PaymentPackage('abc', 123);
            expect(() => newPayement.VAT = 123).not.to.throw('VAT must be a non-negative number');
        });
        it("insert not a number should return an error",() =>{
            let newPayement = new PaymentPackage("test",12212);  
            assert.throws( function() {newPayement.VAT = "none"},'VAT must be a non-negative number'); 
            assert.throws( function() {newPayement.VAT = undefined},'VAT must be a non-negative number');        
            assert.throws( function() {newPayement.VAT = null},'VAT must be a non-negative number'); 
            assert.throws( function() {newPayement.VAT = [true]},'VAT must be a non-negative number');      
        });
        it("insert a negative number should return an error",()=>{
            let newPayement = new PaymentPackage("test",121);
            expect(function(){newPayement.VAT = -21}).to.throw('VAT must be a non-negative number');
        });
      
    });
    describe("Setter Active",() => {
        it("insert correct parameter", () => {
            let newPayement = new PaymentPackage("test",12212);
            newPayement.active = false;
            assert.equal(newPayement._active,false);
        });
        it("insert correct parameter should return a new active",() =>{
            let newPayement = new PaymentPackage("test",12212);
            expect(() => newPayement.active = false).not.to.throw('Value must be a non-negative number');
        })
        it("insert not a boolean should return an error",() =>{
            let newPayement = new PaymentPackage("test",12212);    
            assert.throws(function(){newPayement.active = "test active"},'Active status must be a boolean');
            assert.throws(function(){newPayement.active = 2532},'Active status must be a boolean');
            assert.throws(function(){newPayement.active = undefined},'Active status must be a boolean');
            assert.throws(function(){newPayement.active = null},'Active status must be a boolean');
            assert.throws(function(){newPayement.active = [true]},'Active status must be a boolean');
        });
    });
    describe("To String",() =>{
        it("insert correct parameters",() =>{
            let newPayement = new PaymentPackage('abc', 123);
            let output = 
                `Package: abc\n- Value (excl. VAT): 123\n- Value (VAT 20%): 147.6`
            
            expect(newPayement.toString()).to.equal(output);
        });
        it ('Should return a string as all the input is correct - 3', () => {
            let flagClass = new PaymentPackage('abc', 123);
            flagClass.active = false;
            let output = [
                `Package: abc (inactive)\n- Value (excl. VAT): 123\n- Value (VAT 20%): 147.6`
            ]
            expect(flagClass.toString()).to.equal(output.join('\n'));
        });
    });
    describe("Getter name",() => {
        it("correct output", () => {
            let newPayment = new PaymentPackage("HR Services",1500);
            let  actual = newPayment.name;
            let expected = newPayment._name;
            expect(actual).to.be.equal(expected);
        })
    });
    describe("Getter value",() =>{
        it("correct output",() =>{
            let newPayment = new PaymentPackage("HR Services",1500);
            let  actual = newPayment.value;
            let expected = newPayment._value;
            expect(actual).to.be.equal(expected); 
        });
    });
    describe("Getter VAT",() =>{
        it("correct output",() =>{
            let newPayment = new PaymentPackage("HR Services",1500);
            newPayment.VAT = 10;
            let  actual = newPayment.VAT;
            let expected = newPayment._VAT;
            expect(actual).to.be.equal(expected); 
        });
    })
 });