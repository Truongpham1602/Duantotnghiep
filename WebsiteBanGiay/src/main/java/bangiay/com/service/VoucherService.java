package bangiay.com.service;

import java.util.List;

import bangiay.com.DTO.VoucherDTO;
import bangiay.com.entity.Voucher;

public interface VoucherService {
	public VoucherDTO create (VoucherDTO voucherDTO) ;
	
	public VoucherDTO update (VoucherDTO voucherDTO);
	
	void deleteById(Integer id);
	
	public VoucherDTO setStatusFalse(Integer id);
	
	List<VoucherDTO> findAll ();
	
	VoucherDTO findById (Integer id);
	
}
