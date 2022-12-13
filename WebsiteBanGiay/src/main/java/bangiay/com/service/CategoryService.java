package bangiay.com.service;

import java.util.List;
import java.util.Optional;

import bangiay.com.DTO.CategoryDTO;
import org.springframework.data.domain.Page;

import bangiay.com.entity.Category;
import org.springframework.data.domain.Pageable;

public interface CategoryService {
Category save(Category category);
void deleteById(Integer id);
Category updateById(Integer id, Category category) throws Exception;
List<Category> findAllByParentId(Integer id);
List<Category> findAll();
Page<CategoryDTO> findAll(Pageable pageable);

Page<Category> paging(Optional<Integer>pageNumber,int size);
Category findById(int id) throws Exception;

}
