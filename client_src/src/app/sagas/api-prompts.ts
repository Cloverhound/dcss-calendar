export async function getPrompts() {
  try {
    let response = await fetch('/api/Prompts', {
      method: 'GET',
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
  console.log("api create payload", payload)
  try {
    let response = await fetch(`/api/Prompts/${payload.queueId}/createPrompts`, {
      method: 'GET'
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.log(error)
  }
}