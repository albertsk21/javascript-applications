const {isOddOrEven} = require("../src/app");
const expect = require("chai").expect;




describe('Even or odd', () => {
    it("if is not a string return undefined", () => {
        let actual = isOddOrEven(100);
        let expected = undefined;
        expect(actual).to.be.equal(expected);
    });


    it("should return even", () =>{
        const actual = isOddOrEven("test");
        const expected = "even"
        expect(actual).to.be.equal(expected);
    });

    it("should return odd", () =>{
        const actual = isOddOrEven("tests");
        const expected = "odd";
        expect(actual).to.be.equal(expected);
    });
 });

