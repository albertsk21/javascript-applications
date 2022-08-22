const {lookupChar} = require("../src/app");
const expect = require("chai").expect;

describe('Char lookup', () => {
    it("first paramater is not a string return undefined", () => {
        let actual = lookupChar(22332,1);
        expect(actual).to.be.undefined;
    });
    it("second paramater is not a number return undefined", () => {
        let actual = lookupChar("dsdsd","sdsds");
        expect(actual).to.be.undefined;
    });
    
    it("both paramaters is invalid should undefined", () => {
        let actual = lookupChar(232312,"sdsds");
        expect(actual).to.be.undefined;
    });

    it("index is equal with the length should return 'Incorrect index' ", () => {
        let actual = lookupChar("test",4);
        let expected = 'Incorrect index';
        expect(actual).to.be.equal(expected);
    });
    it("index is higher than at the length should return 'Incorrect index' ", () => {
        let actual = lookupChar("test",5);
        let expected = 'Incorrect index';
        expect(actual).to.be.equal(expected);
    });

    it("should return s", () => {
        let actual = lookupChar("test", 2);
        let expected = "s";
        expect(actual).to.be.equal(expected);
    });

    it("negative index should return incorrect index", () => {
        let actual = lookupChar("test", -1);
        let expected = 'Incorrect index';
        expect(actual).to.be.equal(expected);
    });

    it('should Incorrect index undefined with second parameter as a floating point number',
    function () {
        let actual = lookupChar('Peter', 3.12); 
        let expected = 'Incorrect index';
        expect(actual).to.be.undefined;
    });
  });