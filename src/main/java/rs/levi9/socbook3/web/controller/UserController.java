package rs.levi9.socbook3.web.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


import rs.levi9.socbook3.domain.User;
import rs.levi9.socbook3.service.UserService;
import rs.levi9.socbook3.web.validation.EmailAlreadyExistsException;
import rs.levi9.socbook3.web.validation.UsernameAlreadyExistsException;

@RestController
@RequestMapping("/users")
public class UserController {

	private UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	 	@RequestMapping(method = RequestMethod.GET)
	    public List<User> findAll() {
	        return userService.findAll();
	    }
	
	 	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
	    public ResponseEntity findOne(@PathVariable("id") Long id) {
	        User user = userService.findOne(id);
	        if (user == null) {
	            return new ResponseEntity(HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity(user, HttpStatus.OK);
	    }
	 	
	 	@RequestMapping(method = RequestMethod.POST)
	    public User save(@Valid @RequestBody User user) throws UsernameAlreadyExistsException, EmailAlreadyExistsException {
	 		User userByUsername = userService.findByUsername(user.getUsername());
	 		if (userByUsername != null) {
	 			throw new UsernameAlreadyExistsException("Username already taken!");
	 		}
	 		User userByEmail = userService.findByEmail(user.getEmail());
	 		if (userByEmail != null) {
	 			throw new EmailAlreadyExistsException("Email already in use!");
	 		}
	        return userService.save(user);
	    }
	    
	    @RequestMapping(path = "{id}", method = RequestMethod.DELETE)
	    public ResponseEntity delete(@PathVariable("id") Long id) {
	        userService.delete(id);
	        return new ResponseEntity(HttpStatus.OK);
	    }
	    
	    @RequestMapping(path = "/username/{username}", method = RequestMethod.GET)
	    public User findByUsername(@PathVariable("username") String username) {
	    	return userService.findByUsername(username);
	    }
	    
	    @RequestMapping(method = RequestMethod.PUT)
	    public User put(@Valid @RequestBody User user) {
	        return userService.save(user);
	    }
	    @RequestMapping("/user")
	    public Map<String, Object> user(Authentication user) {
	      Map<String, Object> map = new LinkedHashMap<String, Object>();
	      map.put("username", user.getName());
	      map.put("roles", AuthorityUtils.authorityListToSet((user).getAuthorities()));
	      return map;
	    }
}
