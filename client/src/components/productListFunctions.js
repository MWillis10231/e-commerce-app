export function splitProductListArray(array, itemsPerArray) {
    // first find out the array length / itemsPerArray = pages
    console.log(array.length)
    console.log(itemsPerArray)
    const pages = Math.ceil((array.length)/itemsPerArray)
    console.log(pages)
    let splitArray = []
    for (let i = 0; i < pages; i++) {
        // set the start index & end index (array.slice doesn't throw an error if end index > length of array)
        let startIndex = i * itemsPerArray;
        let endIndex = itemsPerArray + (i * itemsPerArray);
        let newArray = array.slice(startIndex, endIndex);
        splitArray.push(newArray)
    }
    return splitArray;
}
