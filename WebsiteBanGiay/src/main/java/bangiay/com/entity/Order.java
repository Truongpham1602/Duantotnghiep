package bangiay.com.entity;

import javax.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "order")
public class Order {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "product_id")
    private Integer productId;

    @Column(name = "voucher_id")
    private Integer voucherId;

    @Column(name = "code")
    private String code;

    @Column(name = "name_recipients")
    private String nameRecipients;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "address")
    private String address;

    @Column(name = "price")
    private Double price;

    @Column(name = "quantity")
    private Double quantity;

    @Column(name = "description")
    private String description;

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

    @Column(name = "status")
    private java.lang.Byte status;

}
