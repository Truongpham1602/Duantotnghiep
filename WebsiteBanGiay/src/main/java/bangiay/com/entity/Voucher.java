package bangiay.com.entity;

import javax.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "voucher")
public class Voucher {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "category_id")
    private Integer categoryId;

    @Column(name = "discount_id")
    private Integer discountId;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "quantity")
    private Double quantity;

    @Column(name = "effect_from")
    private String effectFrom;

    @Column(name = "effect_until")
    private String effectUntil;

    @Column(name = "created")
    private java.sql.Timestamp created;

    @Column(name = "creator")
    private java.sql.Timestamp creator;

    @Column(name = "modified")
    private java.sql.Timestamp modified;

    @Column(name = "modifier")
    private java.sql.Timestamp modifier;

}
