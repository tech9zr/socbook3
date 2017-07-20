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

import rs.levi9.socbook3.domain.Tag;
import rs.levi9.socbook3.service.TagService;

@RestController
@RequestMapping("/tags")
public class TagController {

	private TagService tagService;

	@Autowired
	public TagController(TagService tagService) {
		this.tagService = tagService;
	}

	@RequestMapping(method = RequestMethod.GET)
    public List<Tag> findAll() {
        return  tagService.findAll();
    }

 	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public ResponseEntity findOne(@PathVariable("id") Long id) {
        Tag tag = tagService.findOne(id);
        if (tag == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(tag, HttpStatus.OK);
    }
 	
 	@RequestMapping(method = RequestMethod.POST)
    public Tag save(@Valid @RequestBody Tag tag) {
        return tagService.save(tag);
    }
    
    @RequestMapping(path = "{id}", method = RequestMethod.DELETE)
    public ResponseEntity delete(@PathVariable("id") Long id) {
    	tagService.delete(id);
        return new ResponseEntity(HttpStatus.OK);
    }
   
    
    @RequestMapping(method = RequestMethod.PUT)
    public Tag put(@Valid @RequestBody Tag tag) {
        return tagService.save(tag);
    }
}
