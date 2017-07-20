package rs.levi9.socbook3.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rs.levi9.socbook3.domain.Bookmark;
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

}
