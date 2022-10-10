package bangiay.com.entity;

import javax.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "bill_detail")
public class BillDetail {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "bill_id")
    private Integer billId;

    @Column(name = "product_id")
    private Integer productId;

    @Column(name = " voucher_id")
    private Integer  VoucherId;

    @Column(name = "quantity")
    private Double quantity;

    @Column(name = "price")
    private Double price;

    @Column(name = "discount")
    private String discount;

}
