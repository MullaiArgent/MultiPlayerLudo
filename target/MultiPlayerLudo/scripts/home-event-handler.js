const socket = new WebSocket("ws://localhost:8080/MultiPlayerLudo_war/actions");

socket.onmessage = onMessage;
let myUserId;
let roomId;
function onMessage(event){
    const packet = JSON.parse(event.data);
    console.log(packet);
    if(packet.action === "userId"){
        myUserId = packet.myUserId;
        console.log(myUserId)
    }
    else if (packet.action === "roomId"){
        const popHeader = document.getElementById("pop-h3");
        popHeader.innerText = "Room Id is : " + packet.roomId;/* + "<a onclick=\"startGame()\" id=\"start-gamebtn\">Start</a>";*/
        const startGameButton = document.createElement("a");
        startGameButton.innerHTML = "StartGame";
        startGameButton.id = "start-game-btn";
        startGameButton.onclick = function (){
            startGame();
        }
        roomId = packet.roomId;
        document.getElementById("close-btn").setAttribute("onclick", "closePopUp(\"terminateRoom\")");
    }
    else if(packet.action === "newRoomMate"){
        const roomMate = document.createElement("p");
        roomMate.setAttribute("id", "pop-p-" + packet.roomMateId);
        roomMate.innerHTML = packet.roomMateId + " has joined the Room";
        const popupContent = document.getElementById("popup-content");
        popupContent.appendChild(roomMate);
    }
    else if(packet.action === "roomMateLeft"){
        document.getElementById("pop-p-" + packet.roomMateId).remove();
    }
    else if(packet.action === "roomTerminated"){
        const ptags = document.getElementsByTagName("p");
        while (ptags[0]){
            ptags[0].parentNode.removeChild(ptags[0]);
        }
        roomId = null;
        document.getElementById("close-btn").removeAttribute("onclick");
        document.getElementById("pop-h3").innerText = "Room Terminated by " + packet.roomOwnerId;
    }
    else if(packet.action === "invalidAttemptToJoinRoom"){
        document.getElementById("pop-h3").innerText = "Invalid Room ID";
    }
    else if(packet.action === "validAttemptToJoinRoom"){
        document.getElementById("pop-h3").innerText = "Joined the Room";
        const roomMate = document.createElement("p");
        roomMate.innerHTML = "Awaiting " + packet.roomOwnerId + " to start the game";
        const popupContent = document.getElementById("popup-content");
        popupContent.appendChild(roomMate);
        document.getElementById("close-btn").setAttribute("onclick", "closePopUp(\"leaveRoom\");");
    }
    else if (packet.action === "startGame"){
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                const data = xhr.responseText;
                alert(data);
            }
        }
        xhr.open('GET', '${pageContext.request.contextPath}/app', true);
        xhr.send(null);
    }
}
function createARoom(){
    socket.send(JSON.stringify({
        action : "createARoom",
        ownerId : myUserId
    }));
}
function joinRoom(){
    roomId =  document.getElementById("roomId").value;
    if (roomId !== null){
        console.log(roomId);
        socket.send(JSON.stringify({
            action : "joinRoom",
            userId : myUserId,
            roomId : roomId
        }));
    }
}
function closePopUp(action){
    console.log("close called" + action)
    socket.send(JSON.stringify({
        action : action,
        userId : myUserId,
        roomId : roomId
    }));
    document.getElementById("pop-h3").innerText = null;
    const ptags = document.getElementsByTagName("p");
    while (ptags[0]){
        ptags[0].parentNode.removeChild(ptags[0]);
    }
    roomId = null;
    document.getElementById("close-btn").removeAttribute("onclick");
}
function startGame(){
    socket.send(JSON.stringify({
        action : "startGame",
        roomId : roomId,
        userId : myUserId
    }));
}
function test(){
    console.log("test is called");
}
