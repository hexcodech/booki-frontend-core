import {combineReducers}
       from 'redux';

const user = (state =
{
	name: {
		display: '',
		first : '',
		last : ''
	},
	email : '',
	profilePictureUrl : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=512',

	lastUpdated: 0,

	isFetching: false,
	didInvalidate: false

}, action) => {

	switch(action.type){
		case 'UPDATE_AUTH_USER':
			return action.user;
		case 'INVALIDATE_AUTH_USER':
			return {
				...state,
				didInvalidate: true
			};
		case 'REQUEST_AUTH_USER':
			return {
				...state,
				isFetching: true,
				didInvalidate: false
			};
		case 'FAIL_AUTH_USER_REQUEST':

			console.log(action.error);

			return {
				...state,
				isFetching: false
			};
		case 'RECEIVE_AUTH_USER':
			return {
				...state,
				...action.user,

				lastUpdated: action.receivedAt,

				isFetching: false,
				didInvalidate: false
			};
		case 'RECEIVE_USER':
			if(state.id === action.user.id){
				return {
					...state,
					...action.user,

					lastUpdated: action.receivedAt,

					isFetching: false,
					didInvalidate: false
				};
			}else{
				return state;
			}
		default:
			return state;

	};
};

const accessToken = (state = {
	token: '',
	clientId: '',
	userId: '',
	expires: ''
}, action) => {

	switch(action.type){
		case 'RECEIVE_ACCESS_TOKEN':
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
