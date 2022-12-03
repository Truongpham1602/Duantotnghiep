package bangiay.com.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import bangiay.com.DTO.CategoryDTO;
import bangiay.com.DTO.UserDTO;
import bangiay.com.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import bangiay.com.dao.CategoryDao;
import bangiay.com.entity.Category;
import bangiay.com.service.CategoryService;
@Service
public class CategoryServiceImpl implements CategoryService{
	@Autowired
	CategoryDao categoryDAO;

	@Override
	public Category save(Category category) {
		return categoryDAO.save(category);
	}

	@Override
	public void deleteById(Integer id) {
		categoryDAO.deleteById(id);
		
	}

	@Override
	public Category updateById(Integer id, Category category) throws Exception{
		Category category1 = categoryDAO.findById(id).orElseThrow(
				()-> new Exception("Category is not found" + id )
				);
		category1.setNamecate(category.getNamecate());
		category1.setModified(new Date());
		return categoryDAO.save(category1);
	}

	@Override
	public List<Category> findAllByParentId(Integer id) {
		// TODO Auto-generated method stub
		return categoryDAO.findAllByParentId(id) ;
	}

	@Override
	public Page<CategoryDTO> findAll(Pageable pageable) {

		return ObjectMapperUtils.mapEntityPageIntoDtoPage(categoryDAO.findAll(pageable), CategoryDTO.class);
	}

	@Override
	public Page<Category> paging(Optional<Integer> pageNumber, int size) {
		// TODO Auto-generated method stub
		return categoryDAO.findAll(PageRequest.of(pageNumber.orElse(0), size));
	}

	@Override
	public Category findById(int id) throws Exception {
		// TODO Auto-generated method stub
		return categoryDAO.findById(id).orElseThrow(()-> new Exception("Id not found " +id));
	}

}
