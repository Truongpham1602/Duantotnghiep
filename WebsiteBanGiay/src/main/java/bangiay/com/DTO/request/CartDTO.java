package bangiay.com.DTO.request;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO {
    private Integer id;

    private Integer quantity;


    private java.sql.Timestamp created;

    private String creator;


    private java.sql.Timestamp modified;


    private String modifier;


    private Integer status;


    private Integer user_id;


    private Integer size_id;
}
