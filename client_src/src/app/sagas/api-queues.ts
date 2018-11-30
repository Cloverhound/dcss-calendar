export async function createQueue(payload) {
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

export async function updateQueue(payload) {
  console.log('updating queue', payload)
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
    return {error}
  }
}

export async function getQueue(id) {
  console.log('Getting queue -- ' + id)
  try {
    let response = await fetch('/api/Queues/' + id, {
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