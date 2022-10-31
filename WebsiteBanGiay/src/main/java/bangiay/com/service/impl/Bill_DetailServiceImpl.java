package bangiay.com.service.impl;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bangiay.com.DTO.BillDetailDTO;
import bangiay.com.dao.BillDao;
import bangiay.com.dao.Bill_Detail_Dao;
import bangiay.com.entity.Bill;
import bangiay.com.entity.BillDetail;
import bangiay.com.service.Bill_DetailService;
@Service
public class Bill_DetailServiceImpl implements Bill_DetailService{

	@Autowired
	Bill_Detail_Dao billDetailDao;
	
	@Autowired
	BillDao billDao;
	
	@Autowired
	ModelMapper modelMapper;
	
	@Override
	public List<BillDetailDTO> findAll() {
		List<BillDetail> billDetails = this.billDetailDao.findAll();
		List<BillDetailDTO> billDetailsDTO = billDetails.stream().map(
			b -> modelMapper.map(b,BillDetailDTO.class)).collect(Collectors.toList()
		);
		return billDetailsDTO;
	}

	@Override
	public List<BillDetailDTO> createAll(List<BillDetailDTO> lstBillDetailDTO) {
		BillDetail billDetail = modelMapper.map(lstBillDetailDTO, BillDetail.class);
		List<BillDetail> billDetails = lstBillDetailDTO.stream().map(
    			d -> modelMapper.map(d, BillDetail.class)).collect(Collectors.toList()
    		);
		this.billDetailDao.saveAll(billDetails);
		return lstBillDetailDTO;
	}

	@Override
	public BillDetailDTO update(BillDetailDTO billDetailDTO) {
		return null;
	}

	@Override
	public BillDetailDTO finById(int id) {
		return null;
	}

	@Override
	public void delete(int id) {
	}

}
