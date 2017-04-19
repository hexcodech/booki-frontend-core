import {combineReducers}
       from 'redux';

const newImage = (state = {}, action) => {

	switch(action.type){
		case 'CLEAR_NEW_IMAGE':
			return {};
		case 'UPDATE_NEW_IMAGE':
			return {...state, ...action.image};
		case 'POST_IMAGE':
			return {
				...state,
				isFetching: true,
				didInvalidate: false
			};
		case 'FAIL_IMAGE_POST':

			return {
				...state,
				isFetching: false,
				didInvalidate: false
			};

		default:
			return state;

	};
};

export default newImage;
