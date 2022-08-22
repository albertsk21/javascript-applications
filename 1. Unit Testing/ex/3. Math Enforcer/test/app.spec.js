let {mathEnforcer} = require("../src/app");
const expect = require("chai").expect;
const assert = require("chai").assert;

describe('Math enforcer', function () {
    describe("Add Five", () => {

        it("is not a number should return undefined", () => {
          
       

            assert.equal( mathEnforcer.addFive("test"),undefined);
            assert.equal( mathEnforcer.addFive(true),undefined);
            assert.equal(mathEnforcer.addFive(null),undefined);
       
        });
        
        it("should return 10", () => {
            let actual = mathEnforcer.addFive(5);
            let expected = 10;
            expect(actual).to.be.equal(expected); 
        });
        
        it("floating number",() => {
            let actual = mathEnforcer.addFive(10.53);
            expect(actual).to.closeTo(actual,0.01);
        });


        it("negative number should return 3", () => {
            let actual = mathEnforcer.addFive(-2);
            let expected = 3;
            expect(actual).to.be.equal(expected);
        });
    });


    describe("Subtract Ten", () =>{

        it("should return undefined", () => {
            let actual = mathEnforcer.subtractTen("test");
            let expected = undefined;
            expect(actual).to.be.equal(expected);
        });

        it("floating number",() => {
            let actual = mathEnforcer.subtractTen(20.40);
            expect(actual).to.closeTo(actual,0.01);
        });

        it("should return 5", () => {
            let actual = mathEnforcer.subtractTen(15);
            let expected = 5;
            expect(actual).to.be.equal(expected); 
        });
        
        it("negative number should return -12", () => {
            let actual = mathEnforcer.subtractTen(-2);
            let expected = -12;
            expect(actual).to.be.equal(expected);
        });
    });

    describe("Sum",() => {
        it("first paramater is a string, Should return undefined", () => {
            let actual = mathEnforcer.sum("none", 3);
            let expected = undefined;
            expect(actual).to.be.equal(expected);
        });

        it("second paramater is a string, Should return undefined", () => {
            let actual = mathEnforcer.sum(3, "none");
            let expected = undefined;
            expect(actual).to.be.equal(expected);
        });
        it("all paramaters is a string, Should return undefined", () => {
            let actual = mathEnforcer.sum("none", "none");
            let expected = undefined;
            expect(actual).to.be.equal(expected);
        });


        it("should return 20", () => {
            let actual = mathEnforcer.sum(10,10);
            let expected = 20;
            expect(actual).to.be.equal(expected);
        });


        it("floating number", () => {
            let actual = mathEnforcer.sum(10.20,10.20);
            expect(actual).to.closeTo(actual,0.01);
        });


        it("negative number should return -20", () => {
            let actual = mathEnforcer.sum(-10,-10);
            let expected = -20;
            expect(actual).to.be.equal(expected);
        });
    });

 });
