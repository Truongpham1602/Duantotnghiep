package bangiay.com.service;

import java.util.List;

import bangiay.com.DTO.BillDetailDTO;
import bangiay.com.DTO.UserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface Bill_DetailService {
	Page<BillDetailDTO> findAll(Pageable pageable);
	
	public List<BillDetailDTO> createAll(List<BillDetailDTO> billDetailDTO);
	
	public BillDetailDTO update(BillDetailDTO billDetailDTO);
	
	public BillDetailDTO finById(int id);
	
	public void delete(int id);

}
