package bangiay.com.entity;

import javax.persistence.*;

@Entity
@Table(name = "size")
public class Size {
    @Id
    @Column(name = "ID")
    private Integer id;

    @Column(name = "PRODUCT_ID")
    private Integer productId;

    @Column(name = "SIZE")
    private String size;

    @Column(name = "QUANTITY")
    private Integer quantity;

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

    public String getSize() {
        return this.size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
