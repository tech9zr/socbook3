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
	public List<Bookmark> findByVisible(boolean visible) {
		return bookmarkRepository.findByVisible(visible);
	}
	
	public List<Bookmark> findByUserAndVisible(User user, boolean visible){
		return bookmarkRepository.findByUserAndVisible(user, visible);
	}
	
	public List<Bookmark> findByDescriptionContainingAndVisible(String desc,boolean visible){
		return bookmarkRepository.findByDescriptionContainingAndVisible(desc,visible);
	}
	
	public List<Bookmark> findByTitleAndVisible(String title, boolean visible){
		return bookmarkRepository.findByTitleAndVisible(title, visible);
	}
	
	public List<Bookmark> findByCategoryAndVisible(Category category, boolean visible){
		return bookmarkRepository.findByCategoryAndVisible(category, visible);
	}

	
}