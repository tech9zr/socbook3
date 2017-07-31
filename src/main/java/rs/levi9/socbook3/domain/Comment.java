package rs.levi9.socbook3.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "comment")
public class Comment extends BaseEntity implements Serializable {
	private static final long serialVersionUID = -5348636843163171472L;

	@NotNull()
	@Column(unique = false, nullable = false, name = "content")
	private String content;

	@NotNull()
	@Column(unique = false, nullable = false, name = "creation_date")
	private Date creationDate;

	@NotNull
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User authorId;

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public User getAuthorId() {
		return authorId;
	}

	public void setAuthorId(User authorId) {
		this.authorId = authorId;
	}

	public Comment() {
	}

}
