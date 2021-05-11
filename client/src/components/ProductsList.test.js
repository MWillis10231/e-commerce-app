import { splitProductListArray } from './productListFunctions'

// setup test variables
const testArray = ["ronald", "fred", "george", "ginny", "percy", "charlie", "bill"]
const dividedArray = splitProductListArray(testArray, 3);

test('Split array function correctly returns object with arrays', () => {
    expect(typeof dividedArray).toBe("object");
})

test('Split array function correctly returns three arrays', () => {
    expect(Array.isArray(dividedArray[0])).toBe(true);
    expect(Array.isArray(dividedArray[1])).toBe(true);
    expect(Array.isArray(dividedArray[2])).toBe(true);
})

test('Split array function correctly returns three arrays with lengths 3, 3 & 1', () => {
    expect(dividedArray[0].length).toBe(3);
    expect(dividedArray[1].length).toBe(3);
    expect(dividedArray[2].length).toBe(1);
})
