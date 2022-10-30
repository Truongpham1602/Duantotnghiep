package bangiay.com.controller;

import bangiay.com.DTO.request.BillDTO;
import bangiay.com.DTO.request.CartDTO;
import bangiay.com.DTO.respon.ResponBillDTO;
import bangiay.com.DTO.respon.ResponCartDTO;
import bangiay.com.entity.Bill;
import bangiay.com.entity.Cart;
import bangiay.com.service.BillService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BillController {
    @Autowired
    private BillService billService;
    @Autowired
    private ModelMapper modelMapper;

    private static Logger logger = LoggerFactory.getLogger(BillController.class);

    @GetMapping("/getAll")
    public ResponseEntity<List<ResponBillDTO>> getAll() {

        return ResponseEntity.ok().body(billService.findAll());
    }
    @GetMapping("/getOneById")
    @CrossOrigin
    public ResponseEntity<ResponBillDTO> getOneById(@RequestParam("id") Integer id) {
        Bill bill = billService.findByID(id);
        ResponBillDTO responBillDTO = modelMapper.map(bill, ResponBillDTO.class);
        return ResponseEntity.ok().body(responBillDTO);
    }
    @PostMapping(value = "/update")
    public ResponseEntity<BillDTO> update(@RequestParam(name = "id") Integer id, @RequestBody  BillDTO billDTO) {
        billDTO.setId(id);

        return ResponseEntity.ok().body(billService.updateBill(billDTO));
    }
    @PostMapping("/create")
    public ResponseEntity<BillDTO> create(@RequestBody BillDTO billDTO){
        // convert DTO to entity
        Bill billRequest = modelMapper.map(billDTO, Bill.class);
        Bill bill = billService.createBill(billRequest);
        // convert entity to DTO
        BillDTO empResponse = modelMapper.map(bill, BillDTO.class);

        return new ResponseEntity<BillDTO>(empResponse, HttpStatus.CREATED);
    }
    @PostMapping(value = "/delete")
    public ResponseEntity<String> delete(@RequestParam(name = "id") Integer id) {
        logger.info("Deleted bill with id : " + id);
        billService.deleteById(id);
        return ResponseEntity.ok().body("Delete bill id " + id + " successfully!");
    }
}
