const socket = new WebSocket("ws://localhost:8080/MultiPlayerLudo_war/actions");

socket.onmessage = onMessage;

function onMessage(event){
    console.log("event.data");
    const packet = JSON.parse(event.data);
    if (packet.action === "roomId"){
        document.getElementById("pop-h3").innerText = "Room Id is : " + packet.roomId;
    }
}
function createRoom(){
    socket.send(JSON.stringify({
        action : "createRoom"
    }));
    //document.getElementById("create-room-btn").disabled = true;
}
function joinRoom(){
    socket.send(JSON.stringify({
        action : "joinRoom",
        roomId : document.getElementById("roomId").value
    }));
}
function test(){
    console.log("test data")
}
