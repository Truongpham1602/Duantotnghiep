package bangiay.com.entity;

import javax.persistence.*;

@Entity
@Table(name = "bill_detail")
public class BillDetail {
    @Id
    @Column(name = "ID")
    private Integer id;

    @Column(name = "BILL_ID")
    private Integer billId;

    @Column(name = "SIZE_ID")
    private Integer sizeId;

    @Column(name = "VOUCHER_ID")
    private Integer voucherId;

    @Column(name = "QUANTITY")
    private Integer quantity;

    @Column(name = "PRICE")
    private Double price;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getBillId() {
        return this.billId;
    }

    public void setBillId(Integer billId) {
        this.billId = billId;
    }

    public Integer getSizeId() {
        return this.sizeId;
    }

    public void setSizeId(Integer sizeId) {
        this.sizeId = sizeId;
    }

    public Integer getVoucherId() {
        return this.voucherId;
    }

    public void setVoucherId(Integer voucherId) {
        this.voucherId = voucherId;
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
}
