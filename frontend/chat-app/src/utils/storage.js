export const setLocalDataUser = async (data) => {
  await localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data));
}