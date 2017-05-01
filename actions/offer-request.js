import debounce from "lodash/debounce";
import { fetchApi } from "booki-frontend-core/utilities/rest";

import {
	isValidationError,
	addValidationError,
	clearValidationErrors
} from "booki-frontend-core/actions/validation";

import { addErrorNotification } from "booki-frontend-core/actions/notification";

export const invalidateOfferRequests = () => {
	return {
		type: "INVALIDATE_OFFER_REQUESTS"
	};
};

const requestOfferRequests = (accessToken = "") => {
	return {
		type: "REQUEST_OFFER_REQUESTS",
		accessToken
	};
};

const failOfferRequestsRequest = (error = {}) => {
	return {
		type: "FAIL_OFFER_REQUESTS_REQUEST",
		error
	};
};

const receiveOfferRequests = (offerRequests = [], receivedAt = {}) => {
	return {
		type: "RECEIVE_OFFER_REQUESTS",
		offerRequests,
		receivedAt
	};
};

const fetchOfferRequests = (accessToken = "") => {
	return dispatch => {
		dispatch(requestOfferRequests(accessToken));

		return fetchApi("offer-request", "GET", {}, accessToken)
			.then(offerRequests => {
				dispatch(receiveOfferRequests(offerRequests, Date.now()));
			})
			.catch(error => {
				dispatch(failOfferRequestsRequest(error));

				dispatch(addErrorNotification(error));
			});
	};
};

const shouldFetchOfferRequests = (state = {}) => {
	const offerRequests = state.app.offerRequests;

	for (let i = 0; i < offerRequests.length; i++) {
		if (offerRequests[i].isFetching) {
			return false;
		}

		if (offerRequests[i].didInvalidate || offerRequests[i].lastUpdated === 0) {
			return true;
		}
	}

	return offerRequests.length === 0;
};

export const fetchOfferRequestsIfNeeded = (accessToken = "") => {
	return (dispatch, getState) => {
		if (shouldFetchOfferRequests(getState())) {
			return dispatch(fetchOfferRequests(accessToken));
		} else {
			return Promise.resolve();
		}
	};
};

export const invalidateOfferRequest = (offerRequest = {}) => {
	return {
		type: "INVALIDATE_OFFER_REQUEST",
		offerRequest
	};
};

export const clearNewOfferRequest = () => {
	return {
		type: "CLEAR_NEW_OFFER_REQUEST"
	};
};

export const updateNewOfferRequest = (offerRequest = {}) => {
	return {
		type: "UPDATE_NEW_OFFER_REQUEST",
		offerRequest
	};
};

const requestOfferRequest = (offerRequest = {}) => {
	return {
		type: "REQUEST_OFFER_REQUEST",
		offerRequest
	};
};

const failOfferRequestRequest = (error = {}, offerRequest = {}) => {
	return {
		type: "FAIL_OFFER_REQUEST_REQUEST",
		error,
		offerRequest
	};
};

const receiveOfferRequest = (offerRequest = {}, receivedAt = 0) => {
	return {
		type: "RECEIVE_OFFER_REQUEST",
		offerRequest,
		receivedAt
	};
};

const fetchOfferRequest = (offerRequest = {}, accessToken = 0) => {
	return dispatch => {
		dispatch(requestOfferRequest(offerRequest));

		return fetchApi("offer-request/" + offerRequest.id, "GET", {}, accessToken)
			.then(refreshedOfferRequest => {
				dispatch(receiveOfferRequest(refreshedOfferRequest, Date.now()));
			})
			.catch(error => {
				dispatch(failOfferRequestRequest(error));

				dispatch(addErrorNotification(error));
			});
	};
};

const shouldFetchOfferRequest = (state = {}, offerRequest = {}) => {
	if (offerRequest.isFetching) {
		return false;
	} else if (
		!offerRequest ||
		!offerRequest.lastUpdated ||
		offerRequest.lastUpdated === 0
	) {
		return true;
	} else {
		return offerRequest.didInvalidate;
	}
};

