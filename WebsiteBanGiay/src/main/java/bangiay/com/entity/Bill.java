package bangiay.com.entity;

import javax.persistence.*;

@Entity
@Table(name = "bill")
public class Bill {
    @Id
    @Column(name = "ID")
    private Integer id;

    @ManyToOne
	@JoinColumn(name="USER_ID")
    private User user;

    @Column(name = "CODE")
    private String code;

    @Column(name = "NAME_RECIPIENT")
    private String nameRecipient;

    @Column(name = "TELEPHONE")
    private String telephone;

    @Column(name = "ADDRESS")
    private String address;

    @Column(name = "CREATED")
    private java.sql.Timestamp created;

    @Column(name = "CREATOR")
    private String creator;

    @Column(name = "MODIFIED")
    private java.sql.Timestamp modified;

    @Column(name = "MODIFIER")
    private String modifier;
}
