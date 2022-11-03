package bangiay.com.rest.controller;

import bangiay.com.DTO.respon.ResponCartDTO;
import bangiay.com.DTO.respon.ResponMediaDTO;
import bangiay.com.service.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "media")
public class MediaRestController {
    @Autowired
    private MediaService mediaService;

    @PostMapping(value = "/create",consumes = {MediaType.APPLICATION_JSON_VALUE,MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> createMedia(
            @RequestPart(value = "media", required = false) String mediaRequest,
            @RequestPart(value = "static/image", required = false) MultipartFile multipartImage


    ) throws IOException {
        return mediaService.createMedia(mediaRequest,multipartImage);
    }
    @GetMapping("/getAll")
    public ResponseEntity<List<ResponMediaDTO>> getAll() {

        return ResponseEntity.ok().body(mediaService.findAll());
    }
}
