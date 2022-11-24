package bangiay.com.DTO;

import lombok.Data;

@Data
public class ResponseTokenDTO {

	private String token;

	public ResponseTokenDTO(String token) {
		this.token = token;
	}

}
