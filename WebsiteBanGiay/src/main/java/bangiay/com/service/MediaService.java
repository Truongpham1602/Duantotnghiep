package bangiay.com.service;

import java.util.List;

import bangiay.com.DTO.MediaDTO;

public interface MediaService {

	List<MediaDTO> findAll();

	List<MediaDTO> createAll(List<MediaDTO> mediaDTO);

	MediaDTO update(MediaDTO mediaDTO);

	void delete(Integer id);
}
