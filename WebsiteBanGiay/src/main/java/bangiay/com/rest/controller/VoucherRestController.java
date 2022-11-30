package bangiay.com.rest.controller;

import java.util.List;

import org.apache.taglibs.standard.lang.jstl.test.beans.PublicBean1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.DTO.VoucherDTO;
import bangiay.com.entity.Voucher;
import bangiay.com.service.VoucherService;
import bangiay.com.service.impl.VoucherServiceImpl;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping ("/api/voucher")
public class VoucherRestController {
	@Autowired
	VoucherService voucherService;
	
	@GetMapping("/get")
	public List<VoucherDTO> findAll(){
		return voucherService.findAll();
	}
	
	@GetMapping("/get/{id}")
	public VoucherDTO findById(@PathVariable Integer id ){
		return voucherService.findById(id);
	}
	
	@PostMapping("/create")
	public VoucherDTO create (@RequestBody VoucherDTO voucherDTO ){
		return voucherService.create(voucherDTO);
	}
	
	@PutMapping("/update/{id}")
	public VoucherDTO update(@RequestBody VoucherDTO voucherDTO,@PathVariable Integer id) {
		voucherDTO.setId(id);
		System.out.println("trường :"+voucherDTO.getCategoryId());
		return voucherService.update(voucherDTO);
	}
	
	@PutMapping("/setStatusFalse/{id}")
	public VoucherDTO setStatusFalse(@PathVariable Integer id) {
		return voucherService.setStatusFalse(id);
	}
	
	
}
