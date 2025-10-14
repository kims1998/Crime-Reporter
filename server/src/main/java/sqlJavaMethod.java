/*
import java.io.IOException;
import java.sql.*;

public class slqJavaMethod {
    // Insert a row into user. Note: I will try to make name it more apporiately
    public static void insertRowIntoUser(int redID, String firstName, String lastName, String jdbcURL, String username, String password) {


        String sql = "INSERT INTO users (redID, firstName, lastName) VALUES (?, ?, ?)";

        try {
            // Connecting to the database
            Connection conn = DriverManager.getConnection(jdbcURL, username, password);

            // Create a prepared statement
            PreparedStatement preState = conn.prepareStatement(sql);

            // Set values for placeholders

            preState.setInt(1, redID);
            preState.setString(2, firstName);
            preState.setString(3, lastName);

            int rowInserted = preState.executeUpdate();

            if (rowInserted > 0) {
                System.out.println("A new row was inserted successfully!");
            }

            conn.close();


        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // This is just a basic select User method. In the future, I am hoping for a more modular code lol

    public static void selectUsers(String jdbcURL, String username, String password) {


        String sql = "SELECT * FROM " + table;

        try {
            // Connecting to the database
            Connection conn = DriverManager.getConnection(jdbcURL, username, password);

            // Create a prepared statement
            PreparedStatement preState = conn.prepareStatement(sql);


            ResultSet result = preState.executeQuery();

            while (result.next()) {
                int redID = result.getInt("redID");
                String firstName = result.getString("firstName");
                String lastName = result.getString("lastName");

                System.out.printf("| RedID: %d | Name: %s %s%n",
                        redID, firstName, lastName);
            }

            conn.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }



    // This is still early. This method takes it infomations and puts it into the database.

    public static void createReport(String firstName, String location, String incident, int reporterRedID,
                                    int time, String AMPM, int date, int person1InvolvedAGE, String person1InvolvedGENDER,
                                    int person2InvolvedAGE, String person2InvolvedGENDER, String description,
                                    String jdbcURL, String username, String password) {

        String sql = "INSERT INTO report (firstName, location, incident, reporterRedID, time, AMPM, date," +
                " person1InvolvedAGE, person1InvolvedGENDER, person2InvolvedAGE, person2InvolvedGENDER, description) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";


        try {
            // Connecting to the database
            Connection conn = DriverManager.getConnection(jdbcURL, username, password);

            // Create a prepared statement
            PreparedStatement preState = conn.prepareStatement(sql);

            // Set values for placeholders

            preState.setString(1, firstName);
            preState.setString(2, location);
            preState.setString(3, incident);
            preState.setInt(4, reporterRedID);
            preState.setInt(5, time);
            preState.setString(6, AMPM);
            preState.setInt(7, date);
            preState.setInt(8, person1InvolvedAGE);
            preState.setString(9, person1InvolvedGENDER);
            preState.setInt(10, person2InvolvedAGE);
            preState.setString(11, person2InvolvedGENDER);
            preState.setString(12, description);

            int rowInserted = preState.executeUpdate();

            if (rowInserted > 0) {
                System.out.println("A new row was inserted successfully! (REPORT)");
            }

            conn.close();


        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    // This is just a basic select Report method. In the future, I am hoping for a more modular code lol

    public static void selectReport(String jdbcURL, String username, String password) {

        String sql = "SELECT * FROM report";

        try {
            // Connecting to the database
            Connection conn = DriverManager.getConnection(jdbcURL, username, password);

            // Create a prepared statement
            PreparedStatement preState = conn.prepareStatement(sql);


            ResultSet result = preState.executeQuery();


            while (result.next()) {
                int reportID = result.getInt("reportID");
                String firstName = result.getString("firstName");
                String location = result.getString("location");
                String incident = result.getString("incident");
                int reporterRedID = result.getInt("reporterRedID");
                int time = result.getInt("time");
                String AMPM = result.getString("AMPM");
                int date = result.getInt("date");
                int person1InvolvedAGE = result.getInt("person1InvolvedAGE");
                String person1InvolvedGENDER = result.getString("person1InvolvedGENDER");
                int person2InvolvedAGE = result.getInt("person2InvolvedAGE");
                String person2InvolvedGENDER = result.getString("person2InvolvedGENDER");
                String description = result.getString("description");

                // Print the data
                System.out.println("Report ID: " + reportID);
                System.out.println("Reporter: " + firstName + " (RedID: " + reporterRedID + ")");
                System.out.println("Location: " + location);
                System.out.println("Incident: " + incident);
                System.out.println("Time: " + time + " " + AMPM);
                System.out.println("Date: " + date);
                System.out.println("Person 1: " + person1InvolvedAGE + " yrs, " + person1InvolvedGENDER);
                System.out.println("Person 2: " + person2InvolvedAGE + " yrs, " + person2InvolvedGENDER);
                System.out.println("Description: " + description);
                System.out.println("-------------------------------------------");
            }

            conn.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }

    }
}

 */