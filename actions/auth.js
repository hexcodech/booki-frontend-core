import {fetchApi} from 'booki-frontend-core/utilities/rest.js';

export const receiveAccessToken = (accessToken) => {
	return {
		type: 'RECEIVE_ACCESS_TOKEN',
		accessToken
	};
}

//user

const updateAuthUser = (user, accessToken) => {
	return {
		type: 'UPDATE_AUTH_USER',
		user,
		accessToken
	};
}

export const invalidateAuthUser = () => {
	return {
		type: 'INVALIDATE_AUTH_USER'
	};
}

const requestAuthUser = (accessToken) => {
	return {
		type: 'REQUEST_AUTH_USER',
		accessToken
	};
}

const failAuthUserRequest = (error) => {
	return {
		type: 'FAIL_AUTH_USER_REQUEST',
		error
	}
}

const receiveAuthUser = (user, receivedAt) => {
	return {
		type: 'RECEIVE_AUTH_USER',
		user,
		receivedAt
	};
}

export const fetchAuthUser = (accessToken) => {
	return (dispatch) => {

		dispatch(
			requestAuthUser(accessToken)
		);

		return fetchApi('user/me', 'GET', {}, accessToken)
		.then((user) => {

			dispatch(
				receiveAuthUser(user, Date.now())
			);

		}).catch((error) => {

			dispatch(
				failAuthUserRequest(error)
			);
			
		});
	};
}
