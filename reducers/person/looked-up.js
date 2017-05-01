import { combineReducers } from "redux";

const lookedUpPeople = (state = [], action) => {
	switch (action.type) {
		case "LOOKUP_PEOPLE":
			return [];

		case "FAIL_PEOPLE_LOOKUP":
			return [];

		case "LOOKED_UP_PEOPLE":
			return action.people;

		default:
			return state;
	}
};

export default lookedUpPeople;
