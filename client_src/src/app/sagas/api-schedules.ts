// Schedules
export async function createSchedule(payload) {
  try {
    let response = await fetch('/api/Schedules/createWithTimeRanges', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    return {error}
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
    return {error}
  }
}

export async function getSchedule(payload) {
  console.log('Getting schedule -- ', payload.id)
  try {
    let response = await fetch('/api/schedules/' + payload.id + '?filter=%7B%22include%22%3A%5B%22recurringTimeRanges%22%2C%20%22singleDateTimeRanges%22%5D%7D', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    let responseJson = await response.json()
    console.log('Response json', responseJson)
    return responseJson
  } catch (error) {
    return {error}
  }
}

export async function updateSchedule(payload) {
  try {
    let response = await fetch(`/api/Schedules/${payload.id}/updateWithTimeRanges`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    return {error}
  }
}

export async function deleteSchedule(payload) {
  try {
    let response = await fetch(`/api/Schedules/${payload}/deleteWithTimeRanges`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      }
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    return {error}
  }
}

