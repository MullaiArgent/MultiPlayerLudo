const socket = new WebSocket("ws://localhost:8080/MultiPlayerLudo_war/actions");

socket.onmessage = onMessage;
let myUserId;
let roomId;
function onMessage(event){
    document.getElementsByTagName("p").length
    const packet = JSON.parse(event.data);
    console.log(packet);
    if      (packet.action === "userId"){
        myUserId = packet.myUserId;
        console.log(myUserId)
    }
    else if (packet.action === "roomId"){
        const popHeader = document.getElementById("pop-h3");
        popHeader.innerText = "Room Id is : " + packet.roomId;
        const startGameButton = document.createElement("a");
        startGameButton.innerHTML = "StartGame";
        startGameButton.id = "start-game-btn";
        startGameButton.onclick = function (){
            startGame();
        }
        startGameButton.hidden = true;
        popHeader.append(startGameButton)
        roomId = packet.roomId;
        document.getElementById("close-btn").setAttribute("onclick", "closePopUp(\"terminateRoom\")");
    }
    else if (packet.action === "newRoomMate"){
        const roomMate = document.createElement("p");
        roomMate.setAttribute("id", "pop-p-" + packet.roomMateId);
        roomMate.innerHTML = packet.roomMateId + " has joined the Room";
        const popupContent = document.getElementById("popup-content");
        if (document.getElementsByTagName("p").length >= 0){
            document.getElementById("start-game-btn").hidden = false;
        }
        popupContent.appendChild(roomMate);
    }
    else if (packet.action === "roomMateLeft"){
        document.getElementById("pop-p-" + packet.roomMateId).remove();
        if (document.getElementsByTagName("p").length === 0){
            document.getElementById("start-game-btn").hidden = true;
        }
    }
    else if (packet.action === "roomTerminated"){
        const ptags = document.getElementsByTagName("p");
        while (ptags[0]){
            ptags[0].parentNode.removeChild(ptags[0]);
        }
        roomId = null;
        document.getElementById("close-btn").removeAttribute("onclick");
        document.getElementById("pop-h3").innerText = "Room Terminated by " + packet.roomOwnerId;
    }
    else if (packet.action === "invalidAttemptToJoinRoom"){
        document.getElementById("pop-h3").innerText = "Invalid Room ID";
    }
    else if (packet.action === "validAttemptToJoinRoom"){
        document.getElementById("pop-h3").innerText = "Joined the Room";
        const roomMate = document.createElement("p");
        roomMate.innerHTML = "Awaiting " + packet.roomOwnerId + " to start the game";
        const popupContent = document.getElementById("popup-content");
        popupContent.appendChild(roomMate);
        document.getElementById("close-btn").setAttribute("onclick", "closePopUp(\"leaveRoom\");");
    }
    else if (packet.action === "startGame"){
        // let XmlHttp;
        // if (window.XMLHttpRequest){  // code for IE7+, Firefox, Chrome, Opera, Safari
        //     XmlHttp = new XMLHttpRequest();
        // }else{                       // for older versions of IE
        //     XmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        // }
        // XmlHttp.onreadystatechange = function (){
        //     if (XmlHttp.readyState === 4 && XmlHttp.status === 200){
        //         document.getElementById("page").innerHTML = null;
        //         document.getElementById("page").innerHTML = XmlHttp.responseText
        //     }
        // }
        // XmlHttp.open("GET","/MultiPlayerLudo_war/auth/app", true);
        // XmlHttp.send();

        const appHref = document.createElement("form");
        appHref.setAttribute("action", "app");
        appHref.setAttribute("method", "POST");
        const param = document.createElement("input")
        param.setAttribute("name", "roomId");
        param.setAttribute("value", roomId);
        appHref.appendChild(param);
        document.body.appendChild(appHref);
        appHref.submit();

        // location.href='/MultiPlayerLudo_war/auth/app?roomId=' + roomId;
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
