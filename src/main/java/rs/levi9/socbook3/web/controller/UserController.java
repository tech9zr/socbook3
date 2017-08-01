package rs.levi9.socbook3.web.controller;

import java.net.URI;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestOperations;

import rs.levi9.socbook3.domain.Bookmark;
import rs.levi9.socbook3.domain.User;
import rs.levi9.socbook3.service.BookmarkService;
import rs.levi9.socbook3.service.UserService;
import rs.levi9.socbook3.web.validation.exceptions.EmailAlreadyExistsException;
import rs.levi9.socbook3.web.validation.exceptions.UsernameAlreadyExistsException;

@RestController
@RequestMapping("/users")
public class UserController {

	private UserService userService;
	private BookmarkService bookmarkService; 
	
	@Autowired
	private RestOperations restTemplate;

	
		@Autowired
	 	public UserController(UserService userService, BookmarkService bookmarkService) {
		this.userService = userService;
		this.bookmarkService = bookmarkService;
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
	 			throw new UsernameAlreadyExistsException("Username already taken, choose another one!");
	 		}
	 		User userByEmail = userService.findByEmail(user.getEmail());
	 		if (userByEmail != null) {
	 			throw new EmailAlreadyExistsException("User with this email already exists!");
	 		}
	        return userService.save(user);
	    }
		@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
		public ResponseEntity delete(@PathVariable("id") Long id) {
			User foundUser = userService.findOne(id);
			List<Bookmark> userBookmarks = bookmarkService.findByUser(foundUser);
			for (Bookmark bookmark : userBookmarks) {
				bookmarkService.delete(bookmark.getId());
			}
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
	    
	    @RequestMapping(path ="/captcha", method = RequestMethod.POST)
	    public String getSomethingSomething(@RequestBody Map<String, String> request){
	    	String response = request.get("g-recaptcha-response");
	    	String secret = "6LdBOCsUAAAAALm08B68C_poDY9IgIVIs1ZY2ll3";
	    	URI verifyUri = URI.create(String.format("https://www.google.com/recaptcha/api/siteverify?secret=%s&response=%s", secret, response));
	    	String googleResponse = restTemplate.getForObject(verifyUri, String.class);
	    	System.out.println(googleResponse);
	    	return googleResponse;
	    }
}
