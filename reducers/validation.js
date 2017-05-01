import set from "lodash/set";

const validation = (state = {}, action) => {
	switch (action.type) {
		case "ADD_VALIDATION_ERROR":
			let newState = { ...state };

			action.error.errors.forEach(error => {
				if (newState[error.field]) {
					set(newState, error.field, [
						//error.field is a 'dotted' path
						...newState[error.field],
						...error.messages
					]);
				} else {
					set(newState, error.field, error.messages);
				}
			});

			return newState;

		case "CLEAR_VALIDATION_ERRORS":
			return set(JSON.parse(JSON.stringify(state)), action.key, {});

		default:
			return state;
	}
};

export default validation;
