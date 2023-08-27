// export const someGetter = (/* state */) => {
// }

export const sideMenuOpen = (state) => {
  return state.isSideMenuOpen;
};
export const isAuthenticated = (state) => {
  return state.user !== null;
}
