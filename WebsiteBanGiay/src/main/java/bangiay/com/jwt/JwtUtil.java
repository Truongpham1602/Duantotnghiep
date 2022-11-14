package bangiay.com.jwt;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class JwtUtil {
    private static final String ADMIN = "ROLE_ADMIN";
    private static final String CUSTOMER = "ROLE_KHACHHANG";
    private static final String STAFF = "ROLE_NHANVIEN";


    private String secret;

    private int jwtExpirationInMs;

    @Value("${jwt.secret}")
    public void setSecret(String secret) {
        this.secret = secret;
    }
    @Value("${jwt.jwtExpirationInMs}")
    public void setJwtExpirationInMs(int jwtExpirationInMs) {
        this.jwtExpirationInMs = jwtExpirationInMs;
    }


    public String GenerateToken(UserDetails userDetails){
        Map<String, Object> claims = new HashMap<>();
        Collection<? extends GrantedAuthority> roles = userDetails.getAuthorities();
        if (roles.contains(new SimpleGrantedAuthority(ADMIN))){
            claims.put("isADMIN", true);
        }
        if (roles.contains(new SimpleGrantedAuthority(CUSTOMER))){
            claims.put("isKhachHang", true);
        }
        if (roles.contains(new SimpleGrantedAuthority(STAFF))){
            claims.put("isNhanVien", true);
        }



        return Jwts.builder().setClaims(claims).setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationInMs))
                .signWith(SignatureAlgorithm.HS512, secret).compact();

    }

    public boolean validateToken(String token){
        try {
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        }catch (SignatureException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException exception){
            throw new BadCredentialsException("INVALID_CREDENTIALS",exception);
        }catch (ExpiredJwtException e){
            throw e;
        }
    }

    public String getUsernameByToken(String token){
        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    public List<SimpleGrantedAuthority> getRoleByToken(String token){
        List<SimpleGrantedAuthority> roles = null;
        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
        Boolean isADMIN = claims.get("isADMIN", Boolean.class);
        Boolean isKhachHang = claims.get("isKhachHang", Boolean.class);
        Boolean isNhanVien = claims.get("isNhanVien", Boolean.class);

        if (isADMIN != null && isADMIN == true){
            roles = Arrays.asList(new SimpleGrantedAuthority(ADMIN));
        }
        if (isKhachHang != null && isKhachHang == true){
            roles = Arrays.asList(new SimpleGrantedAuthority(CUSTOMER));
        }
        if (isNhanVien != null && isNhanVien == true){
            roles = Arrays.asList(new SimpleGrantedAuthority(STAFF));
        }

        return roles;
    }
}
