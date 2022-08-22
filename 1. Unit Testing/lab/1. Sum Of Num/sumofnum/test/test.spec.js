
const {sum}  = require("../src/app");
const expect = require('chai').expect;

describe('Sum of numbers', () => {
    it('should retrun 15', () =>{
        let currenResult = sum([1,2,3,4,5]);
        expect(currenResult).to.be.equal(15)
    });
    it('should return NaN', () =>{
        let currentResult = sum("abc");
        expect(currentResult).to.be.NaN;
    });


    it('test array of strings returns number',() =>{


        let currentResult = sum(["1","2"]);

        expect(currentResult).to.be.equal(3);

    });
  });