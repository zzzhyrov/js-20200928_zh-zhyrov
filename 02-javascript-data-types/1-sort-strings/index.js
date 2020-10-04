/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param) {

    const arrCopy = arr.slice();
    if (param == 'asc' || param == undefined) {
        return arrCopy.sort(function(a,b) {
        return a.localeCompare(b, ['ru' , 'en-US'], ({sensitivity : 'variant'},
        {caseFirst : 'upper'}));
        });
    }

    if (param == 'desc') {
        return arrCopy.sort(function(a,b) {
        return a.localeCompare(b, ['ru', 'en-US'], ({sensitivity : 'variant'},
        {caseFirst : 'lower'}));
        }).reverse();
    }

}
