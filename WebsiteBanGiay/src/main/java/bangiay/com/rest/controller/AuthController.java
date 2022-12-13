package bangiay.com.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.DTO.LoginDTO;
import bangiay.com.dao.UserDao;
import bangiay.com.entity.User;
import bangiay.com.jwt.JwtUtil;
import bangiay.com.service.AccountService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	AccountService accountService;

	@Autowired
	JwtUtil jwtUtil;

	@Autowired
	UserDao userDao;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) throws Exception {
		try {
			List<User> u = this.userDao.findUserByEmailOrTelePhone(loginDTO.getUsername(), loginDTO.getUsername());
			if (u.isEmpty()) {
				throw new Exception("tên đăng nhập không đúng");
			}
			if (u.size() > 1) {
				throw new Exception("tên đăng nhập vượt quá mức");
			}
			if (u.get(0).getPassword().equals(loginDTO.getPass())) {
				User user = u.get(0);

				UserDetails userDetails = accountService.loadUserByUsername(loginDTO.getUsername());

//				UserDetails userDetails = org.springframework.security.core.userdetails.User.withUsername(user.getEmail())
//						.password(user.getPassword()).build();

				String token = jwtUtil.GenerateToken(userDetails);
				return ResponseEntity.ok(token);
			} else {
				throw new Exception("Mat khau khong dung");
			}

//			authenticationManager
//					.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPass()));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}

//		final UserDetails userDetails = accountService.loadUserByUsername(loginDTO.getUsername());
//
//		final String token = jwtUtil.GenerateToken(userDetails);
//		System.out.println(jwtUtil.getUsernameByToken(token));
//		return token;
//		final UserDetails userDetails = accountService.loadUserByUsername(loginDTO.getUsername());
//
//		final String token = jwtUtil.GenerateToken(userDetails);

//		return ResponseEntity.ok(new ResponseTokenDTO(token));
	}

//	@PostMapping("/getLoginUser")
//	public String getLogin(@ModelAttribute ResponseTokenDTO token) {
//		String user_Id = jwtUtil.getUsernameByToken(token.getToken());
//		return user_Id;
//	}

}
