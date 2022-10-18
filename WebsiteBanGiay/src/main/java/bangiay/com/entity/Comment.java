package bangiay.com.entity;

import javax.persistence.*;

import lombok.Data;

@Entity
@Data
@Table(name = "comment")
public class Comment {
    @Id
    @Column(name = "ID")
    private Integer id;

    @ManyToOne
	@JoinColumn(name="USER_ID")
    private User user;

    @ManyToOne
	@JoinColumn(name="PRODUCT_ID")
    private Product product;

    @Column(name = "PARENT_ID")
    private Integer parentId;

    @Column(name = "CONTENT")
    private String content;

    @Column(name = "CREATED")
    private java.sql.Timestamp created;

    @Column(name = "CREATOR")
    private String creator;

    @Column(name = "STATUS")
    private Integer status;
}
