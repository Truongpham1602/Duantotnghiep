package bangiay.com.entity;

import javax.persistence.*;

import lombok.Data;

@Entity
@Data
@Table(name = "media")
public class Media {
    @Id
    @Column(name = "ID")
    private Integer id;

    @ManyToOne
   	@JoinColumn(name="PRODUCT_ID")
    private Product product;

    @Column(name = "URL")
    private String url;

    @Column(name = "DESCRIPTION")
    private Integer description;

    @Column(name = "TYPE")
    private String type;
}