export const fetchOfferRequestIfNeeded = (
	offerRequest = {},
	accessToken = ""
) => {
	return (dispatch, getState) => {
		if (shouldFetchOfferRequest(getState(), offerRequest)) {
			return dispatch(fetchOfferRequest(offerRequest, accessToken));
		} else {
			return Promise.resolve();
		}
	};
};

const putOfferRequest_ = (offerRequest = {}) => {
	return {
		type: "PUT_OFFER_REQUEST",
		offerRequest
	};
};

const failOfferRequestPut = (error = {}, offerRequest = {}) => {
	return {
		type: "FAIL_OFFER_REQUEST_PUT",
		error,
		offerRequest
	};
};

const debouncedPut = debounce(
	(dispatch, offerRequest = {}, accessToken = "") => {
		dispatch(clearValidationErrors("offerRequest"));

		return fetchApi(
			"offer-request/" + offerRequest.id,
			"PUT",
			{ offerRequest },
			accessToken
		)
			.then(updatedOfferRequest => {
				dispatch(receiveOfferRequest(updatedOfferRequest, Date.now()));

				return updatedOfferRequest;
			})
			.catch(error => {
				dispatch(failOfferRequestPut(error, offerRequest));

				if (isValidationError(error)) {
					dispatch(addValidationError(error));
				} else {
					dispatch(addErrorNotification(error));
				}
			});
	},
	1000
);

export const putOfferRequest = (offerRequest = {}, accessToken = "") => {
	return dispatch => {
		dispatch(putOfferRequest_(offerRequest));

		debouncedPut(dispatch, offerRequest, accessToken);
	};
};

const postOfferRequest_ = (offerRequest = {}) => {
	return {
		type: "POST_OFFER_REQUEST",
		offerRequest
	};
};

const failOfferRequestPost = (error = {}, offerRequest = {}) => {
	return {
		type: "FAIL_OFFER_REQUEST_POST",
		error,
		offerRequest
	};
};

export const postOfferRequest = (offerRequest = {}, accessToken = "") => {
	return dispatch => {
		dispatch(clearValidationErrors("offerRequest"));

		dispatch(postOfferRequest_(offerRequest));

		return fetchApi("offer-request", "POST", { offerRequest }, accessToken)
			.then(savedOfferRequest => {
				dispatch(receiveOfferRequest(savedOfferRequest, Date.now()));

				return savedOfferRequest;
			})
			.catch(error => {
				dispatch(failOfferRequestPost(error, offerRequest));

				if (isValidationError(error)) {
					dispatch(addValidationError(error));
				} else {
					dispatch(addErrorNotification(error));
				}
			});
	};
};

const deleteOfferRequest_ = (offerRequest = {}) => {
	return {
		type: "DELETE_OFFER_REQUEST",
		offerRequest
	};
};

const deletedOfferRequest = (offerRequest = {}, success = false) => {
	return {
		type: "DELETED_OFFER_REQUEST",
		offerRequest,
		success
	};
};

const failOfferRequestDelete = (error = {}, offerRequest = {}) => {
	return {
		type: "FAIL_OFFER_REQUEST_DELETE",
		error,
		offerRequest
	};
};

export const deleteOfferRequest = (offerRequest = {}, accessToken = "") => {
	return dispatch => {
		dispatch(deleteOfferRequest_(offerRequest));

		return fetchApi(
			"offer-request/" + offerRequest.id,
			"DELETE",
			{},
			accessToken
		)
			.then(response => {
				dispatch(deletedOfferRequest(offerRequest, response.success));

				if (!response.success) {
					failOfferRequestDelete(
						"The API couldn't delete the offerRequest!",
						offerRequest
					);
				}

				return response.success;
			})
			.catch(error => {
				dispatch(failOfferRequestDelete(error, offerRequest));

				dispatch(addErrorNotification(error));
			});
	};
};
