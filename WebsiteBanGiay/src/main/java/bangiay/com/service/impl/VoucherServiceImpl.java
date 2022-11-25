package bangiay.com.service.impl;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bangiay.com.DTO.VoucherDTO;
import bangiay.com.dao.CategoryDao;
import bangiay.com.dao.VoucherDao;
import bangiay.com.entity.Voucher;
import bangiay.com.service.VoucherService;

@Service
public class VoucherServiceImpl implements VoucherService {
	@Autowired
	private VoucherDao voucherDAO;
	
	@Autowired
	private CategoryDao cateDao;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public VoucherDTO create(VoucherDTO voucherDTO) {
		Voucher voucher = modelMapper.map(voucherDTO, Voucher.class);
		voucher.setCategory(this.cateDao.findById(voucherDTO.getCategoryId()).get());
		voucher.setStatus(voucherDTO.getStatus());
		this.voucherDAO.save(voucher);
		voucherDTO.setId(voucher.getId());
		voucherDTO.setName_cate(voucher.getCategory().getNamecate());
		return voucherDTO;
	}

	@Override
	public VoucherDTO update(VoucherDTO voucherDTO) {
		Voucher voucher = modelMapper.map(voucherDTO, Voucher.class);
		Voucher vou = voucherDAO.findById(voucherDTO.getId()).get();
		voucher.setCategory(this.cateDao.findById(voucherDTO.getCategoryId()).get());
		voucher.setModified(Timestamp.from(Instant.now()));
		this.voucherDAO.save(voucher);
		voucherDTO.setId(voucher.getId());
//		voucherDTO.setCreated(new Timestamp(voucher.getCreated().getTime()));
		voucherDTO.setModified(new Timestamp(voucher.getModified().getTime()));
		voucherDTO.setName_cate(voucher.getCategory().getNamecate());
		voucherDTO.setDescription(voucher.getDescription());
		return voucherDTO;
	}

	@Override
	public void deleteById(Integer id) {
		voucherDAO.deleteById(id);

	}

	
	public List<VoucherDTO> findAll() {
		// TODO Auto-generated method stub
		List<Voucher> vou = voucherDAO.findAll();
		List<VoucherDTO> result = vou.stream().map(d -> modelMapper.map(d, VoucherDTO.class)).collect(Collectors.toList());
		for (int i = 0; i < vou.size(); i ++) {
			result.get(i).setCategoryId(vou.get(i).getCategory().getId());
			result.get(i).setName_cate(vou.get(i).getCategory().getNamecate());
		}
		return result;
	}

	@Override
	public VoucherDTO findById(Integer id) {
		// TODO Auto-generated method stub
		Voucher voucher = voucherDAO.findById(id).orElseGet(null);
		VoucherDTO vou = modelMapper.map(voucher, VoucherDTO.class);
		vou.setCategoryId(voucher.getCategory().getId());
		return vou ;
	}

	@Override
	public VoucherDTO setStatusFalse(Integer id) {
		Voucher voucher = this.voucherDAO.findById(id).orElseGet(null);
		voucher.setStatus(0);
		this.voucherDAO.save(voucher);
		VoucherDTO vou = modelMapper.map(voucher, VoucherDTO.class);
		vou.setStatus(0);
		return vou;
	}

}
