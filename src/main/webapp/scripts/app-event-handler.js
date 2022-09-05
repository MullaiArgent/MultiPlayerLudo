const socket = new WebSocket("ws://localhost:8080/MultiPlayerLudo_war/actions");

let myUserId;
let myRoomId;
let gameState = {
    red : {
        player : "player1",
        pos : {
            coinOne   : "red-home1",
            coinTwo   : "red-home2",
            coinThree : "red-home3",
            coinFour  : "red-home4",
        }
    }, green : {
        player : "player2",
        pos : {
            coinOne   : "green-home1",
            coinTwo   : "green-home2",
            coinThree : "green-home3",
            coinFour  : "green-home4",
        }

    }, blue : {
        player : "player3",
        pos : {
            coinOne   : "blue-home1",
            coinTwo   : "blue-home2",
            coinThree : "blue-home3",
            coinFour  : "blue-home4",
        }

    }, yellow : {
        player : "player4",
        pos : {
            coinOne   : "yellow-home1",
            coinTwo   : "yellow-home2",
            coinThree : "yellow-home3",
            coinFour  : "yellow-home4",
        }

    },
    turn : {
        player        : "player1",
        playerState   : "toRoll",
        gotTheTurnBy  : "",
        diceOutCome   : "4"
    }

}
socket.onmessage = onMessage;

let packet;
function onMessage(event){
    console.log(event.data);
    packet = JSON.parse(event.data);
    if     (packet.action === "userId"){
        myUserId = packet.myUserId;
        gameState = packet.gameState;

    }
}
function updateGameStateToTheServer(){
    socket.send(JSON.stringify({
        action : "gameState",
        roomId : myRoomId,
        gameState : gameState
    }));
}
