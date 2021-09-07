import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };
    case SET_STORIES:
      return { ...state, isLoading: false, hits: action.payload.hits, nbPages: action.payload.nbPages };
    case REMOVE_STORY:
      const newStories = state.hits.filter(story => story.objectID !== action.payload);
      return { ...state, hits: newStories };
    case HANDLE_PAGE:
      let newPage;
      if (action.payload === 'decrease') newPage = state.page === 0 ? state.nbPages - 1 : state.page - 1;
      if (action.payload === 'increase') newPage = state.page === state.nbPages - 1 ? 0 : state.page + 1;
      return { ...state, page: newPage };
    case HANDLE_SEARCH:
      return { ...state, query: action.payload, page: 0 };
    default:
      throw new Error(`no matching "${action.type}"" action type`);
  }
};

// case HANDLE_PAGE:;

export default reducer;