import {combineReducers}
       from 'redux';

const newOfferRequest = (state = {}, action) => {

	switch(action.type){
		case 'CLEAR_NEW_OFFER_REQUEST':
			return {};
		case 'UPDATE_NEW_OFFER_REQUEST':
			return {...state, ...action.offerRequest};
		case 'POST_OFFER_REQUEST':
			return {
				...state,
				isFetching: true,
				didInvalidate: false
			};
		case 'FAIL_OFFER_REQUEST_POST':

			return {
				...state,
				isFetching: false,
				didInvalidate: false
			};

		default:
			return state;

	};
};

export default newOfferRequest;
