export const isValidationError = (error) => {
  return (error.status == 400 && error.statusText == 'Bad Request');
};

export const addValidationError = (error) => {
	return {
		type: 'RECEIVE_VALIDATION_ERROR',
		error
	};
}

export const clearValidationErrors = () => {
	return {
		type: 'CLEAR_VALIDATION_ERRORS'
	};
}
