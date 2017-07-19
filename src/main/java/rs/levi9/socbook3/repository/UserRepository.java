package rs.levi9.socbook3.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rs.levi9.socbook3.domain.User;
@Repository
public interface UserRepository  extends JpaRepository<User, Long>{
	
public User findByUsername(String username);
	

}
