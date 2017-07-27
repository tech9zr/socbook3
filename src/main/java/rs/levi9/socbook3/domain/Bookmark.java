package rs.levi9.socbook3.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
@Table(name = "bookmark")
public class Bookmark extends BaseEntity implements Serializable {

	private static final long serialVersionUID = 817056055809397349L;

	@NotNull
	@ManyToOne

	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@NotNull()
	@Column(unique = false, nullable = false, name = "title")
	private String title;

	@NotNull()
	@Column(unique = false, nullable = false, name = "description")
	private String description;

	@NotNull()
	@ManyToOne
	@JoinColumn(name = "category_id", nullable = false, unique = false)
	private Category category;

	@Cascade(CascadeType.PERSIST)
	@ManyToMany
	@Column(name = "tags")
	@JoinTable(joinColumns = @JoinColumn(name = "bookmark_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
	private Set<Tag> tags;

	@NotNull()
	@Column(unique = false, nullable = false, name = "url")
	private String url;

	@NotNull()
	@Column(unique = false, nullable = false, name = "visible")
	private boolean visible;

	@NotNull()
	@Column(unique = false, nullable = false, name = "creation_date")
	private Date creationDate;

	public Bookmark() {

	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set<Tag> getTags() {
		return tags;
	}

	public void setTags(Set<Tag> tags) {
		this.tags = tags;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public boolean isVisible() {
		return visible;
	}

	public void setVisible(boolean visible) {
		this.visible = visible;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

}
