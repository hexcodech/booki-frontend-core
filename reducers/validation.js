const validation = (state = [], action) => {

	switch(action.type){
		case 'ADD_VALIDATION_ERROR':
			return [
				...state,
				...action.error.errors
			];

		case 'CLEAR_VALIDATION_ERRORS':
			return [];

		default:
			return state;

	};
};

export default validation;
