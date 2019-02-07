export const incrementCounter = num => ({ type: "INCREMENT_COUNTER", payload: num });

export const updateRoute = obj => ({ type: "UPDATE_ROUTE", payload: obj });

export const scheduleLoading                         = ()  => ({type: "SCHEDULE_LOADING"})

export const toggleRecurringDay                      = obj => ({ type: "TOGGLE_RECURRING_DAY", payload: obj });
export const deleteRecurringTimeRange                = obj => ({ type: "DELETE_RECURRING_TIME_RANGE", payload: obj });
export const addRecurringTimeRange                   = ()  => ({ type: "ADD_RECURRING_TIME_RANGE" });

export const changeStartOfSingleDateTimeRange        = obj => ({ type: "CHANGE_START_OF_SINGLE_DATE_TIME_RANGE", payload: obj})
export const changeEndOfSingleDateTimeRange          = obj => ({ type: "CHANGE_END_OF_SINGLE_DATE_TIME_RANGE", payload: obj})
export const changeDateOfSingleDateTimeRange         = obj => ({ type: "CHANGE_DATE_OF_SINGLE_DATE_TIME_RANGE", payload: obj })
export const deleteSingleDateTimeRange               = obj => ({ type: "DELETE_SINGLE_DATE_TIME_RANGE", payload: obj})
export const addSingleDateTimeRange                  = ()  => ({ type: "ADD_SINGLE_DATE_TIME_RANGE" })

export const getSchedulesFromServer                  = ()  => ({ type: "GET_SCHEDULES_FROM_SERVER" });
export const getSchedulesFromServerSucceeded         = obj => ({ type: "GET_SCHEDULES_FROM_SERVER_SUCCEEDED", payload: obj  });
export const getSchedulesFromServerFailed            = obj => ({ type: "GET_SCHEDULES_FROM_SERVER_FAILED", payload: obj  });

export const getScheduleFromServer                   = obj => ({ type: "GET_SCHEDULE_FROM_SERVER", payload: obj });
export const getScheduleFromServerSucceeded          = obj => ({ type: "GET_SCHEDULE_FROM_SERVER_SUCCEEDED", payload: obj  });
export const getScheduleFromServerFailed             = obj => ({ type: "GET_SCHEDULE_FROM_SERVER_FAILED", payload: obj  });

export const submitNewScheduleToServer               = obj => ({ type: "SUBMIT_NEW_SCHEDULE_TO_SERVER", payload: obj });
export const submitNewScheduleToServerSucceeded      = obj => ({ type: "SUBMIT_NEW_SCHEDULE_TO_SERVER_SUCCEEDED", payload: obj });
export const submitNewScheduleToServerFailed         = obj => ({ type: "SUBMIT_NEW_SCHEDULE_TO_SERVER_FAILED", payload: obj });

export const submitUpdateScheduleToServer            = obj => ({ type: "SUBMIT_UPDATE_SCHEDULE_TO_SERVER", payload: obj })
export const submitUpdateScheduleToServerSucceeded   = obj => ({ type: "SUBMIT_UPDATE_SCHEDULE_TO_SERVER_SUCCEEDED", payload: obj })
export const submitUpdateScheduleToServerFailed      = obj => ({ type: "SUBMIT_UPDATE_SCHEDULE_TO_SERVER_FAILED", payload: obj })

export const submitDeleteScheduleToServer            = obj => ({ type: "SUBMIT_DELETE_SCHEDULE_TO_SERVER", payload: obj })
export const submitDeleteScheduleToServerSucceeded   = obj => ({ type: "SUBMIT_DELETE_SCHEDULE_TO_SERVER_SUCCEEDED", payload: obj })
export const submitDeleteScheduleToServerFailed      = obj => ({ type: "SUBMIT_DELETE_SCHEDULE_TO_SERVER_FAILED", payload: obj })

