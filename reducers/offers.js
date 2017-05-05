import { combineReducers } from "redux";

const offers = (state = [], action) => {
	switch (action.type) {
		case "INVALIDATE_OFFERS":
			return state.map(offer => {
				return {
					...offer,
					didInvalidate: true
				};
			});
		case "REQUEST_OFFERS":
			return state.map(offer => {
				return {
					...offer,
					isFetching: true,
					didInvalidate: false
				};
			});
		case "FAIL_OFFERS_REQUEST":
			return state.map(offer => {
				return {
					...offer,
					isFetching: false
				};
			});
		case "RECEIVE_OFFERS":
			return action.offers.map(offer => {
				return {
					...offer,
					lastUpdated: action.receivedAt,

					isFetching: false,
					didInvalidate: false
				};
			});
		case "INVALIDATE_OFFER":
			return [
				...state.filter(offer => {
					return offer.id !== action.offer.id;
				}),
				{
					...action.offer,
					didInvalidate: true
				}
			];

		case "REQUEST_OFFER":
		case "UPDATE_OFFER":
		case "PUT_OFFER":
			return [
				...state.filter(offer => {
					return offer.id !== action.offer.id;
				}),
				{
					...action.offer,
					isFetching: true,
					didInvalidate: false
				}
			];

		case "DELETE_OFFER":
			return [
				...state.filter(offer => {
					return offer.id !== action.offer.id;
				})
			];

		case "FAIL_OFFER_REQUEST":
		case "FAIL_OFFER_PUT":
			return [
				...state.filter(offer => {
					return offer.id !== action.offer.id;
				}),
				{
					...action.offer,
					isFetching: false
				}
			];

		case "FAIL_OFFER_DELETE":
			return [
				...state,
				{
					...action.offer,
					isFetching: false,
					didInvalidate: false
				}
			];

		case "RECEIVE_OFFER":
			return [
				...state.filter(offer => {
					return offer.id !== action.offer.id;
				}),
				{
					...action.offer,
					isFetching: false,
					didInvalidate: false,
					lastUpdated: action.receivedAt
				}
			];

		case "DELETED_OFFER":
			return state;

		default:
			return state;
	}
};

export default offers;
