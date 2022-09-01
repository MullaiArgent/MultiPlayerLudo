package websocket;

import org.json.simple.JsonObject;
import javax.enterprise.context.ApplicationScoped;
import javax.websocket.Session;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@ApplicationScoped
public class ClientPacketsHandler {
    private final Map<String, Session> clientSessions = new HashMap<>();
    private final Map<Integer, Session> roomIds = new HashMap<>();

    public void addAClientSession(Session session, String userId){
        clientSessions.put(userId, session);
        JsonObject jsonPacket = new JsonObject();
        jsonPacket.put("action", "userId");
        jsonPacket.put("myUserId", userId);
        sendToSession(session, jsonPacket);
        System.out.println("LOG : A Client have joined the Server");
    }
    public void removeClientSession(Session session){
        clientSessions.entrySet().removeIf(e -> session.equals(e.getValue()));      // remove the entry-set based on the values
        System.out.println("LOG : A Client has left the Application");
    }
    public void generateRoomId(Session session){
        int roomId;
        do{
            roomId = (int)(Math.random() * (8998) + 9999);
        }while (roomIds.containsKey(roomId));                 // To avoid exceptional corner case of generating two or more room Ids
        roomIds.put(roomId, session);
        JsonObject roomIdJson = new JsonObject();
        roomIdJson.put("action", "roomId");
        roomIdJson.put("roomId", String.valueOf(roomId));
        sendToSession(session, roomIdJson);
    }
    private void sendToSession(Session session, JsonObject jsonObject){
        try{
            session.getBasicRemote().sendText(jsonObject.toJson());
        }catch (IOException ioException){
            System.out.println("Log : Exception in Sending a packet to the client");
        }
    }
    public void joinARoom(Session session, int roomId, String userId){
        if (roomIds.containsKey(roomId)){
            JsonObject jsonPacket = new JsonObject();
            jsonPacket.put("action", "joinRoom");
            jsonPacket.put("roomMateId", userId);
            sendToSession(roomIds.get(roomId), jsonPacket);
        }else{
            // TODO send invalid rood id
        }
    }
}
