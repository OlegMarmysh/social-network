export const getUsers = (state) => {
    return state.users.users
};

export const getTotalCountUsers = (state) => {
   return state.users.totalCountItems
};

export const getSizePage = (state) => {
    return state.users.sizePage
};

export const getCurrentPage = (state) => {
    return state.users.currentPage
};

export const getIsFetching = (state) => {
    return state.users.isFetching
};

export const getFollowingInProgress = (state) => {
    return state.users.followingInProgress
};
export const getPortionSize = (state) => {
    return state.users.portionSize
}