export async function submitQueueToServer(payload) {
  try {
    let response = await fetch('/api/Queues', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.log(error)
  }
}

export async function submitUpdateQueueToServer(payload) {
  try {
    let response = await fetch(`/api/Queues/${payload.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload.data)
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.log(error)
  }
}

export async function submitScheduleToServer(payload) {
  try {
    let response = await fetch('/api/Schedules', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.log(error)
  }
}

export async function submitNewHolidayListToServer(payload) {
  console.log('Submitting New Holiday List to Server', payload)
  try {
    let response = await fetch('/api/holiday_lists', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.log('Failed to submit holidays to server', error)
  }
}

export async function getAllQueues() {
  try {
    let response = await fetch('/api/Queues/getAll', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.log(error)
  }
}

export async function getSchedules() {
  try {
    let response = await fetch('/api/schedules', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.log(error)
  }

}

export async function getAllHolidayLists() {
  console.log('Getting all holiday lists')
  // try {
  //   let response = await fetch('/api/HolidayGroups/getAll', {
  //     method: 'GET',
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //   });
  //   let responseJson = await response.json()
  //   return responseJson
  // } catch (error) {
  //   console.log(error)
  // }
  return {
    holidayLists: [
      {
        name: "standard",
        holidays: [{type: "HOLIDAY", name: "halloween"}]
      }
    ]
  }
}