import { combineReducers } from "redux";

const newPerson = (state = {}, action) => {
	switch (action.type) {
		case "CLEAR_NEW_PERSON":
			return {};
		case "UPDATE_NEW_PERSON":
			return { ...state, ...action.person };
		case "POST_PERSON":
			return {
				...state,
				isFetching: true,
				didInvalidate: false
			};
		case "FAIL_PERSON_POST":
			return {
				...state,
				isFetching: false,
				didInvalidate: false
			};

		default:
			return state;
	}
};

export default newPerson;
