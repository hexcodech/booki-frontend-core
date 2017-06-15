import { combineReducers } from "redux";

const latestOffers = (state = [], action) => {
	switch (action.type) {
		case "INVALIDATE_LATEST_OFFERS":
			return state.map(offer => {
				return {
					...offer,
					didInvalidate: true
				};
			});
		case "REQUEST_LATEST_OFFERS":
			return state.map(offer => {
				return {
					...offer,
					isFetching: true,
					didInvalidate: false
				};
			});
		case "FAIL_LATEST_OFFERS_REQUEST":
			return state.map(offer => {
				return {
					...offer,
					isFetching: false
				};
			});
		case "RECEIVE_LATEST_OFFERS":
			return action.offers.map(offer => {
				return {
					...offer,
					lastUpdated: action.receivedAt,

					isFetching: false,
					didInvalidate: false
				};
			});

		default:
			return state;
	}
};

export default latestOffers;
