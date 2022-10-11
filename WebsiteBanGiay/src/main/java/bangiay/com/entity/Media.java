package bangiay.com.entity;

import javax.persistence.*;

@Entity
@Table(name = "media")
public class Media {
    @Id
    @Column(name = "ID")
    private Integer id;

    @Column(name = "PRODUCT_ID")
    private Integer productId;

    @Column(name = "URL")
    private String url;

    @Column(name = "DESCRIPTION")
    private Integer description;

    @Column(name = "TYPE")
    private java.lang.Byte type;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getProductId() {
        return this.productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getUrl() {
        return this.url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getDescription() {
        return this.description;
    }

    public void setDescription(Integer description) {
        this.description = description;
    }

    public java.lang.Byte getType() {
        return this.type;
    }

    public void setType(java.lang.Byte type) {
        this.type = type;
    }
}
