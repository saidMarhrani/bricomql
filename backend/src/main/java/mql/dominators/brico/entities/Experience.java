package mql.dominators.brico.entities;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "experiences")
public class Experience {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long experienceId;

	@NotEmpty
	private String title;

	@NotEmpty
	private String description;

	@NotEmpty
	private String company;

	@JsonFormat(pattern = "dd-MM-yyyy")
	private Date start;

	@JsonFormat(pattern = "dd-MM-yyyy")
	private Date end;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

}

