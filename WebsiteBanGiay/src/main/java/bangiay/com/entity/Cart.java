package bangiay.com.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;


import javax.persistence.*;



@Entity
@Data
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

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
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "USER_ID",referencedColumnName = "id")
    private User USER_ID;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "SIZE_ID")
    private Size SIZE_ID;

}
