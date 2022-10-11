package bangiay.com.entity;

import javax.persistence.*;

@Entity
@Table(name = "product_sizes")
public class ProductSizes {
    @Id
    @Column(name = "product_id")
    private Integer productId;

    @Id
    @Column(name = "size_id")
    private Integer sizeId;

    public Integer getProductId() {
        return this.productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getSizeId() {
        return this.sizeId;
    }

    public void setSizeId(Integer sizeId) {
        this.sizeId = sizeId;
    }
}
