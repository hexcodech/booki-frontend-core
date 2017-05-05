import { fetchApi } from "booki-frontend-core/utilities/rest";

import {
	isValidationError,
	addValidationError,
	clearValidationErrors
} from "booki-frontend-core/actions/validation";

import { addErrorNotification } from "booki-frontend-core/actions/notification";

export const invalidateThumbnailTypes = () => {
	return {
		type: "INVALIDATE_THUMBNAIL_TYPES"
	};
};

const requestThumbnailTypes = (accessToken = "") => {
	return {
		type: "REQUEST_THUMBNAIL_TYPES",
		accessToken
	};
};

const failThumbnailTypesRequest = (error = {}) => {
	return {
		type: "FAIL_THUMBNAIL_TYPES_REQUEST",
		error
	};
};

const receiveThumbnailTypes = (thumbnailTypes = [], receivedAt = {}) => {
	return {
		type: "RECEIVE_THUMBNAIL_TYPES",
		thumbnailTypes,
		receivedAt
	};
};

const fetchThumbnailTypes = (accessToken = "") => {
	return dispatch => {
		dispatch(requestThumbnailTypes(accessToken));

		return fetchApi("thumbnail-type", "GET", {}, accessToken)
			.then(thumbnailTypes => {
				dispatch(receiveThumbnailTypes(thumbnailTypes, Date.now()));
			})
			.catch(error => {
				dispatch(failThumbnailTypesRequest(error));

				dispatch(addErrorNotification(error));
			});
	};
};

const shouldFetchThumbnailTypes = (state = {}) => {
	const thumbnailTypes = state.app.thumbnailTypes;

	for (let i = 0; i < thumbnailTypes.length; i++) {
		if (thumbnailTypes[i].isFetching) {
			return false;
		}

		if (
			thumbnailTypes[i].didInvalidate ||
			thumbnailTypes[i].lastUpdated === 0
		) {
			return true;
		}
	}

	return thumbnailTypes.length === 0;
};

export const fetchThumbnailTypesIfNeeded = (accessToken = "") => {
	return (dispatch, getState) => {
		if (shouldFetchThumbnailTypes(getState())) {
			return dispatch(fetchThumbnailTypes(accessToken));
		} else {
			return Promise.resolve();
		}
	};
};

export const invalidateThumbnailType = (thumbnailType = {}) => {
	return {
		type: "INVALIDATE_THUMBNAIL_TYPE",
		thumbnailType
	};
};

export const clearNewThumbnailType = () => {
	return {
		type: "CLEAR_NEW_THUMBNAIL_TYPE"
	};
};

export const updateNewThumbnailType = (thumbnailType = {}) => {
	return {
		type: "UPDATE_NEW_THUMBNAIL_TYPE",
		thumbnailType
	};
};

const requestThumbnailType = (thumbnailType = {}) => {
	return {
		type: "REQUEST_THUMBNAIL_TYPE",
		thumbnailType
	};
};

const failThumbnailTypeRequest = (error = {}, thumbnailType = {}) => {
	return {
		type: "FAIL_THUMBNAIL_TYPE_REQUEST",
		error,
		thumbnailType
	};
};

const receiveThumbnailType = (thumbnailType = {}, receivedAt = 0) => {
	return {
		type: "RECEIVE_THUMBNAIL_TYPE",
		thumbnailType,
		receivedAt
	};
};

const fetchThumbnailType = (thumbnailType = {}, accessToken = 0) => {
	return dispatch => {
		dispatch(requestThumbnailType(thumbnailType));

		return fetchApi(
			"thumbnail-type/" + thumbnailType.id,
			"GET",
			{},
			accessToken
		)
			.then(refreshedThumbnailType => {
				dispatch(receiveThumbnailType(refreshedThumbnailType, Date.now()));
			})
			.catch(error => {
				dispatch(failThumbnailTypeRequest(error));

				dispatch(addErrorNotification(error));
			});
	};
};

const shouldFetchThumbnailType = (state = {}, thumbnailType = {}) => {
	if (thumbnailType.isFetching) {
		return false;
	} else if (
		!thumbnailType ||
		!thumbnailType.lastUpdated ||
		thumbnailType.lastUpdated === 0
	) {
		return true;
	} else {
		return thumbnailType.didInvalidate;
	}
};

