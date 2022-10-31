package bangiay.com.service;

import bangiay.com.DTO.request.BillDTO;
import bangiay.com.DTO.respon.ResponBillDTO;

import java.util.List;

public interface BillService {
    
	public BillDTO createBill(BillDTO billDTO, Integer size_Id);
    
	public List<ResponBillDTO> findAll();

	public BillDTO updateBill(BillDTO billDTO);

	public void deleteById(Integer id);

	public BillDTO findByID(Integer id);
}
