package bangiay.com.entity;

import java.util.Date;

import javax.persistence.*;
import lombok.Data;

@SuppressWarnings("serial") //ngăn chặn các cảnh báo liên quan đến trường serialVersionUID bị thiếu.
@Data
@Entity
@Table(name = "products")
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "size_id")
    private Long sizeId;

    @Column(name = "categori_id")
    private Long categoriId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "code")
    private Long code;

    @Column(name = "color")
    private String color;

    @Column(name = "description")
    private String description;

    @Column(name = "created")
    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

    @Column(name = "creator")
    private String creator;

    @Column(name = "price")
    private Double price;

    @Column(name = "quantity")
    private Double quantity;

    @Column(name = "modified")
    @Temporal(TemporalType.TIMESTAMP)
    private Date modified;

    @Column(name = "modifier")
    private String modifier;

    @Column(name = "url_video")
    private String urlVideo;

    }
