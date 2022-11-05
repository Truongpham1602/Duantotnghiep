package bangiay.com.service;

import java.util.List;

import bangiay.com.DTO.BillDTO;

public interface BillService {

	public BillDTO createBill(BillDTO billDTO, Integer user_Id);

	public List<BillDTO> findAll();

	public BillDTO updateBill(BillDTO billDTO);

	public void deleteById(Integer id);

	public BillDTO findByID(Integer id);

}
