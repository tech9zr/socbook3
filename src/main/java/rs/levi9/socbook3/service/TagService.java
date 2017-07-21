package rs.levi9.socbook3.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rs.levi9.socbook3.domain.Tag;
import rs.levi9.socbook3.repository.TagRepository;

@Service
public class TagService {

	private TagRepository tagRepository;

	@Autowired
	public TagService(TagRepository tagRepository) {
		this.tagRepository = tagRepository;
	}

	public List<Tag> findAll() {
		return tagRepository.findAll();
	}

	public Tag findOne(Long id) {
		return tagRepository.findOne(id);
	}

	public Tag save(Tag tag) {
		return tagRepository.save(tag);
	}

	public void delete(Long id) {
		tagRepository.delete(id);
	}
	
	public List<Tag> findByName(String name){
		return tagRepository.findByName(name);
	}

}
