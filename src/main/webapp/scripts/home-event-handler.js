const socket = new WebSocket("ws://localhost:8080/MultiPlayerLudo_war/actions");

socket.onmessage = onMessage;
let myUserId;
function onMessage(event){
    console.log("event.data");
    const packet = JSON.parse(event.data);
    if(packet.action === "userId"){
        myUserId = packet.myUserId;
    }else if (packet.action === "roomId"){
        document.getElementById("pop-h3").innerText = "Room Id is : " + packet.roomId;
    }else if(packet.action === "joinRoom"){
        const roomMate = document.createElement("p");
        roomMate.innerHTML = packet.roomMateId + "has joined the Room";
        const popupContent = document.getElementsByClassName("popup-content");
        popupContent.appendChild(roomMate);
    }
}
function createARoom(){
    socket.send(JSON.stringify({
        action : "createARoom"
    }));
}
function joinRoom(){
    socket.send(JSON.stringify({
        action : "joinRoom",
        userId : myUserId,
        roomId : document.getElementById("roomId").value
    }));
}
function terminateRoom(){

}
function test(){
    console.log("test data")
}
