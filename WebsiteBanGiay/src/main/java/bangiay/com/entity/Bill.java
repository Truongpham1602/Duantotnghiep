package bangiay.com.entity;

import javax.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "bill")
public class Bill {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "code")
    private String code;

    @Column(name = "name_recipients")
    private String nameRecipients;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "address")
    private String address;

    @Column(name = "description")
    private String description;

    @Column(name = "created")
    private java.sql.Timestamp created;

    @Column(name = "creator")
    private java.sql.Timestamp creator;


}
