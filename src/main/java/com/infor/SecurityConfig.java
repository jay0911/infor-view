package com.infor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices;

import com.infor.security.UserService;

@EnableWebSecurity 
@Configuration
@ComponentScan("com")
public class SecurityConfig extends WebSecurityConfigurerAdapter{
    @Bean
    public UserService userService() {
        return new UserService();
    }
    
    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }

    /**
     * in this case, the html or jsp must have <input type="checkbox" name="remember-me" /> to use this
     * @return
     */
    @Bean
    public TokenBasedRememberMeServices rememberMeServices() {
        return new TokenBasedRememberMeServices("remember-me-key", userService());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
	}
    
    @Bean(name="myAuthenticationManager")
    public AuthenticationManager authenticationManagerBean() throws Exception {	
    	return super.authenticationManagerBean();
    }
    
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
        .eraseCredentials(true)
        .userDetailsService(userService())
        .passwordEncoder(passwordEncoder());
    }
    
    /**
     * @see http://docs.spring.io/spring-security/site/docs/3.2.x/guides/form.html
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {        
	    http
	        .authorizeRequests()
	        .antMatchers("/","/getroles", "/homepagepublic","/registerhere","/login","/loginhere", "/js/**","/css/**","/sidemenus/**").permitAll()
	        .anyRequest().authenticated()
	        .and()
	    .formLogin()
	        .loginPage("/homepagepublic")
	        .defaultSuccessUrl("/homepage", true)
	        .permitAll()
	        .and()     
	    .logout()
	    	.logoutUrl("/logout")
	    	.logoutSuccessUrl("/homepagepublic")
	        .permitAll()
	        .and()
	        .csrf().disable();
	}
}
