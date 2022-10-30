package bangiay.com.service.impl;

import bangiay.com.DTO.request.BillDTO;
import bangiay.com.DTO.respon.ResponBillDTO;
import bangiay.com.DTO.respon.ResponCartDTO;
import bangiay.com.dao.BillDao;
import bangiay.com.entity.Bill;
import bangiay.com.entity.Cart;
import bangiay.com.service.BillService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class BillServiceIml implements BillService {
    @Autowired
    private BillDao billDao;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Bill createBill(Bill bill) {
        billDao.save(bill);
        return bill;
    }

    @Override
    public List<ResponBillDTO> findAll() {
        return billDao.findAll().stream()
                .map(bill -> modelMapper.map(bill, ResponBillDTO.class))
                .collect(Collectors.toList());
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
    public Bill findByID(Integer id) {
        return billDao.findById(id).orElseThrow(() -> new RuntimeException( "Bill isn't existed"));
    }
}
