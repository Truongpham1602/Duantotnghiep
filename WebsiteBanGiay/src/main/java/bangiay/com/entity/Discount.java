package bangiay.com.entity;

import javax.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "discount")
public class Discount {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "created")
    private java.sql.Timestamp created;

    @Column(name = "creator")
    private java.sql.Timestamp creator;

    @Column(name = "modified")
    private java.sql.Timestamp modified;

    @Column(name = "modifier")
    private java.sql.Timestamp modifier;

}
