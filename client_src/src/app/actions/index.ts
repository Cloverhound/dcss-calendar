export const incrementCounter = num => ({ type: "INCREMENT_COUNTER", payload: num });

export const sendRouteComponent = component => ({ type: "CHANGE_ROUTE_COMPONENT", payload: component });

export const updateChecked = obj => ({ type: "UPDATE_CHECKED", payload: obj });

export const updateDisabled = obj => ({ type: "UPDATE_DISABLED", payload: obj });

export const deleteRow = obj => ({ type: "DELETE_ROW", payload: obj });