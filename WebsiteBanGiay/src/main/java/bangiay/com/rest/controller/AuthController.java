package bangiay.com.rest.controller;

import bangiay.com.DTO.authentication.AuthRequest;
import bangiay.com.DTO.authentication.AuthResponse;
import bangiay.com.common.constants.SSWConstant;
import bangiay.com.common.utils.SecurityUtilities;
import bangiay.com.entity.User;
import bangiay.com.service.UserService;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.IOException;
import java.util.Calendar;
import java.util.Date;


@RestController
@RequestMapping(SSWConstant.PREFIX_API_URL)
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    private final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) throws IOException {
        System.out.println("vào rồi");
        try {

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            e.printStackTrace();
        }

        User user = userService.findByUsername(authRequest.getUsername());

        if (user == null || !new BCryptPasswordEncoder().matches(authRequest.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Incorrect username or password");
        }

        int tokenLifeTime = 36000000;

        Date issuedAt = new Date();

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(issuedAt);
        calendar.add(Calendar.SECOND, tokenLifeTime);
        Date expireAt = calendar.getTime();
        //List<String> scopes = user.getRole().stream().map(Role::getName).toList();
        String scopes = user.getRole().toString().trim();

        String token = Jwts.builder()
                .setIssuedAt(issuedAt)
                .setExpiration(expireAt)
                .claim("scope", scopes)
                .claim("username", user.getFullName())
                .signWith(SecurityUtilities.getPrivateKey("privatekey.pem"))
                .compact();

        AuthResponse authResponse = new AuthResponse();
        authResponse.setAccessToken(token);
        authResponse.setExpiresIn(expireAt.getTime());
        //authResponse.setScopes(scopes.toArray(new String[]{}));
        authResponse.setScopes(scopes.split(scopes));
        return ResponseEntity.ok().body(authResponse);
    }

}
