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
  console.log('Submitting New Holiday List to Server', JSON.stringify(payload))
  try {
    let response = await fetch('/api/holidayLists/createWithHolidays', {
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
  let filter = JSON.stringify({include:' holidays'})
  try {
    let response = await fetch('/api/HolidayLists', {
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

export async function getHolidayList(payload) {
  console.log('Getting holiday list', payload.id)
  try {
    let response = await fetch('/api/HolidayLists/' + payload.id + '?filter=%7B%22include%22%3A%22holidays%22%7D', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.log('Failed to get holidayList', payload.id)
    console.log(error)
    return {error: "error"}
  }
}

export async function submitUpdateHolidayListToServer(payload) {
  console.log('Getting holiday lists', payload)
  try {
    let response = await fetch('/api/HolidayLists/' + payload.id + '/updateWithHolidays', {
      method: 'PUT',
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