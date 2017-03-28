const validation = (state = {}, action) => {

	switch(action.type){
		case 'ADD_VALIDATION_ERROR':
			let newState = {...state};

			action.error.errors.forEach((error) => {

				if(newState[error.field]){
					newState[error.field] = [...newState[error.field], ...error.messages];
				}else{
					newState[error.field] = error.messages;
				}

			});

			return newState;

		case 'CLEAR_VALIDATION_ERRORS':
			return {};

		default:
			return state;

	};
};

export default validation;
