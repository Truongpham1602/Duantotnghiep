package bangiay.com.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@SuppressWarnings("serial") //ngăn chặn các cảnh báo liên quan đến trường serialVersionUID bị thiếu.
@Data
@Entity
@Table(name = "products")
public class Product implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "size_id")
	private Long sizeID;
	
	@Column(name = "categori_id")
	private Long categoriId;
	
	@Column(name = "product_name")
	private String productName;
	
	@Column(name = "code")
	private Long code;
	
	@Column(name = "color")
	private String color;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "created")
	@Temporal(TemporalType.TIMESTAMP)
	private Date created;
	
	@Column(name = "creator")
	private String creator;
	
	@Column(name = "price")
	private Double price;
	
	@Column(name = "quantity")
	private Double quantity;
	
	@Column(name = "modefied")
	@Temporal(TemporalType.TIMESTAMP)
	private Date modified;
	
	@Column(name = "modefier")
	private String modifier;
	
	@Column(name = "url_video")
	private String urlVideo;
	
}
