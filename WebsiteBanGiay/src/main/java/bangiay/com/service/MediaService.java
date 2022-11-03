package bangiay.com.service;

import bangiay.com.DTO.request.CartDTO;
import bangiay.com.DTO.request.MediaDTO;
import bangiay.com.DTO.respon.ResponCartDTO;
import bangiay.com.DTO.respon.ResponMediaDTO;
import bangiay.com.entity.Cart;
import bangiay.com.entity.Media;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MediaService {
    ResponseEntity<String> createMedia(String mediaRequest, MultipartFile multipartImage);
    List<ResponMediaDTO> findAll();

    MediaDTO updateMedia(MediaDTO mediaDTO);
    void deleteById(Integer id);
    Media findByID(Integer id);
}
