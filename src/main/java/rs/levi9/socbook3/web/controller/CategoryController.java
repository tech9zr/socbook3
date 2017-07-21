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

import rs.levi9.socbook3.domain.Category;
import rs.levi9.socbook3.domain.User;
import rs.levi9.socbook3.service.CategoryService;

@RestController
@RequestMapping("/categories")
public class CategoryController {

	private CategoryService categoryService;

	@Autowired
	public CategoryController(CategoryService categoryService) {
		this.categoryService = categoryService;
	}
	
	@RequestMapping(method = RequestMethod.GET)
    public List<Category> findAll() {
        return  categoryService.findAll();
    }

 	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public ResponseEntity findOne(@PathVariable("id") Long id) {
 		Category category = categoryService.findOne(id);
        if (category == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(category, HttpStatus.OK);
    }
 	
 	@RequestMapping(method = RequestMethod.POST)
    public Category save(@Valid @RequestBody Category category) {
        return categoryService.save(category);
    }
    
    @RequestMapping(path = "{id}", method = RequestMethod.DELETE)
    public ResponseEntity delete(@PathVariable("id") Long id) {
    	categoryService.delete(id);
        return new ResponseEntity(HttpStatus.OK);
    }
   
    
    @RequestMapping(method = RequestMethod.PUT)
    public Category put(@Valid @RequestBody Category category) {
        return categoryService.save(category);
    }
    
    @RequestMapping(path = "/category/{cat}", method = RequestMethod.GET)
    public Category findByName(@PathVariable("cat") String cat) {
    	return categoryService.findByName(cat);
    }
	
}
