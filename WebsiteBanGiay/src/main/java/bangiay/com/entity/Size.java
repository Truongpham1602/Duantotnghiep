package bangiay.com.entity;

import lombok.Data;

import javax.persistence.*;

@Data
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


}
