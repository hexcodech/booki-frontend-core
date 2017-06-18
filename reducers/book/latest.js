import { combineReducers } from "redux";

const latestBookOffers = (state = [], action) => {
	switch (action.type) {
		case "INVALIDATE_LATEST_BOOK_OFFERS":
			return state.map(book => {
				return {
					...book,
					didInvalidate: true
				};
			});
		case "REQUEST_LATEST_BOOK_OFFERS":
			return state.map(book => {
				return {
					...book,
					isFetching: true,
					didInvalidate: false
				};
			});
		case "FAIL_LATEST_BOOK_OFFERS_REQUEST":
			return state.map(book => {
				return {
					...book,
					isFetching: false
				};
			});
		case "RECEIVE_LATEST_BOOK_OFFERS":
			return action.offers.map(book => {
				return {
					...book,
					lastUpdated: action.receivedAt,

					isFetching: false,
					didInvalidate: false
				};
			});

		default:
			return state;
	}
};

export default latestBookOffers;
