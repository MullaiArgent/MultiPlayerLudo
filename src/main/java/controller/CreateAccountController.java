package controller;

import DataManager.DBUpdate;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/createAccount")
public class CreateAccountController extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        DBUpdate dbUpdate = new DBUpdate();
        dbUpdate.update("INSERT INTO public.users VALUES('"+req.getParameter("userId")+"', '"+ req.getParameter("password")+"');\n" +
                              "INSERT INTO public.users_roles VALUES('"+req.getParameter("userId")+"', 'user');");
        resp.sendRedirect("/MultiPlayerLudo_war/auth/home");
    }
}
