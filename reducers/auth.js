import { combineReducers } from "redux";

const defaultAuthUserState = {
	nameDisplay: "",
	nameFirst: "",
	nameLast: "",
	email: "",
	thumbnails: [],

	lastUpdated: 0,
	isFetching: false,
	didInvalidate: false
};

const user = (state = defaultAuthUserState, action) => {
	switch (action.type) {
		case "LOGOUT_USER":
			return Object.assign({}, defaultAuthUserState);
		case "UPDATE_AUTH_USER":
			return {
				...state,
				...action.user
			};
		case "INVALIDATE_AUTH_USER":
			return {
				...state,
				didInvalidate: true
			};
		case "REQUEST_AUTH_USER":
			return {
				...state,
				isFetching: true,
				didInvalidate: false
			};
		case "FAIL_AUTH_USER_REQUEST":
			console.log(action.error);

			return {
				...state,
				isFetching: false
			};
		case "RECEIVE_AUTH_USER":
			return {
				...state,
				...action.user,

				lastUpdated: action.receivedAt,

				isFetching: false,
				didInvalidate: false
			};
		case "RECEIVE_USER":
			if (state.id == action.user.id) {
				return {
					...state,
					...action.user,

					lastUpdated: action.receivedAt,

					isFetching: false,
					didInvalidate: false
				};
			} else {
				return state;
			}
		default:
			return state;
	}
};

const defaultAccessTokenState = {
	token: "",
	clientId: "",
	userId: "",
	expires: ""
};

const accessToken = (state = defaultAccessTokenState, action) => {
	switch (action.type) {
		case "LOGOUT_USER":
			return Object.assign({}, defaultAccessTokenState);
		case "RECEIVE_ACCESS_TOKEN":
			return {
				...state,
				...action.accessToken
			};
		default:
			return state;
	}
};

export default combineReducers({
	user,
	accessToken
});
