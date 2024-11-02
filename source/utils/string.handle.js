/**
 * Capitalizes the first character of the input string and converts the rest to lowercase.
 * @param {string} string - The input string to capitalize.
 * @returns {string} - The capitalized string.
 */
function capitalizeString(string) {
	// Convert the input to a string, capitalize the first character, and convert the rest to lowercase
	return String(string).charAt(0).toUpperCase() + String(string).slice(1).toLocaleLowerCase();
}

/**
 * Capitalizes the first character of every word in the input string.
 * @param {string} string - The input string to capitalize.
 * @returns {string} - The capitalized string.
 */
function capitalizeAllWords(string) {
	return (
		String(string)
			.split(" ")
			// For each word in the string, capitalize the first character and convert the rest to lowercase
			.map(capitalizeString)
			// Join the capitalized words with spaces
			.join(" ")
	);
}

export {
	capitalizeString, capitalizeAllWords
};
