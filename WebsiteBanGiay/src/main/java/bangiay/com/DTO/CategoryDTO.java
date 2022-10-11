package bangiay.com.DTO;

public class CategoryDTO {
    private Integer id;
    private String namecate;
    private java.sql.Timestamp created;
    private String creator;
    private java.sql.Timestamp modified;
    private String modifier;
    private Integer parenId;
    private String code;
    private String description;
    private String name;
    private String status;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNamecate() {
        return this.namecate;
    }

    public void setNamecate(String namecate) {
        this.namecate = namecate;
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

    public Integer getParenId() {
        return this.parenId;
    }

    public void setParenId(Integer parenId) {
        this.parenId = parenId;
    }

    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
