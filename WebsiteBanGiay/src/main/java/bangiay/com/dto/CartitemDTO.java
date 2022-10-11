package bangiay.com.DTO;

public class CartitemDTO {
    private Integer id;
    private java.sql.Timestamp created;
    private java.sql.Timestamp creator;
    private java.sql.Timestamp modified;
    private java.sql.Timestamp modifier;
    private Integer productId;
    private Double quantity;
    private java.lang.Byte status;
    private Integer userId;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public java.sql.Timestamp getCreated() {
        return this.created;
    }

    public void setCreated(java.sql.Timestamp created) {
        this.created = created;
    }

    public java.sql.Timestamp getCreator() {
        return this.creator;
    }

    public void setCreator(java.sql.Timestamp creator) {
        this.creator = creator;
    }

    public java.sql.Timestamp getModified() {
        return this.modified;
    }

    public void setModified(java.sql.Timestamp modified) {
        this.modified = modified;
    }

    public java.sql.Timestamp getModifier() {
        return this.modifier;
    }

    public void setModifier(java.sql.Timestamp modifier) {
        this.modifier = modifier;
    }

    public Integer getProductId() {
        return this.productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Double getQuantity() {
        return this.quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public java.lang.Byte getStatus() {
        return this.status;
    }

    public void setStatus(java.lang.Byte status) {
        this.status = status;
    }

    public Integer getUserId() {
        return this.userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
