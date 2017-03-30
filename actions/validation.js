export const isValidationError = (error) => {
  return (error.status == 400 && error.statusText == 'Bad Request');
};

export const addValidationError = (error) => {
	return {
		type: 'ADD_VALIDATION_ERROR',
		error
	};
}

export const clearValidationErrors = (key) => {
	return {
		type: 'CLEAR_VALIDATION_ERRORS',
    key
	};
}
