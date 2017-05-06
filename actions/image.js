import { fetchApi, uploadFile } from "booki-frontend-core/utilities/rest";

import {
	isValidationError,
	addValidationError,
	clearValidationErrors
} from "booki-frontend-core/actions/validation";

import { addErrorNotification } from "booki-frontend-core/actions/notification";

export const invalidateImages = () => {
	return {
		type: "INVALIDATE_IMAGES"
	};
};

const requestImages = (accessToken = "") => {
	return {
		type: "REQUEST_Images",
		accessToken
	};
};

const failImagesRequest = (error = {}) => {
	return {
		type: "FAIL_IMAGES_REQUEST",
		error
	};
};

const receiveImages = (images = [], receivedAt = 0) => {
	return {
		type: "RECEIVE_IMAGES",
		images,
		receivedAt
	};
};

const fetchImages = (accessToken = "") => {
	return dispatch => {
		dispatch(requestImages(accessToken));

		return fetchApi("image", "GET", {}, accessToken)
			.then(images => {
				dispatch(receiveImages(images, Date.now()));
			})
			.catch(error => {
				dispatch(failImagesRequest(error));

				dispatch(addErrorNotification(error));
			});
	};
};

const shouldFetchImages = (state = {}) => {
	const images = state.app.images;

	for (let i = 0; i < images.length; i++) {
		if (images[i].isFetching) {
			return false;
		}

		if (images[i].didInvalidate || images[i].lastUpdated === 0) {
			return true;
		}
	}

	return images.length === 0;
};

export const fetchImagesIfNeeded = (accessToken = "") => {
	return (dispatch, getState) => {
		if (shouldFetchImages(getState())) {
			return dispatch(fetchImages(accessToken));
		} else {
			return Promise.resolve();
		}
	};
};

export const invalidateImage = (image = {}) => {
	return {
		type: "INVALIDATE_IMAGE",
		image
	};
};

//single images cannot be 'GET'ed, we're not a public image api ^^

const receiveImage = (image = {}, receivedAt = 0) => {
	return {
		type: "RECEIVE_IMAGE",
		image,
		receivedAt
	};
};

export const updateImage = (image = {}) => {
	return {
		type: "UPDATE_IMAGE",
		image
	};
};

const putImage_ = (image = {}) => {
	return {
		type: "PUT_IMAGE",
		image
	};
};

const failImagePut = (error = {}, image = {}) => {
	return {
		type: "FAIL_IMAGE_PUT",
		error,
		image
	};
};

export const putImage = (id, imageFile = null, accessToken = "") => {
	return dispatch => {
		dispatch(clearValidationErrors("image"));
		dispatch(putImage_(id));

		return uploadFile("image/" + id, "PUT", imageFile, accessToken)
			.then(updatedImage => {
				dispatch(receiveImage(updatedImage, Date.now()));

				return updatedImage;
			})
			.catch(error => {
				dispatch(failImagePut(error, id));

				if (isValidationError(error)) {
					dispatch(addValidationError(error));
				} else {
					dispatch(addErrorNotification(error));
				}
			});
	};
};

const postImage_ = (image = {}) => {
	return {
		type: "POST_IMAGE",
		image
	};
};

const failImagePost = (error = {}, image = {}) => {
	return {
		type: "FAIL_IMAGE_POST",
		error,
		image
	};
};

export const postImage = (image = {}, accessToken = "") => {
	return dispatch => {
		dispatch(clearValidationErrors("image"));
		dispatch(postImage_(image));

		return uploadFile("image", "POST", image, accessToken)
			.then(savedImage => {
				dispatch(receiveImage(savedImage, Date.now()));

				return savedImage;
			})
			.catch(error => {
				dispatch(failImagePost(error, image));

				if (isValidationError(error)) {
					dispatch(addValidationError(error));
				} else {
					dispatch(addErrorNotification(error));
				}
			});
	};
};

const deleteImage_ = (image = {}) => {
	return {
		type: "DELETE_IMAGE",
		image
	};
};

const failImageDelete = (error = {}, image = {}) => {
	return {
		type: "FAIL_IMAGE_DELETE",
		error,
		image
	};
};

const deletedImage = (image = {}, success = false) => {
	return {
		type: "DELETED_IMAGE",
		image,
		success
	};
};

export const deleteImage = (image = {}, accessToken = "") => {
	return dispatch => {
		dispatch(deleteImage_(image));

		return fetchApi("image/" + image.id, "DELETE", {}, accessToken)
			.then(response => {
				dispatch(deletedImage(image, response.success));

				if (!response.success) {
					failImageDelete("The API couldn't delete the image!", image);
				}

				return response.success;
			})
			.catch(error => {
				dispatch(failImageDelete(error, image));

				dispatch(addErrorNotification(error));
			});
	};
};
