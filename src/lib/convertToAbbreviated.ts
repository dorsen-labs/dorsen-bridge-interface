/**
* Converts a value to a string with suffix K, M, B if the value is a number.
* @param {string | number} value - The value to convert (e.g., 1000, 5000000, 3500000000 or "1000").
* @returns {string} - The string value with the appropriate suffix.
*/
export const convertToAbbreviated = (value: string | number, _toFixed = 2): string => {
    // Attempt to convert the value to a number
    const numericValue = Number(value);

    // Check if the conversion was successful

    if (numericValue >= 1_000_000_000) {
        return (numericValue / 1_000_000_000).toFixed(_toFixed).replace(/\.0$/, '') + 'B';
    } else if (numericValue >= 1_000_000) {
        return (numericValue / 1_000_000).toFixed(_toFixed).replace(/\.0$/, '') + 'M';
    } else if (numericValue >= 1_000) {
        return (numericValue / 1_000).toFixed(_toFixed).replace(/\.0$/, '') + 'K';
    } else {
        return numericValue.toFixed(_toFixed);
    }
}