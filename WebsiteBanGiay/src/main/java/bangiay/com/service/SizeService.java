package bangiay.com.service;

import java.util.List;

import org.springframework.stereotype.Service;
import java.util.List;
import bangiay.com.DTO.SizeDTO;


@Service
public interface SizeService {
	public List<SizeDTO> findAll();
	
	public SizeDTO save(SizeDTO sizeDTO);
	
	public SizeDTO findById(Integer id);
	
	public SizeDTO findSizeByProductId(Integer id);
	
	public void delete(Integer id);
	
}
