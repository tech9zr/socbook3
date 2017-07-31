package rs.levi9.socbook3.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Range;

@Entity
@Table(name = "comment")
public class Comment extends BaseEntity implements Serializable {
	private static final long serialVersionUID = -5348636843163171472L;

	@Column(unique = false, nullable = true, name = "content")
	private String content;

	@NotNull()
	@Column(unique = false, nullable = false, name = "creation_date")
	private Date creationDate;

	@NotNull
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User author;
	
	@Range(min=0, max=5)
	@Column(unique = false, nullable = true, name = "rate")
	private int rate;

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

	public User getAuthor() {
		return author;
	}

	public void setAuthor(User author) {
		this.author = author;
	}

	public int getRate() {
		return rate;
	}

	public void setRate(int rate) {
		this.rate = rate;
	}

	public Comment() {
	}
}
