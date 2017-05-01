import { combineReducers } from "redux";

const thumbnailTypes = (state = [], action) => {
	switch (action.type) {
		case "INVALIDATE_THUMBNAIL_TYPES":
			return state.map(thumbnailType => {
				return {
					...thumbnailType,
					didInvalidate: true
				};
			});
		case "REQUEST_THUMBNAIL_TYPES":
			return state.map(thumbnailType => {
				return {
					...thumbnailType,
					isFetching: true,
					didInvalidate: false
				};
			});
		case "FAIL_THUMBNAIL_TYPES_REQUEST":
			return state.map(thumbnailType => {
				return {
					...thumbnailType,
					isFetching: false
				};
			});
		case "RECEIVE_THUMBNAIL_TYPES":
			return action.thumbnailTypes.map(thumbnailType => {
				return {
					...thumbnailType,
					lastUpdated: action.receivedAt,

					isFetching: false,
					didInvalidate: false
				};
			});
		case "INVALIDATE_THUMBNAIL_TYPE":
			return [
				...state.filter(thumbnailType => {
					return thumbnailType.id !== action.thumbnailType.id;
				}),
				{
					...action.thumbnailType,
					didInvalidate: true
				}
			];

		case "REQUEST_THUMBNAIL_TYPE":
		case "PUT_THUMBNAIL_TYPE":
			return [
				...state.filter(thumbnailType => {
					return thumbnailType.id !== action.thumbnailType.id;
				}),
				{
					...action.thumbnailType,
					isFetching: true,
					didInvalidate: false
				}
			];

		case "DELETE_THUMBNAIL_TYPE":
			return [
				...state.filter(thumbnailType => {
					return thumbnailType.id !== action.thumbnailType.id;
				})
			];

		case "FAIL_THUMBNAIL_TYPE_REQUEST":
		case "FAIL_THUMBNAIL_TYPE_PUT":
			return [
				...state.filter(thumbnailType => {
					return thumbnailType.id !== action.thumbnailType.id;
				}),
				{
					...action.thumbnailType,
					isFetching: false
				}
			];

		case "FAIL_THUMBNAIL_TYPE_DELETE":
			return [
				...state,
				{
					...action.thumbnailType,
					isFetching: false,
					didInvalidate: false
				}
			];

		case "RECEIVE_THUMBNAIL_TYPE":
			return [
				...state.filter(thumbnailType => {
					return thumbnailType.id !== action.thumbnailType.id;
				}),
				{
					...action.thumbnailType,
					isFetching: false,
					didInvalidate: false,
					lastUpdated: action.receivedAt
				}
			];

		case "DELETED_THUMBNAIL_TYPE":
			return state;

		default:
			return state;
	}
};

export default thumbnailTypes;
