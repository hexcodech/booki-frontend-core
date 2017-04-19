import {combineReducers}
       from 'redux';

const newOffer = (state = {}, action) => {

	switch(action.type){
		case 'CLEAR_NEW_OFFER':
			return {};
		case 'UPDATE_NEW_OFFER':
			return {...state, ...action.offer};
		case 'POST_OFFER':
			return {
				...state,
				isFetching: true,
				didInvalidate: false
			};
		case 'FAIL_OFFER_POST':

			return {
				...state,
				isFetching: false,
				didInvalidate: false
			};

		default:
			return state;

	};
};

export default newOffer;
