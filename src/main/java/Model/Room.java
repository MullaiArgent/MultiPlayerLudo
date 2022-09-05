package Model;

import org.json.simple.JsonObject;

import javax.websocket.Session;
import java.util.HashMap;

public class Room {
    private final String roomOwnerId;
    private final HashMap<String, Session> roomMates = new HashMap<>();
    private boolean isPlaying = false;
    private String gameState = "{\n" +
            "    red : {\n" +
            "        player : \"player1\",\n" +
            "        pos : {\n" +
            "            coinOne   : \"red-home1\",\n" +
            "            coinTwo   : \"red-home2\",\n" +
            "            coinThree : \"red-home3\",\n" +
            "            coinFour  : \"red-home4\",\n" +
            "        }\n" +
            "    }, green : {\n" +
            "        player : \"player2\",\n" +
            "        pos : {\n" +
            "            coinOne   : \"green-home1\",\n" +
            "            coinTwo   : \"green-home2\",\n" +
            "            coinThree : \"green-home3\",\n" +
            "            coinFour  : \"green-home4\",\n" +
            "        }\n" +
            "\n" +
            "    }, blue : {\n" +
            "        player : \"player3\",\n" +
            "        pos : {\n" +
            "            coinOne   : \"blue-home1\",\n" +
            "            coinTwo   : \"blue-home2\",\n" +
            "            coinThree : \"blue-home3\",\n" +
            "            coinFour  : \"blue-home4\",\n" +
            "        }\n" +
            "\n" +
            "    }, yellow : {\n" +
            "        player : \"player4\",\n" +
            "        pos : {\n" +
            "            coinOne   : \"yellow-home1\",\n" +
            "            coinTwo   : \"yellow-home2\",\n" +
            "            coinThree : \"yellow-home3\",\n" +
            "            coinFour  : \"yellow-home4\",\n" +
            "        }\n" +
            "\n" +
            "    },\n" +
            "    turn : {\n" +
            "        player        : \"player1\",\n" +
            "        playerState   : \"toRoll\", \n" +
            "        gotTheTurnBy  : \"\",       \n" +
            "        diceOutCome   : \"4\"\n" +
            "    }\n" +
            "\n" +
            "}";

    public Room(String roomOwner) {
        this.roomOwnerId = roomOwner;
    }
    public String getRoomOwnerId() {
        return roomOwnerId;
    }
    public Session getRoomOwnerSession() {
        return roomMates.get(roomOwnerId);
    }
    public HashMap<String, Session> getRoomMates() {
        return roomMates;
    }
    public void addARoomMate(String roomMateId, Session session){
        roomMates.put(roomMateId, session);
    }
    public void removeARoomMate(String roomMate){
        roomMates.remove(roomMate);
    }
    public boolean isPlaying() {
        return isPlaying;
    }
    public void setPlaying(boolean playing) {
        isPlaying = playing;
    }
    public String getGameState() {
        return gameState;
    }
    public void setGameState(String gameState) {
        this.gameState = gameState;
    }
}
