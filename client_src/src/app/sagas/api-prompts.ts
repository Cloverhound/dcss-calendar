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
    let response = await fetch(`/api/Prompts?filter[where][queueId]=${payload.id}`, {
      method: 'GET',
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.log(error)
  }
}

export async function createPrompt(payload) {
  try {
    let response = await fetch('/api/Prompts/upload', {
      method: 'POST',
      body: payload
    });
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.log(error)
  }
}