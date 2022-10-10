package bangiay.com.DTO;

import lombok.Data;

@Data
public class DiscountDTO {
    private Integer id;
    private String name;
    private String description;
    private java.sql.Timestamp created;
    private java.sql.Timestamp creator;
    private java.sql.Timestamp modified;
    private java.sql.Timestamp modifier;

}
