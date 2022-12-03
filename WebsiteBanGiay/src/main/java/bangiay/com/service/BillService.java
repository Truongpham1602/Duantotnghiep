package bangiay.com.service;

import java.util.List;

import bangiay.com.DTO.BillDTO;
import bangiay.com.DTO.UserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BillService {

	public BillDTO createBill(BillDTO billDTO, Integer user_Id);

	Page<BillDTO> findAll(Pageable pageable);

	public BillDTO updateBill(BillDTO billDTO);

	public void deleteById(Integer id);

	public BillDTO findByID(Integer id);

}
