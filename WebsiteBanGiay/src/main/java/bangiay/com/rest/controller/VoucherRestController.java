package bangiay.com.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bangiay.com.DTO.VoucherDTO;
import bangiay.com.service.VoucherService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/voucher")
public class VoucherRestController {
	@Autowired
	VoucherService voucherService;

	@PreAuthorize("hasPermission(#req, 'VOUCHER_VIEW') or hasPermission(#req, 'ADMIN')")
	@GetMapping("/get")
	public Page<VoucherDTO> findAll(@RequestParam(name = "size", defaultValue = "7") Integer size,
			@RequestParam(name = "page", defaultValue = "0") Integer page) {
		return voucherService.findAll(size, page);
	}

	@PreAuthorize("hasPermission(#req, 'VOUCHER_VIEW') or hasPermission(#req, 'ADMIN')")
	@GetMapping("/findAll")
	public List<VoucherDTO> findAll() {
		return voucherService.findAll();
	}

	@PreAuthorize("hasPermission(#req, 'VOUCHER_VIEW') or hasPermission(#req, 'ADMIN')")
	@GetMapping("/get/{id}")
	public VoucherDTO findById(@PathVariable Integer id) {
		return voucherService.findById(id);
	}

	@PreAuthorize("hasPermission(#req, 'VOUCHER_EDIT') or hasPermission(#req, 'ADMIN')")
	@PostMapping("/create")
	public VoucherDTO create(@RequestBody VoucherDTO voucherDTO) {
		return voucherService.create(voucherDTO);
	}

	@PreAuthorize("hasPermission(#req, 'VOUCHER_EDIT') or hasPermission(#req, 'ADMIN')")
	@PutMapping("/update/{id}")
	public VoucherDTO update(@RequestBody VoucherDTO voucherDTO, @PathVariable Integer id) {
		voucherDTO.setId(id);
		System.out.println("trường :" + voucherDTO.getCategoryId());
		return voucherService.update(voucherDTO);
	}

	@PreAuthorize("hasPermission(#req, 'VOUCHER_EDIT') or hasPermission(#req, 'ADMIN')")
	@PutMapping("/setStatusFalse/{id}")
	public VoucherDTO setStatusFalse(@PathVariable Integer id) {
		return voucherService.setStatusFalse(id);
	}

}
