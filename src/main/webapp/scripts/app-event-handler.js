let socket = new WebSocket("ws://localhost:8080/MultiPlayerLudo_war/actions");

let myUserId = "player1Name";
let myRoomId;
let gameState;
// let gameState = {
//     'red' : {
//             'playerUserId' : 'player1Name',
//             'pos' : {
//                 'coinOne'   : '#red-home1',
//                 'coinTwo'   : '#red-home2',
//                 'coinThree' : '#red-home3',
//                 'coinFour'  : '#red-home4',
//         }
//     },
//     'blue' : {
//         'playerUserId' : 'player2Name',
//         'pos' : {
//              'coinOne'   : '#blue-home1',
//             'coinTwo'   : '#blue-home2',
//             'coinThree' : '#blue-home3',
//             'coinFour'  : '#blue-home4',
//     }
//
//     },
//     'green' : {
//         'playerUserId' : 'player3Name',
//         'pos' : {
//             'coinOne'   : '#green-home1',
//             'coinTwo'   : '#green-home2',
//             'coinThree' : '#green-home3',
//             'coinFour'  : '#green-home4',
//     }
//
// }, 'yellow' : {
//     'playerUserId' : 'player4Name',
//         'pos' : {
//         'coinOne'   : '#yellow-home1',
//             'coinTwo'   : '#yellow-home2',
//             'coinThree' : '#yellow-home3',
//             'coinFour'  : '#yellow-home4',
//     }
//
// },
//     'turn' : {
//             'player'        : '.player1',
//             'playerState'   : 'toMove',
//             'gotTheTurnBy'  : '1662496916',
//             'diceOutCome'   : 4,
//             'diceId'        : 'dot1'
//     }
// };
function doStart(){
       console.log(Math.round(new Date().getTime() / 1000));
       const remaining = Math.round(new Date().getTime() / 1000) - parseInt(gameState.turn.gotTheTurnBy);
       const timeTag = $("#time");
       timeTag.html(remaining); // #fo the certain player
       const refreshIntervalId = setInterval(function () {
           timeTag.html(parseInt($(this).text()) + 1);
           if (parseInt($(this).text()) > 50) {
               $("#time").html("");
               stop();
           }
       }, 1000);

       function stop() {
           clearInterval(refreshIntervalId);
       }

       if (gameState.turn.playerState === "toRoll") {

       } else if (gameState.turn.playerState === "toMove") {
           console.log(gameState.turn.diceId, gameState.turn.diceOutCome);
           drawDice(gameState.turn.diceId, gameState.turn.diceOutCome);
       }
       $(gameState.turn.player).css("border", "2px solid red");
       $("#player1UserId").html(gameState.red.playerUserId);
       $("#player2UserId").html(gameState.blue.playerUserId);
       $("#player3UserId").html(gameState.green.playerUserId);
       $("#player4UserId").html(gameState.yellow.playerUserId);
       if (myUserId === gameState.red.playerUserId) {
           $(".player1").append("<button class=\"nice-button\" onclick=\"roll('dot1')\">Roll Dice</button>");
       } else if (myUserId === gameState.blue.playerUserId) {
           $(".player2").append("<button class=\"nice-button\" onclick=\"roll('dot2')\">Roll Dice</button>");
       } else if (myUserId === gameState.green.playerUserId) {
           $(".player3").append("<button class=\"nice-button\" onclick=\"roll('dot3')\">Roll Dice</button>");
       } else if (myUserId === gameState.yellow.playerUserId) {
           $(".player4").append("<button class=\"nice-button\" onclick=\"roll('dot4')\">Roll Dice</button>");
       }
       try{
           $(gameState.red.pos.coinOne).append("<i class='fa-solid fa-chess-pawn' style='color: red; text-shadow: 0 0 3px #000;'></i>");
           $(gameState.red.pos.coinTwo).append("<i class='fa-solid fa-chess-pawn' style='color: red; text-shadow: 0 0 3px #000;'></i>");
           $(gameState.red.pos.coinThree).append("<i class='fa-solid fa-chess-pawn' style='color: red; text-shadow: 0 0 3px #000;'></i>");
           $(gameState.red.pos.coinFour).append("<i class='fa-solid fa-chess-pawn' style='color: red; text-shadow: 0 0 3px #000;'></i>");
        }catch (e){
            console.log("no red data")
        }
       try {
           $(gameState.green.pos.coinOne).append("<i class='fa-solid fa-chess-pawn' style='color: green; text-shadow: 0 0 3px #000;'></i>");
           $(gameState.green.pos.coinTwo).append("<i class='fa-solid fa-chess-pawn' style='color: green; text-shadow: 0 0 3px #000;'></i>");
           $(gameState.green.pos.coinThree).append("<i class='fa-solid fa-chess-pawn' style='color: green; text-shadow: 0 0 3px #000;'></i>");
           $(gameState.green.pos.coinFour).append("<i class='fa-solid fa-chess-pawn' style='color: green; text-shadow: 0 0 3px #000;'></i>");
       }catch (e){
           console.log("no green  datas")
       }
       try{
           $(gameState.blue.pos.coinOne).append("<i class='fa-solid fa-chess-pawn' style='color: blue; text-shadow: 0 0 3px #000;'></i>");
           $(gameState.blue.pos.coinTwo).append("<i class='fa-solid fa-chess-pawn' style='color: blue; text-shadow: 0 0 3px #000;'></i>");
           $(gameState.blue.pos.coinThree).append("<i class='fa-solid fa-chess-pawn' style='color: blue; text-shadow: 0 0 3px #000;'></i>");
           $(gameState.blue.pos.coinFour).append("<i class='fa-solid fa-chess-pawn' style='color: blue; text-shadow: 0 0 3px #000;'></i>");
       }catch (e){
           console.log("no blue data")
       }
       try{
           $(gameState.yellow.pos.coinOne).append("<i class='fa-solid fa-chess-pawn' style='color: yellow; text-shadow: 0 0 3px #000;'></i>");
           $(gameState.yellow.pos.coinTwo).append("<i class='fa-solid fa-chess-pawn' style='color: yellow; text-shadow: 0 0 3px #000;'></i>");
           $(gameState.yellow.pos.coinThree).append("<i class='fa-solid fa-chess-pawn' style='color: yellow; text-shadow: 0 0 3px #000;'></i>");
           $(gameState.yellow.pos.coinFour).append("<i class='fa-solid fa-chess-pawn' style='color: yellow; text-shadow: 0 0 3px #000;'></i>");
       }catch (e){
           console.log("no yellow data")
       }


}
socket.onmessage = onMessage;

let packet;
function onMessage(event){
    packet = JSON.parse(event.data);
    console.log(packet)
    if (packet.action === "userId"){
        myUserId = packet.myUserId;
        myRoomId = packet.myRoomId;
        gameState = packet.gameState;
        doStart();
    }
    else if (packet.action === "drawADice"){
        drawDice(packet.dotParam, packet.diceOutput);
    }
}
function makeAMove(target, source){
    const wrapper = source.contents().wrap($('<div>').css('position', 'absolute')).parent();
    wrapper.animate(
        {
            top : target.position().top,
            left : target.position().left
        }
        , 1000, function() {
        source.contents().appendTo(target);
        source.remove;
    });
    // TODO remove the postion abs tga <div> in the target
    return true;
}
function roll(dotParam){
    socket.send(JSON.stringify({
        action : "rollADice",
        roomId : myRoomId,
        dotParam : dotParam
    }));
}

/*
* https://jsfiddle.net/TuuvF/1/
* */