export const changeScheduleName                      = obj => ({ type: "CHANGE_SCHEDULE_NAME", payload: obj });
export const changeStartOfRecurringTimeRange         = obj => ({ type: "CHANGE_START_OF_RECURRING_TIME_RANGE", payload: obj })
export const changeEndOfRecurringTimeRange           = obj => ({ type: "CHANGE_END_OF_RECURRING_TIME_RANGE", payload: obj })
export const resetSchedule                           = ()  => ({ type: "RESET_SCHEDULE" })

export const handleDeleteScheduleClicked            = obj => ({ type: "HANDLE_DELETE_SCHEDULE_CLICKED", payload: obj})
export const handleDeleteScheduleCancel           = () => ({ type: "HANDLE_DELETE_SCHEDULE_CANCEL"})

export const queueLoading                        = ()  => ({type: "QUEUE_LOADING"})

export const getQueuesFromServer                 = ()  => ({ type: "GET_QUEUES_FROM_SERVER" });
export const getQueuesFromServerSucceeded        = obj => ({ type: "GET_QUEUES_FROM_SERVER_SUCCEEDED", payload: obj });
export const getQueuesFromServerFailed           = obj => ({ type: "GET_QUEUES_FROM_SERVER_FAILED", payload: obj})

export const getQueueFromServer                  = obj => ({ type: "GET_QUEUE_FROM_SERVER", payload: obj });
export const getQueueFromServerSucceeded         = obj => ({ type: "GET_QUEUE_FROM_SERVER_SUCCEEDED", payload: obj });
export const getQueueFromServerFailed            = obj => ({ type: "GET_QUEUE_FROM_SERVER_FAILED", payload: obj });

export const submitUpdateQueueToServer           = obj => ({ type: "SUBMIT_UPDATE_QUEUE_TO_SERVER", payload: obj });
export const submitUpdateQueueToServerSucceeded  = obj => ({ type: "SUBMIT_UPDATE_QUEUE_TO_SERVER_SUCCEEDED", payload: obj });
export const submitUpdateQueueToServerFailed     = obj => ({ type: "SUBMIT_UPDATE_QUEUE_TO_SERVER_FAILED", payload: obj });

export const submitNewQueueToServer              = obj => ({ type: "SUBMIT_NEW_QUEUE_TO_SERVER", payload: obj });
export const submitNewQueueToServerSucceeded     = obj => ({ type: "SUBMIT_NEW_QUEUE_TO_SERVER_SUCCEEDED", payload: obj });
export const submitNewQueueToServerFailed        = obj => ({ type: "SUBMIT_NEW_QUEUE_TO_SERVER_FAILED", payload: obj });

export const submitDeleteQueueToServer           = obj => ({ type: "SUBMIT_DELETE_QUEUE_TO_SERVER", payload: obj });
export const submitDeleteQueueToServerSucceeded  = obj => ({ type: "SUBMIT_DELETE_QUEUE_TO_SERVER_SUCCEEDED", payload:obj });
export const submitDeleteQueueToServerFailed     = obj => ({ type: "SUBMIT_DELETE_QUEUE_TO_SERVER_FAILED", payload:obj });

export const changeQueue                         = obj => ({ type: "CHANGE_QUEUE", payload: obj });

export const resetQueueState                     = ()  => ({type: "RESET_QUEUE_STATE"})

export const submitOptionalPromptsToggle         = obj => ({type: "SUBMIT_OPTIONAL_PROMPTS_TOGGLE", payload: obj}) 
export const submitOptionalPromptsToggleFailed         = obj => ({type: "SUBMIT_OPTIONAL_PROMPTS_TOGGLE_FAILED", payload: obj}) 
export const submitOptionalPromptsToggleToServerSucceeded      = obj => ({type: "SUBMIT_OPTIONAL_PROMPTS_TOGGLE_TO_SERVER_SUCCEEDED", payload: obj}) 
export const submitOptionalPromptsToggleToServerFailed      = obj => ({type: "SUBMIT_OPTIONAL_PROMPTS_TOGGLE_TO_SERVER_FAILED", payload: obj}) 

