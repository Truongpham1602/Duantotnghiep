package bangiay.com.DTO;

import lombok.Data;

@Data
public class BillDTO {
    private Integer id;
    private Integer userId;
    private String code;
    private String nameRecipients;
    private String telephone;
    private String address;
    private String description;
    private java.sql.Timestamp created;
    private java.sql.Timestamp creator;

}
