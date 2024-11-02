/**
 * Return the valid value. If the new value is null or empty, return the existing value. Otherwise, return the new value.
 * @param {any} newValue The new value to validate.
 * @param {any} existentValue The existing value to return if the new value is invalid.
 * @returns {any} The valid value to return.
 */
function returnValidValue(newValue, existentValue) {
  // Return the existing value if the new value is null or empty
  return newValue == null || newValue === "" ? existentValue : newValue;
}

export {
	returnValidValue
};
