const { StringBuilder } = require("../src/app");
let expect = require("chai").expect;
let assert = require("chai").assert;


describe('String Builder', function(){


    describe("Constructor", () => {
        it("empty constrcutor should return ''",() => {
            let str = new StringBuilder();
           assert.equal(str._stringArray.length, 0);
        });
        it("field 'test' should return 'test' ",() => {
            let str = new StringBuilder("test");
            let expected = ["t","e","s","t"];
            assert.equal(str._stringArray.length, expected.length);
            assert.equal(str._stringArray[0], expected[0]);
            assert.equal(str._stringArray[3], expected[3]);
        });

        it("is not a string should return an error", () => {
            assert.throws(function(){let newStr = new StringBuilder(23232)},"Argument must be string");
            assert.throws(function(){let newStr = new StringBuilder(true)},"Argument must be string");
            assert.throws(function(){let newStr = new StringBuilder(null)},"Argument must be string");
            assert.throws(function(){let newStr = new StringBuilder(233.3)},"Argument must be string");
            assert.throws(function(){let newStr = new StringBuilder(["sdsdsd"])},"Argument must be string");
        });

        it("insert undefined should return a empty array",() => {
            let instance = new StringBuilder(undefined);
            assert.equal(instance._stringArray.length,0);
        });
    });

    describe("Append", () =>{
        it("append 'none' should return 'testnone'", () => {
            
            let newStr = new StringBuilder("test");
            newStr.append("none");
            let actual = newStr.toString();
            let expected = "testnone";
            expect(actual).to.be.equal(expected);
        });
        it("empty constructor append none should return 'none'", () => {
            
            let newStr = new StringBuilder();
            newStr.append("none");
            let actual = newStr.toString();
            let expected = "none";
            expect(actual).to.be.equal(expected);
        });
        it("is not a string", () => {
            let newStr = new StringBuilder("test");
            expect(function(){newStr.append(233)}).to.throw('Argument must be string');
        
        });
    });


    describe("Prepend", () => {
        it("add 'none' should return 'nonetest'",() =>{
            let newStr = new StringBuilder("test");
            newStr.prepend("none");
            let actual = newStr.toString();
            let expected = "nonetest";
            expect(actual).to.be.equal(expected);
        });
        it("empty constructor should return 'nonetest'",() =>{
            let newStr = new StringBuilder();
            newStr.prepend("none");
            let actual = newStr.toString();
            let expected = "none";
            expect(actual).to.be.equal(expected);
        });
        it("is not a string", () => {
            let newStr = new StringBuilder("test");
            expect(function(){newStr.prepend(233)}).to.throw('Argument must be string');
        
        });
    });

    describe("InsertAt",() => {

        it("insert 'none' should return 'tnoneest'",() => {
            let newStr = new StringBuilder("test");
            newStr.insertAt("none",1);
            let actual = newStr.toString();
            let expected = "tnoneest";
            expect(actual).to.be.equal(expected);
        });

        it("is not a string", () => {
            let newStr = new StringBuilder("test");
            expect(function(){newStr.insertAt(3333,1)}).to.throw('Argument must be string');
        
        });
    });

    describe("Remove",() => {

        it("start index -> 0, length -> 2, should return 'st'",() => {
            let newStr = new StringBuilder("test");
            newStr.remove(0,2)
            let actual = newStr.toString();
            let expected = "st";
            expect(actual).to.be.equal(expected);
        });


    });

    describe("ToString",() => {
        it("should return 'test'", () => {
            let newStr = new StringBuilder("test")

            let actual = newStr.toString();
            let expected = "test";
            expect(actual).to.equal(expected);
        });
    })
 });