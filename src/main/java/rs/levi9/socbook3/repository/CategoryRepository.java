package rs.levi9.socbook3.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rs.levi9.socbook3.domain.Bookmark;
import rs.levi9.socbook3.domain.Category;

@Repository
public interface CategoryRepository  extends JpaRepository<Category, Long> {
	 public Category findByName(String name);
}
