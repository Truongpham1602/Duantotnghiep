package bangiay.com.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;

import bangiay.com.DTO.VoucherDTO;
import bangiay.com.entity.Voucher;

public interface VoucherService {
	public VoucherDTO create (VoucherDTO voucherDTO) ;
	
	public VoucherDTO update (VoucherDTO voucherDTO);
	
	void deleteById(Integer id);
	
	public VoucherDTO setStatusFalse(Integer id);

	public Page<VoucherDTO> findAll (Integer size , Integer page);
	
	VoucherDTO findById (Integer id);
	
}
