package bangiay.com.entity;

import javax.persistence.*;

import lombok.Data;

@Entity
@Data
@Table(name = "category")
public class Category {
    @Id
    @Column(name = "ID")
    private Integer id;

    @Column(name = "PAREN_ID")
    private Integer parenId;

    @Column(name = "NAMECATE")
    private String namecate;

    @Column(name = "CREATED")
    private java.sql.Timestamp created;

    @Column(name = "CREATOR")
    private String creator;

    @Column(name = "MODIFIED")
    private java.sql.Timestamp modified;

    @Column(name = "MODIFIER")
    private String modifier;
}
