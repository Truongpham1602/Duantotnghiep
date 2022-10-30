package bangiay.com.service;

import bangiay.com.DTO.request.BillDTO;
import bangiay.com.DTO.request.CartDTO;
import bangiay.com.DTO.respon.ResponBillDTO;
import bangiay.com.DTO.respon.ResponCartDTO;
import bangiay.com.entity.Bill;
import bangiay.com.entity.Cart;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface BillService {
    BillDTO createBill(BillDTO billDTO);
    List<ResponBillDTO> findAll();

    BillDTO updateBill(BillDTO billDTO);

    void deleteById(Integer id);

    Bill findByID(Integer id);
}
