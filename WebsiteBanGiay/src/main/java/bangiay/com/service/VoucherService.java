package bangiay.com.service;

import java.util.List;

import bangiay.com.entity.Voucher;

public interface VoucherService {
	Voucher create (Voucher voucher) ;
	
	Voucher update (Voucher voucher, Integer id) throws Exception;
	
	void deleteById(Integer id);
	
	List<Voucher> findAll ();
	
	Voucher findById (Integer id);
	
}
