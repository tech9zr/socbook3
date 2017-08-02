package rs.levi9.socbook3.service;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rs.levi9.socbook3.domain.Bookmark;
import rs.levi9.socbook3.domain.Category;
import rs.levi9.socbook3.domain.User;
import rs.levi9.socbook3.repository.BookmarkRepository;

@Service
public class BookmarkService {
	private BookmarkRepository bookmarkRepository;

	@Autowired
	public BookmarkService(BookmarkRepository bookmarkRepository) {

		this.bookmarkRepository = bookmarkRepository;
	}

	public List<Bookmark> findAll() {
		return bookmarkRepository.findAll();
	}

	public Bookmark findOne(Long id) {
		return bookmarkRepository.findOne(id);
	}

	public Bookmark save(Bookmark bookmark) {
		return bookmarkRepository.save(bookmark);
	}

	public void delete(Long id) {
		bookmarkRepository.delete(id);
	}

	public List<Bookmark> findByUser(User user) {
		return bookmarkRepository.findByUser(user);
	}
	public List<Bookmark> findByVisible() {
		return bookmarkRepository.findByVisibleIsTrue();
	}
	
	public List<Bookmark> findByUserAndVisible(User user){
		return bookmarkRepository.findByUserAndVisibleIsTrue(user);
	}
	
	public List<Bookmark> findByDescriptionContainingAndVisible(String desc){
		return bookmarkRepository.findByDescriptionContainingAndVisibleIsTrue(desc);
	}
	
	public List<Bookmark> findByTitleAndVisible(String title){
		return bookmarkRepository.findByTitleAndVisibleIsTrue(title);
	}
	
	public List<Bookmark> findByCategoryAndVisible(Category category){
		return bookmarkRepository.findByCategoryAndVisibleIsTrue(category);
	}

	public List<Bookmark>findByVisibleIsTrueAndUserIdIsNot(Long id){
		return bookmarkRepository.findByVisibleIsTrueAndUserIdIsNot(id);
	}
	
	public Bookmark deleteByTitle(String title){
		return bookmarkRepository.deleteByTitle(title);
	}
	
	public List<Bookmark> findByTitle(String title){
		return bookmarkRepository.findByTitle(title);
	}
	
	
}
