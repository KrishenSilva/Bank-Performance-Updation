import java.sql.*;

public class please {

    public static void main(String[] args) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost/HNB", "root", "1234");

            String SQL = "Select * From employee";
            Statement stm = connection.createStatement();
            ResultSet rst = stm.executeQuery(SQL);
            rst.next();
            String name = rst.getString("name");
            String department = rst.getString("department");
            String position = rst.getString("position");
            System.out.println(name + "\t" + department + "\t+" + position);

        } catch (ClassNotFoundException ex) {
            System.out.println("Driver s/w not found..");
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
    }

}
