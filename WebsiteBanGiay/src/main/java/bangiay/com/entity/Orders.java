package bangiay.com.entity;

import javax.persistence.*;

import lombok.Data;

@Entity
@Data
@Table(name = "orders")
public class Orders {
    @Id
    @Column(name = "ID")
    private Integer id;

    @ManyToOne
   	@JoinColumn(name="VOUCHER_ID")
    private Voucher voucher;

    @Column(name = "CODE")
    private String code;

    @ManyToOne
   	@JoinColumn(name="SIZE_ID")
    private Size size;

    @ManyToOne
   	@JoinColumn(name="USER_ID")
    private User user;

    @Column(name = "QUANTITY")
    private Integer quantity;

    @Column(name = "PRICE")
    private Double price;

    @Column(name = "NAME_RECIPIENT")
    private String nameRecipient;

    @Column(name = "TELEPHONE")
    private String telephone;

    @Column(name = "ADDRESS")
    private String address;

    @Column(name = "EFFECT_FROM")
    private java.sql.Timestamp effectFrom;

    @Column(name = "EFFECT_UNTIL")
    private java.sql.Timestamp effectUntil;

    @Column(name = "CREATED")
    private java.sql.Timestamp created;

    @Column(name = "CREATOR")
    private String creator;

    @Column(name = "MODIFIED")
    private java.sql.Timestamp modified;

    @Column(name = "MODIFIER")
    private String modifier;

    @Column(name = "STATUS")
    private Integer status;
}
