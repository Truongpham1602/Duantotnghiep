package bangiay.com.DTO;

import lombok.Data;

@Data
public class VoucherDTO {
    private Integer id;
    private Integer categoryId;
    private Integer discountId;
    private String name;
    private String description;
    private Double quantity;
    private String effectFrom;
    private String effectUntil;
    private java.sql.Timestamp created;
    private java.sql.Timestamp creator;
    private java.sql.Timestamp modified;
    private java.sql.Timestamp modifier;

}
