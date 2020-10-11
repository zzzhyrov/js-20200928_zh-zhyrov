/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
    let newObj = {};

    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
        console.log(undefined);
    } else {
    
        Object.keys(obj).forEach(function(value) {
        let key = obj[value];
        newObj[key] = value;
        });
        return newObj;
    }
}   
