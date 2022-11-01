package bangiay.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;


import bangiay.com.entity.Voucher;

public interface VoucherDAO extends JpaRepository<Voucher, Integer>{
	
}
