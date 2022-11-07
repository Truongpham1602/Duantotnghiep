package bangiay.com.DTO.authentication;

import lombok.Data;

@Data
public class AuthResponse {
    private String accessToken;
    private Long expiresIn;
    private String[] scopes;
}
