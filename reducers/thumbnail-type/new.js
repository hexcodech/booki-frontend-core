import { combineReducers } from "redux";

const newThumbnailType = (state = {}, action) => {
	switch (action.type) {
		case "CLEAR_NEW_THUMBNAIL_TYPE":
			return {};
		case "UPDATE_NEW_THUMBNAIL_TYPE":
			return { ...state, ...action.thumbnailType };
		case "POST_THUMBNAIL_TYPE":
			return {
				...state,
				isFetching: true,
				didInvalidate: false
			};
		case "FAIL_THUMBNAIL_TYPE_POST":
			return {
				...state,
				isFetching: false,
				didInvalidate: false
			};

		default:
			return state;
	}
};

export default newThumbnailType;
