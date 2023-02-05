package bangiay.com.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthenticationDto {

	private String token;
	private String name;
	private String email;
	private String role;
	private String image;
}
