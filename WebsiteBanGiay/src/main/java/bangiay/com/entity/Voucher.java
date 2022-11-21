package bangiay.com.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Entity

@Table(name = "voucher")
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    @Column(name = "ID")
    private Integer id;

    @Column(name = "NAME")
    private String name;

    @ManyToOne
   	@JoinColumn(name="CATEGORY_ID")
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
    private Category category;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "QUANTITY")
    private Integer quantity;

    @Column(name = "EFFECT_FROM")
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date effectFrom;

    @Column(name = "EFFECT_UNTIL")
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date effectUntil;

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

    @Column(name = "VALUE")
    private Integer value;

    @Column(name = "TYPE")
    private Integer type;
    
    @Column(name = "STATUS")
    private Integer status;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public java.util.Date getEffectFrom() {
		return effectFrom;
	}

	public void setEffectFrom(java.util.Date effectFrom) {
		this.effectFrom = effectFrom;
	}

	public java.util.Date getEffectUntil() {
		return effectUntil;
	}

	public void setEffectUntil(java.util.Date effectUntil) {
		this.effectUntil = effectUntil;
	}

	public java.util.Date getCreated() {
		return created;
	}

	public void setCreated(java.util.Date created) {
		this.created = created;
	}

	public String getCreator() {
		return creator;
	}

	public void setCreator(String creator) {
		this.creator = creator;
	}

	public java.util.Date getModified() {
		return modified;
	}

	public void setModified(java.util.Date modified) {
		this.modified = modified;
	}

	public String getModifier() {
		return modifier;
	}

	public void setModifier(String modifier) {
		this.modifier = modifier;
	}

	public Integer getValue() {
		return value;
	}

	public void setValue(Integer value) {
		this.value = value;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}
    
	public Integer getStatus() {
		return status;
	}
	
	public void setStatus(Integer status) {
		this.status = status;
	}
    
}
