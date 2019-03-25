const DECODE_SERVER = process.env.VUE_APP_API;

export async function get_data(path) {
  var url = DECODE_SERVER + path;
  var result = await fetch(url);
  return result;
}

export async function getSession(attribute_request, description) {
  const url = DECODE_SERVER + "init_disclosure";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      attribute_request,
      description
    })
  });
  return response.json();
}

export async function getFullSession(sessionId) {
  const url = DECODE_SERVER + "get_session";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      session_id: sessionId
    })
  });
  return response.json();
}

export async function attachPublicKey(publicKey, sessionId) {
  const url = DECODE_SERVER + "attach_public_key";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      public_key: publicKey,
      session_id: sessionId
    })
  });
  return response.json();
}

export async function getPictureUrl(username) {
  const url = DECODE_SERVER + "get_picture_url";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      username
    })
  });
  return response.json();
}

export async function getSessionStatus(sessionId) {
  const url = DECODE_SERVER + "get_session_status";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      session_id: sessionId
    })
  });
  return response.json();
}

export async function getRequest(sessionId) {
  const url = DECODE_SERVER + "get_session";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      session_id: sessionId
    })
  });
  return response.json();
}

export async function acceptRequest(sessionId, data) {
  const url = DECODE_SERVER + "accept_request";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      session_id: sessionId,
      request_response: data
    })
  });
  return response.json();
}

export async function denyRequest(sessionId) {
  const url = DECODE_SERVER + "deny_request";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      session_id: sessionId
    })
  });
  return response.json();
}

export async function createQuestion(description, question) {
  const url = DECODE_SERVER + "init_disclosure";
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      description: description,
      attribute_request: question
    })
  });
  return response.json();
}