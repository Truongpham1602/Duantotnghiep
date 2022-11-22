package bangiay.com.service.impl;

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
	public Voucher create(Voucher voucher) {

		return voucherDAO.save(voucher);
	}

	@Override
	public Voucher update(Voucher voucher, Integer id) throws Exception {
		Voucher voucher1 = voucherDAO.findById(id).orElseThrow(() -> new Exception("id not found"));
		voucher1.setDescription(voucher.getDescription());
		voucher1.setEffectFrom(voucher.getEffectFrom());
		voucher1.setEffectUntil(voucher.getEffectUntil());
		voucher1.setName(voucher.getName());
		voucher1.setStatus(voucher.getStatus());
		return voucherDAO.save(voucher1);
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
			result.get(i).setName_cate(vou.get(i).getCategory().getNamecate());
		}
		return result;
	}

	@Override
	public Voucher findById(Integer id) {
		// TODO Auto-generated method stub
		return voucherDAO.findById(id).orElseGet(null);
	}

}
