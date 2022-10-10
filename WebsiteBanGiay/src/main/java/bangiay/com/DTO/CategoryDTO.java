package bangiay.com.DTO;

import lombok.Data;

@Data
public class CategoryDTO {
    private Integer id;
    private String name;
    private String status;
    private java.sql.Timestamp created;
    private String description;
    private String like;
    private String code;
    private java.sql.Timestamp creator;
    private java.sql.Timestamp modified;
    private java.sql.Timestamp modifier;

}
