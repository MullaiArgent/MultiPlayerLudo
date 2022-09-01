package websocket;

import javax.servlet.http.HttpSession;
import javax.websocket.HandshakeResponse;
import javax.websocket.server.HandshakeRequest;
import javax.websocket.server.ServerEndpointConfig;

public class HttpSessionConfigurer extends ServerEndpointConfig.Configurator {
    @Override
    public void modifyHandshake(ServerEndpointConfig serverEndpointConfig,
                                HandshakeRequest request,
                                HandshakeResponse response) {
        HttpSession httpSession = (HttpSession) request.getHttpSession();
        serverEndpointConfig.getUserProperties().put(HttpSession.class.getName(), httpSession);
    }
}
