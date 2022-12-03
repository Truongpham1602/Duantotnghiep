package bangiay.com.service.impl;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import bangiay.com.DTO.UserDTO;
import bangiay.com.utils.ObjectMapperUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import bangiay.com.DTO.BillDTO;
import bangiay.com.DTO.BillDetailDTO;
import bangiay.com.DTO.OrdersDTO;
import bangiay.com.dao.BillDao;
import bangiay.com.dao.UserDao;
import bangiay.com.entity.Bill;
import bangiay.com.service.BillService;
import bangiay.com.service.Bill_DetailService;
import bangiay.com.service.OrderService;

@Service
public class BillServiceImpl implements BillService {
	@Autowired
	private BillDao billDao;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private UserDao userDao;

	@Autowired
	private OrderService orderService;

	@Autowired
	private Bill_DetailService bill_DetailService;

	@Override
	public BillDTO createBill(BillDTO billDTO, Integer user_IdOrName_Recipient) {
		List<OrdersDTO> lstOrder = this.orderService.findOrderBySize_ID(user_IdOrName_Recipient);
		Bill bill = modelMapper.map(billDTO, Bill.class);
		if (billDTO.getUserId() != null) {
			bill.setUSER_ID(userDao.findById(billDTO.getUserId()).orElse(null));
		}
		bill.setCreated(Timestamp.from(Instant.now()));
		// Insert Bill to DB
		this.billDao.save(bill);
		billDTO.setCreated(bill.getCreated());
		billDTO.setCreator(bill.getCreator());
		billDTO.setId(bill.getId());
		// find OrderBySize_ID
		List<BillDetailDTO> lstBillDetail = new ArrayList<BillDetailDTO>();
		for (int i = 0; i < lstOrder.size(); i++) {
			if (lstOrder.get(i).getStatus() == 1) {
				if (lstOrder.get(i).getTelephone() != null) {
				}
				if (lstOrder.get(i).getVoucherId() != null) {
					lstBillDetail.add(new BillDetailDTO(null, bill.getId(), lstOrder.get(i).getSizeId(),
							lstOrder.get(i).getVoucherId(), lstOrder.get(i).getQuantity(), lstOrder.get(i).getPrice()));
				} else {
					lstBillDetail.add(new BillDetailDTO(null, bill.getId(), lstOrder.get(i).getSizeId(), null,
							lstOrder.get(i).getQuantity(), lstOrder.get(i).getPrice()));
				}
			}
		}
		this.bill_DetailService.createAll(lstBillDetail);
		return billDTO;
	}

	@Override
	public Page<BillDTO> findAll(Pageable pageable) {

		return ObjectMapperUtils.mapEntityPageIntoDtoPage(billDao.findAll(pageable), BillDTO.class);
	}

	@Override
	public BillDTO updateBill(BillDTO billDTO) {
		Bill bill = billDao.findById(billDTO.getId()).orElseThrow(() -> new RuntimeException("Bill isn't existed"));
		bill.setCode(billDTO.getCode());
		bill.setNameRecipient(bill.getNameRecipient());
		bill.setTelephone(bill.getTelephone());
		bill.setAddress(bill.getAddress());
		bill.setModified(Timestamp.from(Instant.now()));
		Bill bill1 = billDao.save(bill);
		billDTO.setCreator(bill1.getCreator());
		billDTO.setModifier(bill1.getModifier());
		billDTO.setId(bill1.getId());
		return billDTO;
	}

	@Override
	public void deleteById(Integer id) {
		Bill bill = billDao.findById(id).orElseThrow(() -> new RuntimeException("Bill isn't existed"));
		billDao.save(bill);
	}

	@Override
	public BillDTO findByID(Integer id) {
		Bill bill = billDao.findById(id).orElseThrow(() -> new RuntimeException("Bill isn't existed"));
		BillDTO billDTO = modelMapper.map(bill, BillDTO.class);
		return billDTO;
	}
}
