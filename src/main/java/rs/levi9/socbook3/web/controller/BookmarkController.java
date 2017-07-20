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

import rs.levi9.socbook3.domain.User;
import rs.levi9.socbook3.service.BookmarkService;

@RestController
@RequestMapping("/bookmarks")
public class BookmarkController 
{
	private BookmarkService bookmarkService;

	@Autowired
	public BookmarkController(BookmarkService bookmarkService) {
		this.bookmarkService = bookmarkService;
	}
	
 	@RequestMapping(method = RequestMethod.GET)
    public List<Bookmark> findAll() {
        return  bookmarkService.findAll();
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
    
    @RequestMapping(path = "{id}", method = RequestMethod.DELETE)
    public ResponseEntity delete(@PathVariable("id") Long id) {
        bookmarkService.delete(id);
        return new ResponseEntity(HttpStatus.OK);
    }
   
    
    @RequestMapping(method = RequestMethod.PUT)
    public Bookmark put(@Valid @RequestBody Bookmark bookmark) {
        return bookmarkService.save(bookmark);
    }
	

}
