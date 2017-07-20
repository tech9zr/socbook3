package rs.levi9.socbook3.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "category")
public class Category  extends BaseEntity implements Serializable {


	private static final long serialVersionUID = -8091002368356157626L;
	
	@NotNull()
	@Column(unique = true, nullable = false, name = "name")
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Category() {
	}

	
}