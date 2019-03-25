export const socket = null;

export function joinRoom(room) {
  socket.emit("join_room", {
    session_id: room
  });
}

export function closeRoom(room) {
  socket.emit("close_room", {
    session_id: room
  });
}

export const sessionStatus = {
  INITIALIZED: "INITIALIZED",
  STARTED: "STARTED",
  GOT_PUB_KEY: "GOT_PUB_KEY",
  GOT_ENCR_DATA: "GOT_ENCR_DATA",
  FINALIZED: "FINALIZED"
};
