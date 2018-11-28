// Schedules
export async function postSchedules(payload) {
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

export async function putSchedules(payload) {
  try {
    let response = await fetch(`/api/Schedules/${payload.id}`, {
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

export async function deleteSchedules(payload) {
  try {
    let response = await fetch(`/api/Schedules/${payload}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      }
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.log(error)
  }
}

