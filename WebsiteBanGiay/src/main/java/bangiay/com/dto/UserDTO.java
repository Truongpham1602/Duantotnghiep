package bangiay.com.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
	private String email;
	private String phone_Number;
	private String PassWord;
	private String address;
	private String fullName;
}
