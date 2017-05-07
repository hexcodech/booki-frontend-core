import { combineReducers } from "redux";

const users = (state = [], action) => {
	switch (action.type) {
		case "INVALIDATE_USERS":
			return state.map(user => {
				return {
					...user,
					didInvalidate: true
				};
			});
		case "REQUEST_USERS":
			return state.map(user => {
				return {
					...user,
					isFetching: true,
					didInvalidate: false
				};
			});
		case "FAIL_USERS_REQUEST":
			return state.map(user => {
				return {
					...user,
					isFetching: false
				};
			});
		case "RECEIVE_USERS":
			return action.users.map(user => {
				return {
					...user,
					lastUpdated: action.receivedAt,

					isFetching: false,
					didInvalidate: false
				};
			});
		case "INVALIDATE_USER":
			return [
				...state.filter(user => {
					return user.id != action.user.id;
				}),
				{
					...action.user,
					didInvalidate: true
				}
			];

		case "REQUEST_USER":
		case "UPDATE_USER":
		case "PUT_USER":
			return [
				...state.filter(user => {
					return user.id != action.user.id;
				}),
				{
					...action.user,
					isFetching: true,
					didInvalidate: false
				}
			];

		case "DELETE_USER":
			return [
				...state.filter(user => {
					return user.id != action.user.id;
				})
			];

		case "FAIL_USER_REQUEST":
		case "FAIL_USER_PUT":
			return [
				...state.filter(user => {
					return user.id != action.user.id;
				}),
				{
					...action.user,
					isFetching: false
				}
			];

		case "FAIL_USER_DELETE":
			return [
				...state,
				{
					...action.user,
					isFetching: false,
					didInvalidate: false
				}
			];

		case "RECEIVE_USER":
			return [
				...state.filter(user => {
					return user.id != action.user.id;
				}),
				{
					...action.user,
					isFetching: false,
					didInvalidate: false,
					lastUpdated: action.receivedAt
				}
			];

		case "DELETED_USER":
			return state;

		default:
			return state;
	}
};

export default users;
