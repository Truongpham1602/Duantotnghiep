package bangiay.com.DTO;

public class BillDetailDTO {
    private Integer id;
    private Integer billId;
    private Integer sizeId;
    private Integer voucherId;
    private Integer quantity;
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
