import { combineReducers } from "redux";

const offerRequests = (state = [], action) => {
	switch (action.type) {
		case "INVALIDATE_OFFER_REQUESTS":
			return state.map(offerRequest => {
				return {
					...offerRequest,
					didInvalidate: true
				};
			});
		case "REQUEST_OFFER_REQUESTS":
			return state.map(offerRequest => {
				return {
					...offerRequest,
					isFetching: true,
					didInvalidate: false
				};
			});
		case "FAIL_OFFER_REQUESTS_REQUEST":
			return state.map(offerRequest => {
				return {
					...offerRequest,
					isFetching: false
				};
			});
		case "RECEIVE_OFFER_REQUESTS":
			return action.offerRequests.map(offerRequest => {
				return {
					...offerRequest,
					lastUpdated: action.receivedAt,

					isFetching: false,
					didInvalidate: false
				};
			});
		case "INVALIDATE_OFFER_REQUEST":
			return [
				...state.filter(offerRequest => {
					return offerRequest.id !== action.offerRequest.id;
				}),
				{
					...action.offerRequest,
					didInvalidate: true
				}
			];

		case "REQUEST_OFFER_REQUEST":
		case "UPDATE_OFFER_REQUEST":
		case "PUT_OFFER_REQUEST":
			return [
				...state.filter(offerRequest => {
					return offerRequest.id !== action.offerRequest.id;
				}),
				{
					...action.offerRequest,
					isFetching: true,
					didInvalidate: false
				}
			];

		case "DELETE_OFFER_REQUEST":
			return [
				...state.filter(offerRequest => {
					return offerRequest.id !== action.offerRequest.id;
				})
			];

		case "FAIL_OFFER_REQUEST_REQUEST":
		case "FAIL_OFFER_REQUEST_PUT":
			return [
				...state.filter(offerRequest => {
					return offerRequest.id !== action.offerRequest.id;
				}),
				{
					...action.offerRequest,
					isFetching: false
				}
			];

		case "FAIL_OFFER_REQUEST_DELETE":
			return [
				...state,
				{
					...action.offerRequest,
					isFetching: false,
					didInvalidate: false
				}
			];

		case "RECEIVE_OFFER_REQUEST":
			return [
				...state.filter(offerRequest => {
					return offerRequest.id !== action.offerRequest.id;
				}),
				{
					...action.offerRequest,
					isFetching: false,
					didInvalidate: false,
					lastUpdated: action.receivedAt
				}
			];

		case "DELETED_OFFER_REQUEST":
			return state;

		default:
			return state;
	}
};

export default offerRequests;
