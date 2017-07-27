package rs.levi9.socbook3.web.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
import rs.levi9.socbook3.domain.Tag;
import rs.levi9.socbook3.domain.User;
import rs.levi9.socbook3.service.BookmarkService;
import rs.levi9.socbook3.service.UserService;

@RestController
@RequestMapping("/bookmarks")
public class BookmarkController {
	private BookmarkService bookmarkService;
	private UserService userService;

	@Autowired
	public BookmarkController(BookmarkService bookmarkService, UserService userService) {
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

	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity delete(@PathVariable("id") Long id) {
		bookmarkService.delete(id);
		return new ResponseEntity(HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public Bookmark put(@Valid @RequestBody Bookmark bookmark) {
		return bookmarkService.save(bookmark);
	}

	@RequestMapping(path = "/username/{user}", method = RequestMethod.GET)
	public List<Bookmark> findByUser(@PathVariable("user") String username) {
		User foundUser = userService.findByUsername(username);
		return bookmarkService.findByUser(foundUser);
	}

	@RequestMapping(path = "/visible", method = RequestMethod.GET)
	public List<Bookmark> findByVisble() {
		return bookmarkService.findByVisible();
	}

	@RequestMapping(path = "/user/{user}", method = RequestMethod.GET)
	public List<Bookmark> finByUserAndVisible(@PathVariable("user") String username) {
		User foundUser = userService.findByUsername(username);
		return bookmarkService.findByUserAndVisible(foundUser);

	}

	@RequestMapping(path = "/import/bookmark/{bookmarkId}/username/{username}", method = RequestMethod.POST)
	public Bookmark importBookmarkFromUser(@Valid @PathVariable("bookmarkId") Long bookmarkId,
			@PathVariable("username") String username) {
		Bookmark sourceBookmark = bookmarkService.findOne(bookmarkId);
		// handle source bookmark
		Bookmark newBookmark = new Bookmark();
		User newAuthor = userService.findByUsername(username);
		if (newAuthor == null) {
		}

		newBookmark.setCategory(sourceBookmark.getCategory());

		Set<Tag> newTags = new HashSet<>();
		newTags.addAll(sourceBookmark.getTags());

		newBookmark.setTags(newTags);
		newBookmark.setUser(newAuthor);
		newBookmark.setUrl(sourceBookmark.getUrl());
		newBookmark.setTitle(sourceBookmark.getTitle());
		newBookmark.setCreationDate(sourceBookmark.getCreationDate());
		newBookmark.setVisible(sourceBookmark.isVisible());
		newBookmark.setDescription(sourceBookmark.getDescription());

		return bookmarkService.save(newBookmark);
	}

	@RequestMapping(path = "/search/{title}", method = RequestMethod.GET)
	public List<Bookmark> findByTitle(@PathVariable("title") String title) {
		return bookmarkService.findByTitle(title);

	}

	@RequestMapping(path = "/delete/{title}", method = RequestMethod.DELETE)
	public ResponseEntity delteByTitle(@PathVariable("title") String title) {
		bookmarkService.deleteByTitle(title);
		return new ResponseEntity(HttpStatus.OK);
	}

}
