package websocket;

import org.json.simple.DeserializationException;
import org.json.simple.JsonObject;
import org.json.simple.Jsoner;
import javax.enterprise.context.ApplicationScoped;
import javax.servlet.http.HttpSession;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.util.logging.Level;
import java.util.logging.Logger;

@ApplicationScoped
@ServerEndpoint(value = "/actions", configurator = HttpSessionConfigurer.class)
public class WebServerSocketEndPoint {

    ClientPacketsHandler clientPacketsHandler = new ClientPacketsHandler();

    @OnOpen
    public void onOpen(Session session, EndpointConfig config) {
        HttpSession httpSession = (HttpSession) config.getUserProperties().get(HttpSession.class.getName());
        clientPacketsHandler.addAClientSession(session, (String) httpSession.getAttribute("userId"));
    }
    @OnClose
    public void onClose(Session session){
        clientPacketsHandler.removeClientSession(session);
    }
    @OnError
    public void onError(Session session, Throwable throwable){
        Logger.getLogger(WebServerSocketEndPoint.class.getName()).log(Level.SEVERE, null, throwable);
        clientPacketsHandler.removeClientSession(session);
        throwable.printStackTrace();
    }
    @OnMessage
    public void onMessage(String packet, Session session){
        JsonObject jsonPacket = new JsonObject();
        try{
            jsonPacket = (JsonObject)Jsoner.deserialize(packet);
        }catch (DeserializationException deserializationException){
            System.out.println("Invalid incoming Json Packet");
            deserializationException.printStackTrace();
        }
        if (jsonPacket.get("action").equals("createARoom")){
            clientPacketsHandler.generateRoomId(session);
        }
        else if (jsonPacket.get("action").equals("joinRoom")){
            clientPacketsHandler.joinARoom(
                    session,
                    Integer.parseInt(String.valueOf(jsonPacket.get("roomId"))),
                    String.valueOf(jsonPacket.get("myUserId"))
            );
        }
    }

}
