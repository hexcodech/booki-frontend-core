const validation = (state = [], action) => {

	switch(action.type){
		case 'RECEIVE_VALIDATION_ERROR':
			return [
				...state,
				...action.error.errors
			];

		case 'ADD_VALIDATION_ERRORS':
			return [];

		default:
			return state;

	};
};

export default validation;
