const validation = (state = [], action) => {

	switch(action.type){
		case 'RECEIVE_VALIDATION_ERROR':
			return [
				...state,
				action.error
			];

		case 'CLEAR_VALIDATION_ERRORS':
			return [];

		default:
			return state;

	};
};

export default validation;
