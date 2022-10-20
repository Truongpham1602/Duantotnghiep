package bangiay.com.DTO;

public class BillDTO {
    private Integer id;
    private Integer userId;
    private String code;
    private String nameRecipient;
    private String telephone;
    private String address;
    private java.sql.Timestamp created;
    private String creator;
    private java.sql.Timestamp modified;
    private String modifier;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return this.userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getNameRecipient() {
        return this.nameRecipient;
    }

    public void setNameRecipient(String nameRecipient) {
        this.nameRecipient = nameRecipient;
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
}
