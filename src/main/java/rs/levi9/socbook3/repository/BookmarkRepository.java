package rs.levi9.socbook3.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rs.levi9.socbook3.domain.Bookmark;
import rs.levi9.socbook3.domain.Category;
import rs.levi9.socbook3.domain.User;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

	public List<Bookmark> findByUser(User user);

	public List<Bookmark> findByVisible(boolean visible);

	public List<Bookmark> findByUserAndVisible(User user, boolean visible);

	public List<Bookmark> findByDescriptionContainingAndVisible(String desc, boolean visible); 
	
	public List<Bookmark> findByTitleAndVisible(String title, boolean visible);
	
	public List<Bookmark> findByCategoryAndVisible(Category category, boolean visible);
	
	
}
