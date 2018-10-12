export const incrementCounter = num => ({ type: "INCREMENT_COUNTER", payload: num });

export const sendRouteComponent = component => ({ type: "CHANGE_ROUTE_COMPONENT", payload: component });

export const updateChecked = obj => ({ type: "UPDATE_CHECKED", payload: obj });

export const deleteRow = obj => ({ type: "DELETE_ROW", payload: obj });

export const addScheduleSelect = () => ({ type: "ADD_SCHEDULE_SELECT" });

export const requestScheduleSubmit = obj => ({ type: "REQUEST_SCHEDULE_SUBMIT", payload: obj });

export const updateNameField = obj => ({ type: "UPDATE_NAME_FIELD", payload: obj });

export const updateOpenClosedTime = obj => ({ type: "UPDATE_OPEN_CLOSED_TIME", payload: obj })

export const requestGetAll = () => ({ type: "REQUEST_GET_ALL" });