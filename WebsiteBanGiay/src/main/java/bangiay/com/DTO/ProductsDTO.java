package bangiay.com.DTO;

import java.util.Date;

import lombok.Data;

@Data
public class ProductsDTO {
    private Integer id;
    private Integer sizeId;
    private Integer categoriId;
    private String productName;
    private Integer code;
    private String color;
    private String description;
    private Date created;
    private String creator;
    private Double price;
    private Double quantity;
    private Date modified;
    private String modifier;
    private String urlVideo;
     
}
