import { fetchApi } from "booki-frontend-core/utilities/rest";

export const receiveAccessToken = (accessToken = "") => {
	return {
		type: "RECEIVE_ACCESS_TOKEN",
		accessToken
	};
};

//user

export const updateAuthUser = (user = {}) => {
	return {
		type: "UPDATE_AUTH_USER",
		user
	};
};

export const invalidateAuthUser = () => {
	return {
		type: "INVALIDATE_AUTH_USER"
	};
};

const requestAuthUser = (accessToken = "") => {
	return {
		type: "REQUEST_AUTH_USER",
		accessToken
	};
};

const failAuthUserRequest = (error = {}) => {
	return {
		type: "FAIL_AUTH_USER_REQUEST",
		error
	};
};

const receiveAuthUser = (user = {}, receivedAt = 0) => {
	return {
		type: "RECEIVE_AUTH_USER",
		user,
		receivedAt
	};
};

export const fetchAuthUser = (accessToken = "") => {
	return dispatch => {
		dispatch(requestAuthUser(accessToken));

		return fetchApi("user/me", "GET", {}, accessToken)
			.then(user => {
				dispatch(receiveAuthUser(user, Date.now()));

				return user;
			})
			.catch(error => {
				dispatch(failAuthUserRequest(error));
			});
	};
};
