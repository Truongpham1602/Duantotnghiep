package bangiay.com.DTO;

import lombok.Data;

@Data
public class OrderDTO {
    private Integer id;
    private Integer userId;
    private Integer productId;
    private Integer voucherId;
    private String code;
    private String nameRecipients;
    private String telephone;
    private String address;
    private Double price;
    private Double quantity;
    private String description;
    private String effectFrom;
    private String effectUntil;
    private java.sql.Timestamp created;
    private java.sql.Timestamp creator;
    private java.sql.Timestamp modified;
    private java.sql.Timestamp modifier;
    private java.lang.Byte status;

}
