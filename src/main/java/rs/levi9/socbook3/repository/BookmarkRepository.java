package rs.levi9.socbook3.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rs.levi9.socbook3.domain.Bookmark;
import rs.levi9.socbook3.domain.Tag;
import rs.levi9.socbook3.domain.User;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

	public List<Bookmark> findByUser(User user);// pretraga po imenu korisnika, svi privatni i javni 

	public List<Bookmark> findByVisible(boolean visible);  // pretraga po vidljivosti svi javni ili privatni za sve korisnike

	public List<Bookmark> findByUserAndVisible(User user, boolean visible); // pretraga po imenu korisnika i samo javni 

	
}
