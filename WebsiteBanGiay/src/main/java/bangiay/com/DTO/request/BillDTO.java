package bangiay.com.DTO.request;

import lombok.Data;

@Data
public class BillDTO {
    private Integer id;
    private Integer userId;
    private String code;
    private String nameRecipient;
    private String telephone;
    private String address;
    private java.sql.Timestamp created;
    private String creator;
    private java.sql.Timestamp modified;
    private String modifier;

}
