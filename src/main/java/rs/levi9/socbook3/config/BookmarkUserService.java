package rs.levi9.socbook3.config;

import java.util.HashSet;
import java.util.Set;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import rs.levi9.socbook3.domain.Role;
import rs.levi9.socbook3.domain.User;
import rs.levi9.socbook3.repository.UserRepository;

@Transactional
@Service
public class BookmarkUserService implements UserDetailsService
{

    private UserRepository userRepository;

    @Autowired
    public BookmarkUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            User user = userRepository.findByUsername(username);
            if (user == null) {
                return null;
            }
            return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthorities(user));
        } catch (Exception e) {
            throw new UsernameNotFoundException("User not found");
        }
    }
    
    private Set<GrantedAuthority> getAuthorities(User user){
        Set<GrantedAuthority> authorities = new HashSet<>();
        for(Role role : user.getRoles()) {
            GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(role.getType().toString());
            authorities.add(grantedAuthority);
        }
        return authorities;
    }
}
