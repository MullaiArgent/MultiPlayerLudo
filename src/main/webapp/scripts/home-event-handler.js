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
        // TODO Terminate room onclick
        document.getElementById("close-btn").setAttribute("onclick", "terminateRoom()");
    }else if(packet.action === "newRoomMate"){
        const roomMate = document.createElement("p");
        roomMate.innerHTML = packet.roomMateId + "has joined the Room";
        const popupContent = document.getElementsByClassName("popup-content");
        popupContent.appendChild(roomMate);
    }else if(packet.action === "invalidAttemptToJoinRoom"){
        document.getElementById("pop-h3").innerText = "Invalid Room ID";
    }
    else if(packet.action === "validAttemptToJoinRoom"){
        document.getElementById("pop-h3").innerText = "Room Id is : " + packet.roomId;
        document.getElementById("close-btn").setAttribute("onclick", "terminateRoom()");
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
        myUserId : myUserId,
        roomId : document.getElementById("roomId").value
    }));
}
function terminateRoom(){
    // TODO ping all the connected room mates that the room is terminated by the owner or remove the from tje room
    document.getElementById("close-btn").removeAttribute("onclick");
}
function test(){
    console.log("test data")
}
