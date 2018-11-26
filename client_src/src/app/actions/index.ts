export const incrementCounter = num => ({ type: "INCREMENT_COUNTER", payload: num });

export const sendRouteComponent = component => ({ type: "CHANGE_ROUTE_COMPONENT", payload: component });

// Schedules
export const updateChecked = obj => ({ type: "UPDATE_CHECKED", payload: obj });
export const deleteRow = obj => ({ type: "DELETE_ROW", payload: obj });
export const addScheduleSelect = () => ({ type: "ADD_SCHEDULE_SELECT" });
export const getSchedulesFromServer = ()  => ({ type: "GET_SCHEDULES_FROM_SERVER" });
export const requestScheduleSubmit = obj => ({ type: "SUBMIT_NEW_SCHEDULE_TO_SERVER", payload: obj });
export const requestScheduleEdit = obj => ({ type: "SUBMIT_UPDATE_SCHEDULE_TO_SERVER", payload: obj })
export const requestScheduleDelete = obj => ({ type: "SUBMIT_DELETE_SCHEDULE_TO_SERVER", payload: obj })



export const updateNameField = obj => ({ type: "UPDATE_NAME_FIELD", payload: obj });

export const updateOpenClosedTime = obj => ({ type: "UPDATE_OPEN_CLOSED_TIME", payload: obj })
export const updateTimeRanges = (obj) => ({ type: "UPDATE_TIME_RANGES", payload: obj });
export const resetTimeRanges = () => ({ type: "RESET_TIME_RANGES" })

// Queues
export const getQueuesFromServer = () => ({ type: "GET_QUEUES_FROM_SERVER" });
export const submitNewQueueToServer = obj => ({ type: "SUBMIT_NEW_QUEUE_TO_SERVER", payload: obj });
export const submitUpdateQueueToServer = obj => ({ type: "SUBMIT_UPDATE_QUEUE_TO_SERVER", payload: obj });

export const handleAddQueueChange = (obj) => ({ type: "UPDATE_ADD_QUEUE_STATE", payload: obj });



export const loading = () => ({type: "LOADING"})


export const getHolidayListsFromServer                  = ()  => ({type: "GET_HOLIDAY_LISTS_FROM_SERVER"});
export const getHolidayListsFromServerSucceeded         = obj => ({type: "GET_HOLIDAY_LISTS_FROM_SERVER_SUCCEEDED", payload: obj});
export const getHolidayListsFromServerFailed            = obj => ({type: "GET_HOLIDAY_LISTS_FROM_SERVER_FAILED", payload: obj});

export const getHolidayListFromServer                   = obj => ({type: "GET_HOLIDAY_LIST_FROM_SERVER", payload: obj});
export const getHolidayListFromServerSucceeded          = obj => ({type: "GET_HOLIDAY_LIST_FROM_SERVER_SUCCEEDED", payload: obj});
export const getHolidayListFromServerFailed             = obj => ({type: "GET_HOLIDAY_LIST_FROM_SERVER_FAILED", payload: obj});

export const changeHolidayListName                      = obj => ({type: "CHANGE_HOLIDAY_LIST_NAME", payload: obj});
export const changeHolidayName                          = obj => ({type: "CHANGE_HOLIDAY_NAME", payload: obj});
export const changeHolidayDate                          = obj => ({type: "CHANGE_HOLIDAY_DATE", payload: obj});
export const addHoliday                                 = ()  => ({type: "ADD_HOLIDAY"});
export const deleteHoliday                              = obj => ({type: "DELETE_HOLIDAY", payload: obj});

export const submitNewHolidayListToServer               = obj => ({type: "SUBMIT_NEW_HOLIDAY_LIST_TO_SERVER", payload: obj });
export const submitNewHolidayListToServerSucceeded      = obj => ({type: "SUBMIT_NEW_HOLIDAY_LIST_TO_SERVER_SUCCEEDED", payload: obj });
export const submitNewHolidayListToServerFailed         = obj => ({type: "SUBMIT_NEW_HOLIDAY_LIST_TO_SERVER_FAILED", payload: obj });

export const submitUpdateHolidayListToServer            = obj => ({type: "SUBMIT_UPDATE_HOLIDAY_LIST_TO_SERVER", payload: obj });
export const submitUpdateHolidayListToServerSucceeded   = obj => ({type: "SUBMIT_UPDATE_HOLIDAY_LIST_TO_SERVER_SUCCEEDED", payload: obj});
export const submitUpdateHolidayListToServerFailed      = obj => ({type: "SUBMIT_UPDATE_HOLIDAY_LIST_TO_SERVER_FAILED", payload: obj});

export const submitDeleteHolidayListToServer            = obj => ({type: "SUBMIT_DELETE_HOLIDAY_LIST_TO_SERVER", payload: obj });
export const submitDeleteHolidayListToServerSucceeded   = obj => ({type: "SUBMIT_DELETE_HOLIDAY_LIST_TO_SERVER_SUCCEEDED", payload: obj });
export const submitDeleteHolidayListToServerFailed      = obj => ({type: "SUBMIT_DELETE_HOLIDAY_LIST_TO_SERVER_FAILED", payload: obj });


export const handleCloseMessage                         = ()  => ({type: "HANDLE_CLOSE_MESSAGE"})

