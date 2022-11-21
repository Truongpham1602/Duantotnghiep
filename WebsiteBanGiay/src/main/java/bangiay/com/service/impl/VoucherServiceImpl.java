package bangiay.com.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bangiay.com.dao.VoucherDao;
import bangiay.com.entity.Voucher;
import bangiay.com.service.VoucherService;

@Service
public class VoucherServiceImpl implements VoucherService {
	@Autowired
	VoucherDao voucherDAO;

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

		return voucherDAO.save(voucher1);
	}

	@Override
	public void deleteById(Integer id) {
		voucherDAO.deleteById(id);

	}

	@Override
	public List<Voucher> findAll() {
		// TODO Auto-generated method stub
		return voucherDAO.findAll();
	}

	@Override
	public Voucher findById(Integer id) {
		// TODO Auto-generated method stub
		return voucherDAO.findById(id).orElseGet(null);
	}

}
