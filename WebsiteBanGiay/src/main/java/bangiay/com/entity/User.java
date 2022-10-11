package bangiay.com.entity;

import javax.persistence.*;

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

    @Column(name = "createat")
    private java.sql.Timestamp createat;

    @Column(name = "role_id")
    private Integer roleId;

    @Column(name = "updateat")
    private java.sql.Timestamp updateat;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRolerId() {
        return this.rolerId;
    }

    public void setRolerId(Integer rolerId) {
        this.rolerId = rolerId;
    }

    public String getFullName() {
        return this.fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return this.telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public java.sql.Timestamp getCreated() {
        return this.created;
    }

    public void setCreated(java.sql.Timestamp created) {
        this.created = created;
    }

    public String getCreator() {
        return this.creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public java.sql.Timestamp getModified() {
        return this.modified;
    }

    public void setModified(java.sql.Timestamp modified) {
        this.modified = modified;
    }

    public String getModifier() {
        return this.modifier;
    }

    public void setModifier(String modifier) {
        this.modifier = modifier;
    }

    public Integer getStatus() {
        return this.status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public java.sql.Timestamp getCreateat() {
        return this.createat;
    }

    public void setCreateat(java.sql.Timestamp createat) {
        this.createat = createat;
    }

    public Integer getRoleId() {
        return this.roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public java.sql.Timestamp getUpdateat() {
        return this.updateat;
    }

    public void setUpdateat(java.sql.Timestamp updateat) {
        this.updateat = updateat;
    }
}
