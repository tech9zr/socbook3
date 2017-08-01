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


	public List<Bookmark> findByVisibleIsTrue(); 
	public List<Bookmark> findByUserAndVisibleIsTrue(User user);

	public List<Bookmark> findByDescriptionContainingAndVisibleIsTrue(String desc); 
	
	public List<Bookmark> findByTitleAndVisibleIsTrue(String title);
	
	public List<Bookmark> findByCategoryAndVisibleIsTrue(Category category);
	
	public List<Bookmark> findByVisibleIsTrueAndUserIdIsNot(Long user_id);
	public Bookmark deleteByTitle(String title);

	public List<Bookmark> findByTitle (String title);
	
	
}
