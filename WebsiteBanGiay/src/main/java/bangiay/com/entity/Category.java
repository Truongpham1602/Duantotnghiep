package bangiay.com.entity;

import javax.persistence.*;

import lombok.Data;

@Entity
@Data
@Table(name = "category")
public class Category {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "PAREN_ID",nullable = true)
    
    private Integer parenId;

    @Column(name = "NAMECATE")
    @Lob
    private String namecate;

    @Column(name = "CREATED")
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date created;

    @Column(name = "CREATOR")
    private String creator;

    @Column(name = "MODIFIED")
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date modified;

    @Column(name = "MODIFIER")
    private String modifier;
}
