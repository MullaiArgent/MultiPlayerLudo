package Model;

import org.jboss.errai.codegen.util.Str;
import org.json.simple.DeserializationException;
import org.json.simple.JsonObject;
import org.json.simple.Jsoner;

import javax.websocket.Session;
import java.util.HashMap;

public class Room {
    private final String roomOwnerId;
    private final HashMap<String, Session> roomMates = new HashMap<>();
    private final HashMap<String, String> roomMatesColor = new HashMap<>();
    private boolean isPlaying = false;
    private JsonObject gameState;
    private int turn;
    public Room(String roomOwner) {
        this.roomOwnerId = roomOwner;

    }
    public void populateTheJson(){
        JsonObject posRed = new JsonObject();
        JsonObject posBlue = new JsonObject();
        JsonObject posGreen = new JsonObject();
        JsonObject posYellow = new JsonObject();

        JsonObject red = new JsonObject();
        JsonObject blue = new JsonObject();
        JsonObject green = new JsonObject();
        JsonObject yellow = new JsonObject();

        JsonObject turn = new JsonObject();

        this.gameState = new JsonObject();

        if (roomMates.size() >= 2){
            posRed.put("coinOne", "#red-home1");
            posRed.put("coinTwo", "#red-home2");
            posRed.put("coinThree","#red-home3");
            posRed.put("coinFour", "#red-home4");

            posBlue.put("coinOne",  "#blue-home1");
            posBlue.put("coinTwo",  "#blue-home2");
            posBlue.put("coinThree","#blue-home3");
            posBlue.put("coinFour", "#blue-home4");

            red.put("playerUserId", roomMatesColor.get("red"));
            red.put("pos", posRed);

            blue.put("playerUserId", roomMatesColor.get("blue"));
            blue.put("pos", posBlue);
        }
        if (roomMates.size() >= 3){
            posGreen.put("coinOne",  "#green-home1");
            posGreen.put("coinTwo",  "#green-home2");
            posGreen.put("coinThree","#green-home3");
            posGreen.put("coinFour", "#green-home4");

            green.put("playerUserId", roomMatesColor.get("green"));
            green.put("pos", posGreen);
        }
        if (roomMates.size() >= 4){
            posYellow.put("coinOne",  "#yellow-home1");
            posYellow.put("coinTwo",  "#yellow-home2");
            posYellow.put("coinThree","#yellow-home3");
            posYellow.put("coinFour", "#yellow-home4");

            yellow.put("playerUserId", roomMatesColor.get("yellow"));
            yellow.put("pos", posYellow);

        }
        this.turn = (int) ((Math.random() * (roomMates.size() - 1)) + roomMates.size());
        turn.put("player", ".player"+this.turn);
        turn.put("playerState", "toRoll");
        turn.put("gotTheTurnBy", "1662496916");
        turn.put("diceOutCome", 4);
        turn.put("diceId", "dot1");

        gameState.put("red", red);
        gameState.put("blue", blue);
        gameState.put("green", green);
        gameState.put("yellow", yellow);
        gameState.put("turn", turn);
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
        System.out.println("LOG : new room mate "+ roomMateId);
        if (roomMatesColor.containsKey("red")){
            if (roomMatesColor.containsKey("blue")){
                if (roomMatesColor.containsKey("green")){
                    if (roomMatesColor.containsKey("yell0w")){
                        // will possibly never occur
                    }else{
                        roomMatesColor.put("yellow",roomMateId);
                    }
                }else{
                    roomMatesColor.put("green", roomMateId);
                }
            }else{
                roomMatesColor.put("blue", roomMateId);
            }
        }else{
            roomMatesColor.put("red", roomMateId);
        }
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
    public JsonObject getGameState() throws DeserializationException {
        return gameState;
    }
}
