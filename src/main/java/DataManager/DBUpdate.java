package DataManager;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBUpdate {
    static Connection connection;
    static {
        try{
            Class.forName("org.postgresql.Driver");
        }catch (ClassNotFoundException classNotFoundException){
            classNotFoundException.printStackTrace();
            System.out.println("ERR_LOG : Unable to load the driver");
        }
        try{
            connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/LudoUsers","postgres", "TeslaPostgresql2000");
        }catch (SQLException sqlException){
            sqlException.printStackTrace();
            System.out.println("ERR_LOG : Unable to get connection");
        }
    }
    public void update(String query){
        try{
            connection.prepareStatement(query).executeUpdate();
        }catch (SQLException sqlException){
            sqlException.printStackTrace();
            System.out.println("ERR_LOG : Unable to Execute Update");
        }
    }
}
