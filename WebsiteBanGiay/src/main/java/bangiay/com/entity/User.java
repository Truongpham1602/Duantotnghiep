package bangiay.com.entity;

import lombok.Data;

import javax.persistence.*;
@Data
@Entity
@Table(name = "user")
public class User {
    @Id
    @Column(name = "ID")
    private Integer id;

    @Column(name = "ROLER_ID")
    private Integer rolerId;

    @Column(name = "FullNAME")
    private String fullName;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "TELEPHONE")
    private String telephone;

    @Column(name = "ADDRESS")
    private String address;

    @Column(name = "Image")
    private String image;

    @Column(name = "CREATED")
    private java.sql.Timestamp created;

    @Column(name = "CREATOR")
    private String creator;

    @Column(name = "MODIFIED")
    private java.sql.Timestamp modified;

    @Column(name = "MODIFIER")
    private String modifier;

    @Column(name = "STATUS")
    private Integer status;



}
