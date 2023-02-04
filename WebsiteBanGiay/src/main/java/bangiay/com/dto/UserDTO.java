package bangiay.com.DTO;


import java.util.ArrayList;
import java.util.Collection;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class UserDTO {
    private Integer id;
    private String fullName;
    private String password;
    private String email;
    private String telephone;
    private String address;
    private String image;
    private java.sql.Timestamp created;
    private String creator;
    private java.sql.Timestamp modified;
    private String modifier;
    private Integer status;
    
    private RoleDTO role;    
    
}
