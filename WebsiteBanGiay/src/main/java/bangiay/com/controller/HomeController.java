package bangiay.com.controller;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import bangiay.com.DTO.ProductDTO;
import bangiay.com.service.ProductService;

@Controller
public class HomeController {

	@Autowired
	ProductService proService; 
	
	@RequestMapping("/home")
	public String index(Model model) {
		// getAllProduct
		List<ProductDTO> lstpro = proService.findAll();
		model.addAttribute("lstPro", lstpro);
////		Hiển thị top 3 sp bán chạy nhất
//		@Query(SELECT s.PRODUCT_ID, count(*) FROM weblutra.bill_detail b join weblutra.size s on b.SIZE_ID=s.id group by s.PRODUCT_ID Limit 3)
//		List<Bill_Detail_DTO> top3BestSeller = billService.Top3ProBestSeller();
//		model.addAttribute("top3ProBestSeller", top3BestSeller);
////		Hiển thị top 3 sp mới
//		@Query(SELECT * FROM weblutra.product order by id desc Limit 3)
//		List<ProductDTO> top3NewPro = proService.find3New();
//		model.addAttribute("top3NewPro", top3NewPro);
////    	Hiển thị danh mục sp
//			Viết IF else bên thymeleaf để hiển thị paren
//		List<CategoryDTO> lstCategories = CategoryService.findAll();
//		model.addAttribute("lstCategories", lstCategories);
////		Hiển thị top 7 danh mục bán chạy nhất
//		@Query(SELECT  CATEGORY_ID,count(*) FROM weblutra.product group by CATEGORY_ID)order by count(*) desc LIMIT 7)
//		List<Bill_Detail_DTO> top7CategorySeller = billService.top7CategorySeller();
//		model.addAttribute("top7CategorySeller", top7CategorySeller);
		return "layout/index";
	}
	
	@GetMapping("/login")
	public String login() {
		return "login";
	}
	
	@GetMapping("/register")
	public String register() {
		return "register";
	}
}