export const fetchThumbnailTypeIfNeeded = (
	thumbnailType = {},
	accessToken = ""
) => {
	return (dispatch, getState) => {
		if (shouldFetchThumbnailType(getState(), thumbnailType)) {
			return dispatch(fetchThumbnailType(thumbnailType, accessToken));
		} else {
			return Promise.resolve();
		}
	};
};

export const updateThumbnailType = (thumbnailType = {}) => {
	return {
		type: "UPDATE_THUMBNAIL_TYPE",
		thumbnailType
	};
};

const putThumbnailType_ = (thumbnailType = {}) => {
	return {
		type: "PUT_THUMBNAIL_TYPE",
		thumbnailType
	};
};

const failThumbnailTypePut = (error = {}, thumbnailType = {}) => {
	return {
		type: "FAIL_THUMBNAIL_TYPE_PUT",
		error,
		thumbnailType
	};
};

export const putThumbnailType = (thumbnailType = {}, accessToken = "") => {
	return dispatch => {
		dispatch(clearValidationErrors("thumbnailType"));
		dispatch(putThumbnailType_(thumbnailType));

		return fetchApi(
			"thumbnail-type/" + thumbnailType.id,
			"PUT",
			{ thumbnailType },
			accessToken
		)
			.then(updatedThumbnailType => {
				dispatch(receiveThumbnailType(updatedThumbnailType, Date.now()));

				return updatedThumbnailType;
			})
			.catch(error => {
				dispatch(failThumbnailTypePut(error, thumbnailType));

				if (isValidationError(error)) {
					dispatch(addValidationError(error));
				} else {
					dispatch(addErrorNotification(error));
				}
			});
	};
};

const postThumbnailType_ = (thumbnailType = {}) => {
	return {
		type: "POST_THUMBNAIL_TYPE",
		thumbnailType
	};
};

const failThumbnailTypePost = (error = {}, thumbnailType = {}) => {
	return {
		type: "FAIL_THUMBNAIL_TYPE_POST",
		error,
		thumbnailType
	};
};

export const postThumbnailType = (thumbnailType = {}, accessToken = "") => {
	return dispatch => {
		dispatch(clearValidationErrors("thumbnailType"));

		dispatch(postThumbnailType_(thumbnailType));

		return fetchApi("thumbnail-type", "POST", { thumbnailType }, accessToken)
			.then(savedThumbnailType => {
				dispatch(receiveThumbnailType(savedThumbnailType, Date.now()));

				return savedThumbnailType;
			})
			.catch(error => {
				dispatch(failThumbnailTypePost(error, thumbnailType));

				if (isValidationError(error)) {
					dispatch(addValidationError(error));
				} else {
					dispatch(addErrorNotification(error));
				}
			});
	};
};

const deleteThumbnailType_ = (thumbnailType = {}) => {
	return {
		type: "DELETE_THUMBNAIL_TYPE",
		thumbnailType
	};
};

const deletedThumbnailType = (thumbnailType = {}, success = false) => {
	return {
		type: "DELETED_THUMBNAIL_TYPE",
		thumbnailType,
		success
	};
};

const failThumbnailTypeDelete = (error = {}, thumbnailType = {}) => {
	return {
		type: "FAIL_THUMBNAIL_TYPE_DELETE",
		error,
		thumbnailType
	};
};

export const deleteThumbnailType = (thumbnailType = {}, accessToken = "") => {
	return dispatch => {
		dispatch(deleteThumbnailType_(thumbnailType));

		return fetchApi(
			"thumbnail-type/" + thumbnailType.id,
			"DELETE",
			{},
			accessToken
		)
			.then(response => {
				dispatch(deletedThumbnailType(thumbnailType, response.success));

				if (!response.success) {
					failThumbnailTypeDelete(
						"The API couldn't delete the thumbnailType!",
						thumbnailType
					);
				}

				return response.success;
			})
			.catch(error => {
				dispatch(failThumbnailTypeDelete(error, thumbnailType));

				dispatch(addErrorNotification(error));
			});
	};
};
