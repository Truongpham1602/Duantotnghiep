package bangiay.com.service;

import java.util.List;

import bangiay.com.DTO.BillDetailDTO;

public interface Bill_DetailService {
	public List<BillDetailDTO> findAll();
	
	public List<BillDetailDTO> createAll(List<BillDetailDTO> billDetailDTO);
	
	public BillDetailDTO update(BillDetailDTO billDetailDTO);
	
	public BillDetailDTO finById(int id);
	
	public void delete(int id);

}
