package rs.levi9.socbook3.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rs.levi9.socbook3.domain.Bookmark;
import rs.levi9.socbook3.domain.Category;
import rs.levi9.socbook3.domain.Tag;
import rs.levi9.socbook3.repository.CategoryRepository;

@Service
public class CategoryService {

	private CategoryRepository categoryRepository;

	@Autowired
	public CategoryService(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}
	
	
	public List<Category> findAll() {
		return categoryRepository.findAll();
	}

	public Category findOne(Long id) {
		return categoryRepository.findOne(id);
	}

	public Category save(Category category) {
		return categoryRepository.save(category);
	}

	public void delete(Long id) {
		categoryRepository.delete(id);
	}
	
	public Category findByName(String name){
		return categoryRepository.findByName(name);
	}

	
}
