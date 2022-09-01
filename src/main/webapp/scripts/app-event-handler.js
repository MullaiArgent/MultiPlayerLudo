const socket = new WebSocket("ws://localhost:8080/MultiPlayerLudo_war/actions");

socket.onmessage = onMessage;

function onMessage(event){
    console.log(event.data)
}
