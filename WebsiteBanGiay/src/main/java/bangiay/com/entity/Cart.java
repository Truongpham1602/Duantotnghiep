package bangiay.com.entity;

import javax.persistence.*;

import lombok.Data;

@Entity
@Data
@Table(name = "cart")
public class Cart {
    @Id
    @Column(name = "ID")
    private Integer id;

    @ManyToOne
	@JoinColumn(name="USER_ID")
    private User user;

    @ManyToOne
	@JoinColumn(name="SIZE_ID")
    private Size size;

    @Column(name = "QUANTITY")
    private Integer quantity;

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
