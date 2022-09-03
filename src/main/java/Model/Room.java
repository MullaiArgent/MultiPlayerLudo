package Model;

import javax.websocket.Session;
import java.util.HashMap;

public class Room {
    private final String roomOwnerId;
    private final HashMap<String, Session> roomMates = new HashMap<>();
    private boolean isPlaying = false;

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
}
