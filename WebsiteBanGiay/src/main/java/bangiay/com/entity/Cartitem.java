package bangiay.com.entity;

import javax.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "cartitem")
public class Cartitem {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "product_id")
    private Integer productId;

    @Column(name = "created")
    private java.sql.Timestamp created;

    @Column(name = "creator")
    private java.sql.Timestamp creator;

    @Column(name = "modified")
    private java.sql.Timestamp modified;

    @Column(name = "modifier")
    private java.sql.Timestamp modifier;

    @Column(name = "quantity")
    private Double quantity;

    @Column(name = "status")
    private java.lang.Byte status;

}
