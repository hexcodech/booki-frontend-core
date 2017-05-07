import { combineReducers } from "redux";

const images = (state = [], action) => {
	switch (action.type) {
		case "INVALIDATE_IMAGES":
			return state.map(image => {
				return {
					...image,
					didInvalidate: true
				};
			});
		case "REQUEST_IMAGES":
			return state.map(image => {
				return {
					...image,
					isFetching: true,
					didInvalidate: false
				};
			});
		case "FAIL_IMAGES_REQUEST":
			return state.map(image => {
				return {
					...image,
					isFetching: false
				};
			});
		case "RECEIVE_IMAGES":
			return action.images.map(image => {
				return {
					...image,
					lastUpdated: action.receivedAt,

					isFetching: false,
					didInvalidate: false
				};
			});
		case "INVALIDATE_IMAGE":
			return [
				...state.filter(image => {
					return image.id != action.image.id;
				}),
				{
					...action.image,
					didInvalidate: true
				}
			];

		case "REQUEST_IMAGE":
		case "UPDATE_IMAGE":
		case "PUT_IMAGE":
			return [
				...state.filter(image => {
					return image.id != action.image.id;
				}),
				{
					...action.image,
					isFetching: true,
					didInvalidate: false
				}
			];

		case "DELETE_IMAGE":
			return [
				...state.filter(image => {
					return image.id != action.image.id;
				})
			];

		case "FAIL_IMAGE_REQUEST":
		case "FAIL_IMAGE_PUT":
			return [
				...state.filter(image => {
					return image.id != action.image.id;
				}),
				{
					...action.image,
					isFetching: false
				}
			];

		case "FAIL_IMAGE_DELETE":
			return [
				...state,
				{
					...action.image,
					isFetching: false,
					didInvalidate: false
				}
			];

		case "RECEIVE_IMAGE":
			return [
				...state.filter(image => {
					return image.id != action.image.id;
				}),
				{
					...action.image,
					isFetching: false,
					didInvalidate: false,
					lastUpdated: action.receivedAt
				}
			];

		case "DELETED_IMAGE":
			return state;

		default:
			return state;
	}
};

export default images;
