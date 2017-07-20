package rs.levi9.socbook3.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rs.levi9.socbook3.domain.Tag;

@Repository
public interface TagRepository  extends JpaRepository<Tag, Long> {

}
