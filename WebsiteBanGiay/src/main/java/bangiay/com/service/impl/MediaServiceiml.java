package bangiay.com.service.impl;

import bangiay.com.DTO.request.MediaDTO;
import bangiay.com.DTO.respon.ResponCartDTO;
import bangiay.com.DTO.respon.ResponMediaDTO;
import bangiay.com.dao.MediaDao;
import bangiay.com.dao.ProductDao;
import bangiay.com.entity.Media;
import bangiay.com.service.MediaService;
import bangiay.com.utils.ImageHelper;
import bangiay.com.utils.ObjectMapperUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MediaServiceiml implements MediaService {
    @Autowired
    private MediaDao mediaDao;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ProductDao productDao;

    @Override
    public ResponseEntity<String> createMedia(String mediaRequest, MultipartFile multipartImage) {
        MediaDTO mediaDTO = ObjectMapperUtils.readValue(mediaRequest, MediaDTO.class);
        Media media = ObjectMapperUtils.map(mediaDTO, Media.class);
        media.setDescription(mediaDTO.getDescription());
        media.setProduct(productDao.findById(mediaDTO.getProductId()).orElse(null));
        media.setType(mediaDTO.getType());
        media.setUrl("anhthe.jpg");
//        if (multipartImage != null) {
//            String pathName = System.currentTimeMillis() + "";
//            ImageHelper.image(multipartImage, pathName);
 //    media.setUrl(pathName);
//        } else media.setUrl("src/main/resources/static/image/long.jpg");
         mediaDao.save(media);
        return ResponseEntity.ok().body("CREATE SUCCESS");
    }

    @Override
    public List<ResponMediaDTO> findAll() {
        return mediaDao.findAll().stream()
                .map(media -> modelMapper.map(media, ResponMediaDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public MediaDTO updateMedia(MediaDTO mediaDTO) {
        return null;
    }

    @Override
    public void deleteById(Integer id) {

    }

    @Override
    public Media findByID(Integer id) {
        return null;
    }
}
