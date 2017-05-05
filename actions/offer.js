import { fetchApi } from "booki-frontend-core/utilities/rest";

import {
	isValidationError,
	addValidationError,
	clearValidationErrors
} from "booki-frontend-core/actions/validation";

import { addErrorNotification } from "booki-frontend-core/actions/notification";

export const invalidateOffers = () => {
	return {
		type: "INVALIDATE_OFFERS"
	};
};

const requestOffers = (accessToken = "") => {
	return {
		type: "REQUEST_OFFERS",
		accessToken
	};
};

const failOffersRequest = (error = {}) => {
	return {
		type: "FAIL_OFFERS_REQUEST",
		error
	};
};

const receiveOffers = (offers = [], receivedAt = {}) => {
	return {
		type: "RECEIVE_OFFERS",
		offers,
		receivedAt
	};
};

const fetchOffers = (accessToken = "") => {
	return dispatch => {
		dispatch(requestOffers(accessToken));

		return fetchApi("offer", "GET", {}, accessToken)
			.then(offers => {
				dispatch(receiveOffers(offers, Date.now()));
			})
			.catch(error => {
				dispatch(failOffersRequest(error));

				dispatch(addErrorNotification(error));
			});
	};
};

const shouldFetchOffers = (state = {}) => {
	const offers = state.app.offers;

	for (let i = 0; i < offers.length; i++) {
		if (offers[i].isFetching) {
			return false;
		}

		if (offers[i].didInvalidate || offers[i].lastUpdated === 0) {
			return true;
		}
	}

	return offers.length === 0;
};

export const fetchOffersIfNeeded = (accessToken = "") => {
	return (dispatch, getState) => {
		if (shouldFetchOffers(getState())) {
			return dispatch(fetchOffers(accessToken));
		} else {
			return Promise.resolve();
		}
	};
};

export const invalidateOffer = (offer = {}) => {
	return {
		type: "INVALIDATE_OFFER",
		offer
	};
};

export const clearNewOffer = () => {
	return {
		type: "CLEAR_NEW_OFFER"
	};
};

export const updateNewOffer = (offer = {}) => {
	return {
		type: "UPDATE_NEW_OFFER",
		offer
	};
};

const requestOffer = (offer = {}) => {
	return {
		type: "REQUEST_OFFER",
		offer
	};
};

const failOfferRequest = (error = {}, offer = {}) => {
	return {
		type: "FAIL_OFFER_REQUEST",
		error,
		offer
	};
};

const receiveOffer = (offer = {}, receivedAt = 0) => {
	return {
		type: "RECEIVE_OFFER",
		offer,
		receivedAt
	};
};

const fetchOffer = (offer = {}, accessToken = 0) => {
	return dispatch => {
		dispatch(requestOffer(offer));

		return fetchApi("offer/" + offer.id, "GET", {}, accessToken)
			.then(refreshedOffer => {
				dispatch(receiveOffer(refreshedOffer, Date.now()));
			})
			.catch(error => {
				dispatch(failOfferRequest(error));

				dispatch(addErrorNotification(error));
			});
	};
};

const shouldFetchOffer = (state = {}, offer = {}) => {
	if (offer.isFetching) {
		return false;
	} else if (!offer || !offer.lastUpdated || offer.lastUpdated === 0) {
		return true;
	} else {
		return offer.didInvalidate;
	}
};

export const fetchOfferIfNeeded = (offer = {}, accessToken = "") => {
	return (dispatch, getState) => {
		if (shouldFetchOffer(getState(), offer)) {
			return dispatch(fetchOffer(offer, accessToken));
		} else {
			return Promise.resolve();
		}
	};
};

export const updateOffer = (offer = {}) => {
	return {
		type: "UPDATE_OFFER",
		offer
	};
};

const putOffer_ = (offer = {}) => {
	return {
		type: "PUT_OFFER",
		offer
	};
};

const failOfferPut = (error = {}, offer = {}) => {
	return {
		type: "FAIL_OFFER_PUT",
		error,
		offer
	};
};

export const putOffer = (offer = {}, accessToken = "") => {
	return dispatch => {
		dispatch(clearValidationErrors("offer"));
		dispatch(putOffer_(offer));

		return fetchApi("offer/" + offer.id, "PUT", { offer }, accessToken)
			.then(updatedOffer => {
				dispatch(receiveOffer(updatedOffer, Date.now()));

				return updatedOffer;
			})
			.catch(error => {
				dispatch(failOfferPut(error, offer));

				if (isValidationError(error)) {
					dispatch(addValidationError(error));
				} else {
					dispatch(addErrorNotification(error));
				}
			});
	};
};

const postOffer_ = (offer = {}) => {
	return {
		type: "POST_OFFER",
		offer
	};
};

const failOfferPost = (error = {}, offer = {}) => {
	return {
		type: "FAIL_OFFER_POST",
		error,
		offer
	};
};

export const postOffer = (offer = {}, accessToken = "") => {
	return dispatch => {
		dispatch(clearValidationErrors("offer"));

		dispatch(postOffer_(offer));

		return fetchApi("offer", "POST", { offer }, accessToken)
			.then(savedOffer => {
				dispatch(receiveOffer(savedOffer, Date.now()));

				return savedOffer;
			})
			.catch(error => {
				dispatch(failOfferPost(error, offer));

				if (isValidationError(error)) {
					dispatch(addValidationError(error));
				} else {
					dispatch(addErrorNotification(error));
				}
			});
	};
};

const deleteOffer_ = (offer = {}) => {
	return {
		type: "DELETE_OFFER",
		offer
	};
};

const deletedOffer = (offer = {}, success = false) => {
	return {
		type: "DELETED_OFFER",
		offer,
		success
	};
};

const failOfferDelete = (error = {}, offer = {}) => {
	return {
		type: "FAIL_OFFER_DELETE",
		error,
		offer
	};
};

export const deleteOffer = (offer = {}, accessToken = "") => {
	return dispatch => {
		dispatch(deleteOffer_(offer));

		return fetchApi("offer/" + offer.id, "DELETE", {}, accessToken)
			.then(response => {
				dispatch(deletedOffer(offer, response.success));

				if (!response.success) {
					failOfferDelete("The API couldn't delete the offer!", offer);
				}

				return response.success;
			})
			.catch(error => {
				dispatch(failOfferDelete(error, offer));

				dispatch(addErrorNotification(error));
			});
	};
};

const lookUpOffers_ = () => {
	return {
		type: "LOOKUP_OFFERS"
	};
};

const failOfferLookup = (error = {}) => {
	return {
		type: "FAIL_OFFER_LOOKUP",
		error
	};
};

const lookedUpOffers = (offers = []) => {
	return {
		type: "LOOKED_UP_OFFERS",
		offers
	};
};

const debouncedLookup = debounce((dispatch, search = "", accessToken = "") => {
	dispatch(lookUpOffers_());

	return fetchApi("offer/lookup?search=" + search, "GET", {}, accessToken)
		.then(offers => {
			dispatch(lookedUpOffers(offers));

			return offers;
		})
		.catch(error => {
			dispatch(failOfferLookup(error));

			dispatch(addErrorNotification(error));
		});
}, 300);

export const lookUpOffers = (search = "", accessToken = "") => {
	return dispatch => {
		return debouncedLookup(dispatch, search, accessToken);
	};
};
