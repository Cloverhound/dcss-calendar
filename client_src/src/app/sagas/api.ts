export async function postQueues(payload) {
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

export async function patchQueues(payload) {
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

export async function getQueues() {
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

export async function deleteQueue(payload) {
  console.log('Deleting queue -- ', payload)
  try {
    let response = await fetch(`/api/Queues/${payload}`, {
      method: 'DELETE',
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

