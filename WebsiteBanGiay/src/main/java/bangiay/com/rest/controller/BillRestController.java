package bangiay.com.rest.controller;

import bangiay.com.DTO.request.BillDTO;
import bangiay.com.DTO.respon.ResponBillDTO;
import bangiay.com.controller.BillController;
import bangiay.com.service.BillService;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "bill")
public class BillRestController {
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
        BillDTO billDTO = billService.findByID(id);
        ResponBillDTO responBillDTO = modelMapper.map(billDTO, ResponBillDTO.class);
        return ResponseEntity.ok().body(responBillDTO);
    }
    @PostMapping(value = "/update")
    public ResponseEntity<BillDTO> update(@RequestParam(name = "id") Integer id, @RequestBody BillDTO billDTO) {
        billDTO.setId(id);

        return ResponseEntity.ok().body(billService.updateBill(billDTO));
    }
    @PostMapping(value = "/create")
    public ResponseEntity<BillDTO> create(@RequestBody BillDTO billDTO, Integer size_Id) {
    	return ResponseEntity.ok().body(billService.createBill(billDTO, size_Id) );
    }
    @PostMapping(value = "/delete")
    public ResponseEntity<String> delete(@RequestParam(name = "id") Integer id) {
        logger.info("Deleted bill with id : " + id);
        billService.deleteById(id);
        return ResponseEntity.ok().body("Delete bill id " + id + " successfully!");
    }
}
