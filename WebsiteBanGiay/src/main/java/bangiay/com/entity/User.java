package bangiay.com.entity;

import javax.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user")
public class User {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "role_id")
    private Integer roleId;

    @Column(name = "password")
    private String password;

    @Column(name = "fullname")
    private String fullname;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "email")
    private String email;

    @Column(name = "address")
    private String address;

    @Column(name = "createat")
    private java.sql.Timestamp createat;

    @Column(name = "updateat")
    private java.sql.Timestamp updateat;

    @Column(name = "status")
    private java.lang.Byte status;

    @Column(name = "image")
    private String image;

    @Column(name = "modified")
    private java.sql.Timestamp modified;

    @Column(name = "modifier")
    private java.sql.Timestamp modifier;

}
