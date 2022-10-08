package bangiay.com.Entitys;

import javax.persistence.*;

import lombok.Data;

@Data
@Entity
@Table(name = "products")
public class Products {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "size_id")
    private Integer sizeId;

    @Column(name = "categori_id")
    private Integer categoriId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "code")
    private Integer code;

    @Column(name = "color")
    private String color;

    @Column(name = "description")
    private String description;

    @Column(name = "created")
    private java.sql.Timestamp created;

    @Column(name = "creator")
    private String creator;

    @Column(name = "price")
    private Double price;

    @Column(name = "quantity")
    private Double quantity;

    @Column(name = "modified")
    private java.sql.Timestamp modified;

    @Column(name = "modifier")
    private String modifier;

    @Column(name = "url_video")
    private String urlVideo;
}
