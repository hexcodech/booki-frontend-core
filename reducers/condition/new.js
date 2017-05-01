import { combineReducers } from "redux";

const newCondition = (state = {}, action) => {
	switch (action.type) {
		case "CLEAR_NEW_CONDITION":
			return {};
		case "UPDATE_NEW_CONDITION":
			return { ...state, ...action.condition };
		case "POST_CONDITION":
			return {
				...state,
				isFetching: true,
				didInvalidate: false
			};
		case "FAIL_CONDITION_POST":
			return {
				...state,
				isFetching: false,
				didInvalidate: false
			};

		default:
			return state;
	}
};

export default newCondition;
