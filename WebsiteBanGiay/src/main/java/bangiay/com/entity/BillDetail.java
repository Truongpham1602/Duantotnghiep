package bangiay.com.entity;

import javax.persistence.*;

import lombok.Data;

@Entity
@Data
@Table(name = "bill_detail")
public class BillDetail {
    @Id
    @Column(name = "ID")
    private Integer id;

    @ManyToOne
	@JoinColumn(name="BILL_ID")
    private Bill bill;

    @ManyToOne
	@JoinColumn(name="SIZE_ID")
    private Size size;

    @ManyToOne
	@JoinColumn(name="VOUCHER_ID")
    private Voucher voucher;

    @Column(name = "QUANTITY")
    private Integer quantity;

    @Column(name = "PRICE")
    private Double price;
}
