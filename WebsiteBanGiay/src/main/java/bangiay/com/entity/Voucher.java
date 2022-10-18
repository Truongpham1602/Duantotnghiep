package bangiay.com.entity;

import javax.persistence.*;

import lombok.Data;

@Entity
@Data
@Table(name = "voucher")
public class Voucher {
    @Id
    @Column(name = "ID")
    private Integer id;

    @Column(name = "NAME")
    private String name;

    @ManyToOne
   	@JoinColumn(name="CATEGORY_ID")
    private Category category;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "QUANTITY")
    private Integer quantity;

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

    @Column(name = "VALUE")
    private Integer value;

    @Column(name = "TYPE")
    private Integer type;
}
