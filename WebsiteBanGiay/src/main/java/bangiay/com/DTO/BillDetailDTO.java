package bangiay.com.DTO;

public class BillDetailDTO {
    private Integer id;
    private Integer billId;
    private Integer productId;
    private Integer voucherId;
    private Integer quantity;
    private Double price;
    private String discount;

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

    public Integer getProductId() {
        return this.productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
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

    public String getDiscount() {
        return this.discount;
    }

    public void setDiscount(String discount) {
        this.discount = discount;
    }
}
