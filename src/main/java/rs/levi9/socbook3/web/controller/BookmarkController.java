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
import rs.levi9.socbook3.domain.Category;
import rs.levi9.socbook3.domain.User;
import rs.levi9.socbook3.service.BookmarkService;
import rs.levi9.socbook3.service.CategoryService;
import rs.levi9.socbook3.service.UserService;

@RestController
@RequestMapping("/bookmarks")
public class BookmarkController {
	private BookmarkService bookmarkService;
	private UserService userService;
	private CategoryService categoryService;

	@Autowired
	public BookmarkController(BookmarkService bookmarkService, UserService userService, CategoryService categoryService) {
		this.userService = userService;
		this.bookmarkService = bookmarkService;
		this.categoryService = categoryService;
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

	// pretraga po korisniku, vraca sve njegove bookmarke, privatne i javne
	@RequestMapping(path = "/username/{user}", method = RequestMethod.GET)
	public List<Bookmark> findByUser(@PathVariable("user") String username) {
		User foundUser = userService.findByUsername(username);
		return bookmarkService.findByUser(foundUser);
	}

	// vraca sve javne bookmarke za sve korisnike.
	@RequestMapping(path = "/visible/{vis}", method = RequestMethod.GET)
	public List<Bookmark> findByVisible(@PathVariable("vis") boolean visible) {
		return bookmarkService.findByVisible(visible);
	}

	// pretraga po korisniku, vraca samo njegove javne bookmarke
	@RequestMapping(path = "/user/{user}", method = RequestMethod.GET)
	public List<Bookmark> findByUserAndVisible(@PathVariable("user") String username) {
		User foundUser = userService.findByUsername(username);
		return bookmarkService.findByUserAndVisible(foundUser, true);
	}

	//pretraga po opisu, vraca sve koji imaju trazeni opis u sebi ali moraju biti javni
	@RequestMapping(path = "/description/{desc}", method = RequestMethod.GET)
	public List<Bookmark> findByDescriptionContainingAndVisible(@PathVariable("desc") String desc) {
		return bookmarkService.findByDescriptionContainingAndVisible(desc,true);
	}
	//pretraga po naslovu, vraca sve koji imaju trazeni naslov i moraju biti javni
	@RequestMapping(path = "/title/{tit}", method = RequestMethod.GET)
	public List<Bookmark> findByTitle(@PathVariable("tit") String title){
		return bookmarkService.findByTitleAndVisible(title, true);
	}
	
	// pretraga po kategoriji, vraca sve bookmarke koji pripadaju trazenoj kategoriji i da su javni
	@RequestMapping(path = "/category/{cat}", method = RequestMethod.GET)
	public List<Bookmark> findByCategory(@PathVariable("cat")String category){
		Category foundCategory = categoryService.findByName(category);
		return bookmarkService.findByCategoryAndVisible(foundCategory, true);
	}
	
	
}
