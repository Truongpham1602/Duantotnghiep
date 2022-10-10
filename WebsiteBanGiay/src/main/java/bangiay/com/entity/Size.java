package bangiay.com.entity;

import javax.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "size")
public class Size {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "product_id")
    private Integer productId;

    @Column(name = "name")
    private String name;

    @Column(name = "size")
    private String size;

    @Column(name = "quantity")
    private Double quantity;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    private java.lang.Byte status;

}
