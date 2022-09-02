<%--
  Created by IntelliJ IDEA.
  User: mulla
  Date: 02-09-2022
  Time: 19:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
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
