package rs.levi9.socbook3.web.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rs.levi9.socbook3.domain.Bookmark;
import rs.levi9.socbook3.domain.Role;
import rs.levi9.socbook3.domain.Role.RoleType;
import rs.levi9.socbook3.domain.User;
import rs.levi9.socbook3.service.BookmarkService;
import rs.levi9.socbook3.service.UserService;

@RestController
@RequestMapping("/bookmarks")
public class BookmarkController {
	private BookmarkService bookmarkService;
	private UserService userService;
	private Role role;
	
	@Autowired
	public BookmarkController(BookmarkService bookmarkService, UserService userService ) {
		this.userService = userService;
		this.bookmarkService = bookmarkService;
	}

	@RequestMapping(method = RequestMethod.GET)
	public List<Bookmark> findAll() {
		return bookmarkService.findAll();
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
	public ResponseEntity findOne(@PathVariable("id") Long id) {
		Bookmark bookmark = bookmarkService.findOne(id);
		if (bookmark == null) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity(bookmark, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST)
	public Bookmark save(@Valid @RequestBody Bookmark bookmark) {
		return bookmarkService.save(bookmark);
	}

	@RequestMapping(path = "/username{id}", method = RequestMethod.DELETE)
	public ResponseEntity delete(@PathVariable("id") Long id) {
		bookmarkService.delete(id);
		return new ResponseEntity(HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public Bookmark put(@Valid @RequestBody Bookmark bookmark) {
		return bookmarkService.save(bookmark);
	}

	// pretraga po korisnickom imenu, vraca sve bookmarke javne i privatne
	@RequestMapping(path = "/username/{user}", method = RequestMethod.GET)
	public List<Bookmark> findByUser(@PathVariable("user") String username) {
		User foundUser = userService.findByUsername(username);
		for (Role role : foundUser.getRoles()) {
			if (role.getType().equals(RoleType.ROLE_ADMIN)) {
				return bookmarkService.findAll();
			}
		}
		
		return bookmarkService.findByUser(foundUser);
	}

	// pretraga po vidljivosti, vraca javne
	@RequestMapping(path = "/visible", method = RequestMethod.GET)
	public List<Bookmark> findByVisible() {
		return bookmarkService.findByVisible();
	}

	// pretraga po korisniku, vraca samo njegove javne bookmark-e
	@RequestMapping(path = "/user/{user}", method = RequestMethod.GET)
	public List<Bookmark> findByUserAndVisible(@PathVariable("user") String username) {
		User foundUser = userService.findByUsername(username);
		return bookmarkService.findByUserAndVisible(foundUser);
	}
}
