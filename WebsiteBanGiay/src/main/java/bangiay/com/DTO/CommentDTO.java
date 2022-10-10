package bangiay.com.DTO;

import lombok.Data;

@Data
public class CommentDTO {
    private Integer id;
    private Integer userId;
    private Integer productId;
    private String content;
    private String created;
    private String creator;
    private java.sql.Timestamp modified;
    private java.sql.Timestamp modifier;
    private java.lang.Byte status;

}
