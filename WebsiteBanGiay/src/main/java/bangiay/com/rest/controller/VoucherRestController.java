package bangiay.com.rest.controller;

import java.util.List;

import org.apache.taglibs.standard.lang.jstl.test.beans.PublicBean1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.entity.Voucher;
import bangiay.com.service.impl.VoucherServiceImpl;

@RestController
@RequestMapping ("/api/voucher")
public class VoucherRestController {
	@Autowired
	VoucherServiceImpl voucherServiceImpl;
	
	@GetMapping("/get")
	public List<Voucher> findAll(){
		return voucherServiceImpl.findAll();
	}
	
	@GetMapping("/get/{id}")
	public Voucher findById(@PathVariable Integer id ){
		return voucherServiceImpl.findById(id);
	}
	
	@PostMapping("/create")
	public Voucher create (@RequestBody Voucher voucher ){
		return voucherServiceImpl.create(voucher);
	}
	
	@PutMapping("/update/{id}")
	public Voucher update(@RequestBody Voucher voucher,@PathVariable Integer id) throws Exception {
		
		return voucherServiceImpl.update(voucher, id);
	}
	
}
