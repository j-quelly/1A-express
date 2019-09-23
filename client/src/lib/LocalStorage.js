export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
    return serializedState;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error saving state');
  }
};

export const destroyState = () => {
  const { localStorage } = window;
  if (localStorage) {
    Object.keys(localStorage).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};
