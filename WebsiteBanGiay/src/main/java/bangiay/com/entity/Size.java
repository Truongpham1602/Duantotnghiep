package bangiay.com.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "size")
public class Size {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @ManyToOne
   	@JoinColumn(name="PRODUCT_ID")
    private Product product;

    @Column(name = "SIZE")
    private String size;

    @Column(name = "QUANTITY")
    private Integer quantity;

    @OneToMany(mappedBy = "SIZE_ID", cascade = CascadeType.ALL)
    private List<Cart> cartList;

}
