package bangiay.com.DTO;

import lombok.Data;

@Data
public class ResponseTokenDTO {
    private String username;
    private String token;

    public ResponseTokenDTO(String token , String username) {
        this.token = token;
        this.username = username;
    }
}