export const handleDeleteQueueClicked            = obj => ({ type: "HANDLE_DELETE_QUEUE_CLICKED", payload: obj})
export const handleDeleteProceed                 = () =>  ({ type: "HANDLE_DELETE_PROCEED"})
export const handleDeleteQueueCancel                  = () =>  ({ type: "HANDLE_DELETE_CANCEL"})


export const resetHolidayListState                      = () => ({type: "RESET_HOLIDAY_LIST_STATE"}) 

export const holidayListsLoading                        = () => ({type: "HOLIDAY_LISTS_LOADING"})
export const holidayListLoading                         = () => ({type: "HOLIDAY_LIST_LOADING"})

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

export const handleDeleteHolidayListClicked      = obj => ({type: "HANDLE_DELETE_HOLIDAY_LIST_CLICKED", payload: obj });
export const handleDeleteHolidayListCancel     = obj => ({type: "HANDLE_DELETE_HOLIDAY_LIST_CANCEL", payload: obj });




export const handleCloseMessage = ()  => ({type: "HANDLE_CLOSE_MESSAGE"})

// PROMPTS
export const getPromptsFromServer = () => ({type: "GET_PROMPTS_FROM_SERVER" })
export const getPromptFromServer = obj => ({type: "GET_PROMPT_FROM_SERVER", payload: obj})
export const getPromptsWithQueueIdFromServer = obj => ({type: "GET_PROMPTS_WITH_QUEUE_ID", payload: obj})
export const submitUpdatePromptToServer = obj => ({type: "SUBMIT_UPDATE_PROMPT_TO_SERVER", payload: obj})
export const submitDeletePromptToServer = obj => ({type: "SUBMIT_DELETE_PROMPT_TO_SERVER", payload: obj})
export const updateTargetFile = obj => ({type: "UPDATE_TARGET_FILE", payload: obj})
export const submitNewOfficePromptsToServer = obj => ({type: "SUBMIT_NEW_OFFICE_PROMPTS_TO_SERVER", payload: obj})
export const submitClearPromptToServer = obj => ({type: "SUBMIT_CLEAR_PROMPT_TO_SERVER", payload: obj})
export const submitDeletePromptRowsToServer = obj => ({type: "SUBMIT_DELETE_PROMPT_ROWS_TO_SERVER", payload: obj})
export const resetPrompts = () => ({type: "RESET_PROMPTS"})

// LCSAS

export const getLcsasFromServer = () => ({type: "GET_LCSAS_FROM_SERVER" });
export const getLcsaFromServer = (obj) => ({type: "GET_LCSA_FROM_SERVER", payload: obj });
export const submitNewLcsaToServer = (obj) => ({type: "SUBMIT_NEW_LCSA_TO_SERVER", payload: obj });
export const submitUpdateLcsaToServer = (obj) => ({type: "SUBMIT_UPDATE_LCSA_TO_SERVER", payload: obj });
export const changeLcsa = (obj) => ({type: "CHANGE_LCSA", payload: obj });
export const handleResetLcsa = () => ({type: "HANDLE_RESET_LCSA"});
export const handleToggleLcsaBcpActiveClicked = (obj) => ({type: "HANDLE_TOGGLE_LCSA_BCP_ACTIVE_CLICKED", payload: obj});
export const handleToggleLcsaBcpActiveCancel = (obj) => ({type: "HANDLE_TOGGLE_LCSA_BCP_ACTIVE_CANCEL"});
export const handleDeleteLcsaClicked = (obj) => ({type: "HANDLE_DELETE_LCSA_CLICKED", payload: obj});
export const handleDeleteLcsaCancel = () =>  ({ type: "HANDLE_DELETE_LCSA_CANCEL"})
export const submitDeleteLcsaToServer = (obj) => ({type: "SUBMIT_DELETE_LCSA_TO_SERVER", payload: obj});
export const submitLcsaToggle = (obj) => ({type: "SUBMIT_LCSA_TOGGLE", payload: obj});