<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title></title>
</head>
<body>
<%
session.invalidate();
session.setMaxInactiveInterval(0);

response.sendRedirect("/MultiPlayerLudo_war/auth/home");
%>
</body>
</html>
