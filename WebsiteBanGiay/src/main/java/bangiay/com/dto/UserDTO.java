package bangiay.com.DTO;

import lombok.Data;

@Data
public class UserDTO {
    private Integer id;
    private Integer roleId;
    private String password;
    private String fullname;
    private String telephone;
    private String email;
    private String address;
    private java.sql.Timestamp createat;
    private java.sql.Timestamp updateat;
    private java.lang.Byte status;
    private String image;
    private java.sql.Timestamp modified;
    private java.sql.Timestamp modifier;


}
