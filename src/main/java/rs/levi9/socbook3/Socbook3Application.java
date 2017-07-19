package rs.levi9.socbook3;
 
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;

@EnableGlobalMethodSecurity(prePostEnabled =true)
@SpringBootApplication
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class Socbook3Application
{

	public static void main(String[] args) {
		 SpringApplication.run(Socbook3Application.class, args);
	}

}
