const socket = new WebSocket("ws://localhost:8080/MultiPlayerLudo_war/actions");

socket.onmessage = onMessage;
let myUserId;
function onMessage(event){
    const packet = JSON.parse(event.data);
    console.log(packet);
    if(packet.action === "userId"){
        myUserId = packet.myUserId;
        console.log(myUserId)
    }else if (packet.action === "roomId"){
        document.getElementById("pop-h3").innerText = "Room Id is : " + packet.roomId;
        // TODO Terminate room onclick
        document.getElementById("close-btn").setAttribute("onclick", "terminateRoom()");
    }else if(packet.action === "newRoomMate"){
        const roomMate = document.createElement("p");
        roomMate.setAttribute("id", "pop-p-" + packet.roomMateId);
        roomMate.innerHTML = packet.roomMateId + " has joined the Room";
        const popupContent = document.getElementById("popup-content");
        popupContent.appendChild(roomMate);
    }else if(packet.action === "roomMateLeft"){
        document.getElementById("pop-p-" + packet.roomMateId).remove();
    }else if(packet.action === "invalidAttemptToJoinRoom"){
        document.getElementById("pop-h3").innerText = "Invalid Room ID";
    }else if(packet.action === "validAttemptToJoinRoom"){
        document.getElementById("pop-h3").innerText = "Joined the Room";
        const roomMate = document.createElement("p");
        roomMate.innerHTML = "Awaiting " + packet.roomOwnerId + " to start the game";
        const popupContent = document.getElementById("popup-content");
        popupContent.appendChild(roomMate);
        document.getElementById("close-btn").setAttribute("onclick", "leaveRoom()");
    }
}
function createARoom(){
    socket.send(JSON.stringify({
        action : "createARoom",
        ownerId : myUserId
    }));
}
function joinRoom(){
    const roomId =  document.getElementById("roomId").value;
    if (roomId !== null){
        console.log(roomId);
        socket.send(JSON.stringify({
            action : "joinRoom",
            userId : myUserId,
            roomId : roomId
        }));
    }
}
function terminateRoom(){
    // TODO let know the joiners that the room is ended
    document.getElementById("close-btn").removeAttribute("onclick");
}
function leaveRoom(){
    socket.send(JSON.stringify({
        action : "leaveRoom",
        userId : myUserId
    }));
    document.getElementById("close-btn").removeAttribute("onclick");
}
function test(){
    console.log("test is called")
}
