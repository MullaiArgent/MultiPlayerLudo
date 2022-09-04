package websocket;

import Model.Room;
import org.json.simple.JsonObject;
import javax.enterprise.context.ApplicationScoped;
import javax.websocket.Session;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@ApplicationScoped
public class ClientPacketsHandler {
    private static final Map<String, Session> clientSessions = new HashMap<>();
    private static final Map<Integer, Room> rooms = new HashMap<>();

    private void sendToSession(Session session, JsonObject jsonObject){
        try{
            session.getBasicRemote().sendText(jsonObject.toJson());
        }catch (IOException ioException){
            System.out.println("Log : Exception in Sending a packet to the client");
        }
    }
    public void addAClientSession(Session session, String userId){
        clientSessions.put(userId, session);
        JsonObject jsonPacket = new JsonObject();
        jsonPacket.put("action", "userId");
        jsonPacket.put("myUserId", userId);
        sendToSession(session, jsonPacket);

        System.out.println("LOG : A Client have joined the Server");
    }
    public void addAClientSession(Session session, String userId, int roomId){
        clientSessions.put(userId, session);
        JsonObject jsonPacket = new JsonObject();
        jsonPacket.put("action", "userId");
        jsonPacket.put("myUserId", userId);
        jsonPacket.put("roomId", roomId);
        sendToSession(session, jsonPacket);

        System.out.println("LOG : A Client have joined the Server");
    }
    public void removeClientSession(Session session){
        clientSessions.entrySet().removeIf(e -> session.equals(e.getValue()));      // remove the entry-set based on the values
        System.out.println("LOG : A Client has left the Application");
    }
    public void generateRoomId(Session session, String ownerId){
        int roomId;
        do{
            roomId = (int)(Math.random() * (8998) + 9999);
        }while (rooms.containsKey(roomId));                 // To avoid exceptional corner case of generating two or more room Ids
        Room room = new Room(ownerId);
        room.addARoomMate(ownerId, session);
        rooms.put(roomId, room);

        JsonObject roomIdJson = new JsonObject();
        roomIdJson.put("action", "roomId");
        roomIdJson.put("roomId", String.valueOf(roomId));
        sendToSession(session, roomIdJson);
    }
    public void joinARoom(Session session, int roomId, String userId){
        JsonObject jsonPacket = new JsonObject();
        if (rooms.containsKey(roomId)){
            Room room = rooms.get(roomId);
            if (!room.isPlaying()) {
                jsonPacket.put("action", "newRoomMate");
                jsonPacket.put("roomMateId", userId);
                sendToSession(room.getRoomOwnerSession(), jsonPacket);               // to the owner
                jsonPacket.clear();
                jsonPacket.put("action", "validAttemptToJoinRoom");
                jsonPacket.put("roomOwnerId", room.getRoomOwnerId());
                sendToSession(session, jsonPacket);                                  // to the joiner
                room.getRoomMates().put(userId, session);
                return;
            }
        }
        jsonPacket.put("action", "invalidAttemptToJoinRoom");
        sendToSession(session, jsonPacket);
    }
    public void leaveRoom(int roomId, String userId){
        Room room = rooms.get(roomId);
        room.removeARoomMate(userId);
        JsonObject jsonPacket = new JsonObject();
        jsonPacket.put("action", "roomMateLeft");
        jsonPacket.put("roomMateId", userId);
        sendToSession(room.getRoomOwnerSession(), jsonPacket);
    }
    public void terminateRoom(int roomId, String userId){
        Room room = rooms.get(roomId);
        JsonObject jsonPacket = new JsonObject();
        jsonPacket.put("action", "roomTerminated");
        jsonPacket.put("roomOwnerId", room.getRoomOwnerId());
        room
                .getRoomMates()
                .forEach((roomMateId, session) -> {
                    if (!userId.equals(roomMateId)) {
                        sendToSession(session, jsonPacket);
                    }
                });
        rooms.remove(roomId);
    }
    public void startGame(int roomId){
        Room room = rooms.get(roomId);
        JsonObject jsonPacket = new JsonObject();
        jsonPacket.put("action", "startGame");
        room
                .getRoomMates()
                .forEach((roomMateId, session) -> sendToSession(session, jsonPacket));
        room.setPlaying(true);
    }
}
