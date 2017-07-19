package rs.levi9.socbook3.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rs.levi9.socbook3.domain.User;
import rs.levi9.socbook3.repository.UserRepository;

@Service
public class UserService  {

	private UserRepository userRepository;

	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public List<User> findAll() {
		return userRepository.findAll();
	}

	public User findOne(Long id) {
		return userRepository.findOne(id);
	}
	
	public User findByUsername(String username){
		return userRepository.findByUsername(username);
	}

	public User save(User user) {
		return userRepository.save(user);
	}
	
	public void delete(Long id){
		userRepository.delete(id);
	}
	

}
