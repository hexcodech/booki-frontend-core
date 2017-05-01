import { combineReducers } from "redux";

const people = (state = [], action) => {
	switch (action.type) {
		case "INVALIDATE_PEOPLE":
			return state.map(person => {
				return {
					...person,
					didInvalidate: true
				};
			});
		case "REQUEST_PEOPLE":
			return state.map(person => {
				return {
					...person,
					isFetching: true,
					didInvalidate: false
				};
			});
		case "FAIL_PEOPLE_REQUEST":
			return state.map(person => {
				return {
					...person,
					isFetching: false
				};
			});
		case "RECEIVE_PEOPLE":
			return action.people.map(person => {
				return {
					...person,
					lastUpdated: action.receivedAt,

					isFetching: false,
					didInvalidate: false
				};
			});
		case "INVALIDATE_PERSON":
			return [
				...state.filter(person => {
					return person.id !== action.person.id;
				}),
				{
					...action.person,
					didInvalidate: true
				}
			];

		case "REQUEST_PERSON":
		case "PUT_PERSON":
			return [
				...state.filter(person => {
					return person.id !== action.person.id;
				}),
				{
					...action.person,
					isFetching: true,
					didInvalidate: false
				}
			];

		case "DELETE_PERSON":
			return [
				...state.filter(person => {
					return person.id !== action.person.id;
				})
			];

		case "FAIL_PERSON_REQUEST":
		case "FAIL_PERSON_PUT":
			return [
				...state.filter(person => {
					return person.id !== action.person.id;
				}),
				{
					...action.person,
					isFetching: false
				}
			];

		case "FAIL_PERSON_DELETE":
			return [
				...state,
				{
					...action.person,
					isFetching: false,
					didInvalidate: false
				}
			];

		case "RECEIVE_PERSON":
			return [
				...state.filter(person => {
					return person.id !== action.person.id;
				}),
				{
					...action.person,
					isFetching: false,
					didInvalidate: false,
					lastUpdated: action.receivedAt
				}
			];

		case "DELETED_PERSON":
			return state;

		default:
			return state;
	}
};

export default people;
