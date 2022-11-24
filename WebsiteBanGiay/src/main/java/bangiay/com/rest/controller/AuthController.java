package bangiay.com.rest.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.DTO.LoginDTO;
import bangiay.com.DTO.ResponseTokenDTO;
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

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) throws Exception {
		try {
			authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPass()));
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
		final UserDetails userDetails = accountService.loadUserByUsername(loginDTO.getUsername());

		final String token = jwtUtil.GenerateToken(userDetails);

		return ResponseEntity.ok(new ResponseTokenDTO(token));
	}

//	@PostMapping("/getLoginUser")
//	public String getLogin() {
//		String user_Id = jwtUtil.getUsernameByToken(
//				"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmMiLCJleHAiOjE2NjkxNDA1NDEsInVzZXIiOnsiaWQiOjIwOSwicm9sZUlkIjpudWxsLCJuYW1lUm9sZSI6bnVsbCwiZnVsbE5hbWUiOm51bGwsInBhc3N3b3JkIjpudWxsLCJlbWFpbCI6ImVtYWlsQDEyMyIsInRlbGVwaG9uZSI6IjkxMjM0NTY3ODkiLCJhZGRyZXNzIjpudWxsLCJpbWFnZSI6bnVsbCwiY3JlYXRlZCI6bnVsbCwiY3JlYXRvciI6bnVsbCwibW9kaWZpZWQiOm51bGwsIm1vZGlmaWVyIjpudWxsLCJzdGF0dXMiOm51bGx9LCJpYXQiOjE2NjkwNTQxNDF9.ox5ThLDRSU8GMfa82NQumLv652RMonAsL2_v44qkXGA");
////		System.out.println(token.getToken());
//		return user_Id;
//	}

}
