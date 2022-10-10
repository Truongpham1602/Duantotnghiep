package bangiay.com.DTO;

import lombok.Data;

@Data
public class CartitemDTO {
    private Integer id;
    private Integer userId;
    private Integer productId;
    private java.sql.Timestamp created;
    private java.sql.Timestamp creator;
    private java.sql.Timestamp modified;
    private java.sql.Timestamp modifier;
    private Double quantity;
    private java.lang.Byte status;

}
