package bangiay.com.entity;

import javax.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "comment")
public class Comment {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "product_id")
    private Integer productId;

    @Column(name = "content")
    private String content;

    @Column(name = "created")
    private String created;

    @Column(name = "creator")
    private String creator;

    @Column(name = "modified")
    private java.sql.Timestamp modified;

    @Column(name = "modifier")
    private java.sql.Timestamp modifier;

    @Column(name = "status")
    private java.lang.Byte status;

}
