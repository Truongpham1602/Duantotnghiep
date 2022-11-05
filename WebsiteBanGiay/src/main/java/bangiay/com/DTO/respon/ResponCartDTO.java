package bangiay.com.DTO.respon;

import bangiay.com.entity.Size;
import bangiay.com.entity.User;
import lombok.Data;

@Data
public class ResponCartDTO {
    private Integer quantity;
    private User user_id;
    private Size size_id;
    private String creator;
    private String modifier;
    private Integer status;
}
