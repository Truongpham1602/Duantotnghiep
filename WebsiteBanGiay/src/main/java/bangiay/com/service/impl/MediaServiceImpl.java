package bangiay.com.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bangiay.com.DTO.MediaDTO;
import bangiay.com.dao.MediaDao;
import bangiay.com.entity.Media;
import bangiay.com.service.MediaService;

@Service
public class MediaServiceImpl implements MediaService {

	@Autowired
	private MediaDao mediaDao;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<MediaDTO> findAll() {
		List<Media> media = this.mediaDao.findAll();
		List<MediaDTO> mediaDTO = media.stream().map(d -> modelMapper.map(d, MediaDTO.class))
				.collect(Collectors.toList());
		return mediaDTO;
	}

	@Override
	public List<MediaDTO> createAll(List<MediaDTO> mediaDTO) {
		List<Media> media = mediaDTO.stream().map(d -> modelMapper.map(d, Media.class)).collect(Collectors.toList());
		this.mediaDao.saveAll(media);
		return mediaDTO;
	}

	@Override
	public MediaDTO update(MediaDTO mediaDTO) {
		Media media = modelMapper.map(mediaDTO, Media.class);
		this.mediaDao.save(media);
		return mediaDTO;
	}

	@Override
	public void delete(Integer id) {
		this.mediaDao.deleteById(id);
	}

	@Override
	public List<MediaDTO> findAllByPro_Id(Integer product_Id) {
		List<Media> lst = this.mediaDao.findMediaByProduct_Id(product_Id);
		List<MediaDTO> lstMediaDTO = lst.stream().map(d -> modelMapper.map(d, MediaDTO.class))
				.collect(Collectors.toList());
		return lstMediaDTO;
	}

}
