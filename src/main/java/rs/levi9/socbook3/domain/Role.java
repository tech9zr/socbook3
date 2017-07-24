package rs.levi9.socbook3.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

@Entity
public class Role extends BaseEntity  {

    @Enumerated(EnumType.STRING)
    private RoleType type;

    public RoleType getType() {
        return type;
    }

    public void setType(RoleType type) {
        this.type = type;
    }
    public Role() {
		// TODO Auto-generated constructor stub
	}

    
    public enum RoleType {
        ROLE_USER, ROLE_ADMIN;
        
    
      
    }

}