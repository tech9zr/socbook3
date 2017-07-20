package rs.levi9.socbook3.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "tag")
public class Tag extends BaseEntity implements Serializable {

	private static final long serialVersionUID = -1836280548712332193L;
	
	@NotNull()
	@Column(unique = false, nullable = false, name = "name")
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	
}
