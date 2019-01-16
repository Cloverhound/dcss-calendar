export async function getPrompts() {
  try {
    let response = await fetch('/api/Prompts', {
      method: 'GET',
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      }
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.log(error)
  }
}

export async function getPrompt(payload) {
  try {
    let response = await fetch(`/api/Prompts/${payload.id}`, {
      method: 'GET',
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      }
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.log(error)
  }
}

export async function getPromptsWithQueueId(payload) {
  try {
    let response = await fetch(`/api/Prompts?filter[where][queueId]=${payload}`, {
      method: 'GET',
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      }
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.log(error)
  }
}


export async function updatePrompt(payload) {
  try {
    let response = await fetch('/api/Prompts/upload', {
      method: 'PUT',
      body: payload
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.log(error)
  }
}

export async function deletePrompt(payload) {
  try {
    let response = await fetch(`/api/Prompts/${payload.id}/deleteFile`, {
      method: 'DELETE',
      body: payload
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.log(error)
  }
}

export async function createPrompts(payload) {
  try {
    let response = await fetch(`/api/Prompts/${payload.queueId}/createPrompts`, {
      method: 'GET',
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      }
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.log(error)
  }
}

export async function clearPrompt(payload) {
  try {
    let response = await fetch(`/api/Prompts/${payload.id}/clearPrompt`, {
      method: 'PUT'
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.log(error)
  }
}

export async function deletePromptRows(payload) {
  try {
    let response = await fetch(`/api/Prompts/deletePromptRows`, {
      method: 'DELETE',
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