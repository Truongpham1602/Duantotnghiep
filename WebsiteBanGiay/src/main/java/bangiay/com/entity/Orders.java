package bangiay.com.entity;

import javax.persistence.*;

@Entity
@Table(name = "orders")
public class Orders {
    @Id
    @Column(name = "ID")
    private Integer id;

    @Column(name = "VOUCHER_ID")
    private Integer voucherId;

    @Column(name = "CODE")
    private String code;

    @Column(name = "SIZE_ID")
    private Integer sizeId;

    @Column(name = "USER_ID")
    private Integer userId;

    @Column(name = "QUANTITY")
    private Integer quantity;

    @Column(name = "PRICE")
    private Double price;

    @Column(name = "NAME_RECIPIENT")
    private String nameRecipient;

    @Column(name = "TELEPHONE")
    private String telephone;

    @Column(name = "ADDRESS")
    private String address;

    @Column(name = "EFFECT_FROM")
    private java.sql.Timestamp effectFrom;

    @Column(name = "EFFECT_UNTIL")
    private java.sql.Timestamp effectUntil;

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

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getVoucherId() {
        return this.voucherId;
    }

    public void setVoucherId(Integer voucherId) {
        this.voucherId = voucherId;
    }

    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getSizeId() {
        return this.sizeId;
    }

    public void setSizeId(Integer sizeId) {
        this.sizeId = sizeId;
    }

    public Integer getUserId() {
        return this.userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return this.price;
    }

    public void setPrice(Double price) {
        this.price = price;
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

    public java.sql.Timestamp getEffectFrom() {
        return this.effectFrom;
    }

    public void setEffectFrom(java.sql.Timestamp effectFrom) {
        this.effectFrom = effectFrom;
    }

    public java.sql.Timestamp getEffectUntil() {
        return this.effectUntil;
    }

    public void setEffectUntil(java.sql.Timestamp effectUntil) {
        this.effectUntil = effectUntil;
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
}
