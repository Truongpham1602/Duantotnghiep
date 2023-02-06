package bangiay.com.service.impl;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.SerializationUtils;

import bangiay.com.DTO.ColorDTO;
import bangiay.com.DTO.MediaDTO;
import bangiay.com.DTO.ProductDTO;
import bangiay.com.DTO.SizeDTO;
import bangiay.com.dao.CategoryDao;
import bangiay.com.dao.MediaDao;
import bangiay.com.dao.ProductDao;
import bangiay.com.entity.Category;
import bangiay.com.entity.Media;
import bangiay.com.entity.Product;
import bangiay.com.service.MediaService;
import bangiay.com.service.ProductService;
import bangiay.com.service.SizeService;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductDao proDAO;
	@Autowired
	private CategoryDao cateDao;
	@Autowired
	private MediaDao mediaDao;
	@Autowired
	private MediaService mediaService;
	@Autowired
	private SizeService sizeService;
	@Autowired
	private ModelMapper modelMapper;

	public List<ProductDTO> findAll() {
		List<Product> pro = proDAO.findAll();
		List<ProductDTO> result = pro.stream().map(d -> modelMapper.map(d, ProductDTO.class))
				.collect(Collectors.toList());
		for (int i = 0; i < pro.size(); i++) {
			List<Media> media = mediaDao.findMediaByProduct_Id(pro.get(i).getId());
			if (media.size() > 0) {
				result.get(i).setImage(media.get(0).getUrl());
			}
			result.get(i).setName_cate(pro.get(i).getCategory().getNamecate());

		}
		return result;
	}

//	@Override
//	public Page<ProductDTO> findAll(Pageable pageable) {
//		List<Product> pro = proDAO.findAll();
//		List<ProductDTO> result = pro.stream().map(d -> modelMapper.map(d, ProductDTO.class))
//				.collect(Collectors.toList());
//
//		for (int i = 0; i < pro.size(); i++) {
//			List<Media> media = mediaDao.findMediaByProduct_Id(pro.get(i).getId());
//			if (media.size() > 0) {
//				result.get(i).setImage(media.get(0).getUrl());
//			}
//			result.get(i).setName_cate(pro.get(i).getCategory().getNamecate());
//
//		}
//		return ObjectMapperUtils.mapEntityPageIntoDtoPage(proDAO.findAll(pageable), ProductDTO.class);
//	}

	@Override
	public ProductDTO finById(Integer id) {
		Product product = proDAO.findById(id).get();
		ProductDTO productdto = modelMapper.map(product, ProductDTO.class);
		List<MediaDTO> media = this.mediaService.findAllByPro_Id(product.getId());
		byte[] datamedia = SerializationUtils.serialize(media);
		List<SizeDTO> lstSizeDTO = this.sizeService.findSizeByPro_Id(product.getId());
		byte[] datalstSizeDTO = SerializationUtils.serialize(lstSizeDTO);
		productdto.setName_cate(product.getCategory().getNamecate());
		productdto.setImage(media.get(0).getUrl());
		productdto.setMedias(SerializationUtils.deserialize(datamedia));
		productdto.setSizes(SerializationUtils.deserialize(datalstSizeDTO));
		return productdto;
	}

	@Override
	public ProductDTO create(ProductDTO productDTO) {
		Product product = modelMapper.map(productDTO, Product.class);
		product.setCategory(this.cateDao.findById(1).get());
		product.setCreated(Timestamp.from(Instant.now()));
		this.proDAO.save(product);
		productDTO.setId(product.getId());
		productDTO.setName_cate(product.getCategory().getNamecate());
		productDTO.setCreated(new Timestamp(product.getCreated().getTime()));
		return productDTO;
	}

	@Override
	public ProductDTO update(ProductDTO productDTO) {
		Product product = modelMapper.map(productDTO, Product.class);
		Product p = proDAO.findById(productDTO.getId()).get();
		product.setCategory(this.cateDao.findById(productDTO.getCategoryId()).get());
		product.setCreated(p.getCreated());
		product.setModified(Timestamp.from(Instant.now()));
		this.proDAO.save(product);
		productDTO.setId(product.getId());
		productDTO.setModified(new Timestamp(product.getModified().getTime()));
		productDTO.setCreated(new Timestamp(p.getCreated().getTime()));
		productDTO.setName_cate(product.getCategory().getNamecate());
		return productDTO;
	}

	@Override
	public void delete(Integer id) {
		proDAO.deleteById(id);
	}

	@Override
	public void updateStatusFalse(ColorDTO color) {
		List<Product> product = this.proDAO.findByName(color.getName());
		for (Product p : product) {
			p.setStatus(0);
		}
		this.proDAO.saveAll(product);
	}

	@Override
	public Page<ProductDTO> searchByKeyword(Integer size, Integer page, String keyword) {
		Pageable pageable = PageRequest.of(page, size);
		List<Product> lstProduct;
		if (!keyword.equals("")) {
			lstProduct = proDAO.search(keyword, pageable);
		} else {
			lstProduct = proDAO.findByStatus();
		}
		List<ProductDTO> lstProDTO = new ArrayList<ProductDTO>();
		for (int i = 0; i < lstProduct.size(); i++) {
			ProductDTO pro = new ProductDTO();
			boolean x = true;
			for (int j = 0; j < lstProDTO.size(); j++) {
				if (lstProduct.get(i).getName().equalsIgnoreCase(lstProDTO.get(j).getName())) {
					x = false;
					break;
				}
			}
			if (x) {
				pro = modelMapper.map(lstProduct.get(i), ProductDTO.class);
				lstProDTO.add(pro);
			}
		}

		List<Product> lstPro = lstProDTO.stream().map(d -> modelMapper.map(d, Product.class))
				.collect(Collectors.toList());
		int start = (int) pageable.getOffset();
		int end = Math.min((start + pageable.getPageSize()), lstPro.size());
		Page<Product> pagePro = new PageImpl<>(lstPro.subList(start, end), pageable, lstPro.size());
		Page<ProductDTO> dtoPage = pagePro.map(new Function<Product, ProductDTO>() {
			@Override
			public ProductDTO apply(Product entity) {
				ProductDTO dto = new ProductDTO();
				dto = modelMapper.map(entity, ProductDTO.class);
				List<Media> media = mediaDao.findMediaByProduct_Id(entity.getId());
				if (media.size() > 0) {
					dto.setImage(media.get(0).getUrl());
				}
				dto.setName_cate(entity.getCategory().getNamecate());
				dto.setId(entity.getId());
				return dto;
			}
		});
		return dtoPage;
	}

	@Override
	public Page<ProductDTO> findAll(Integer size, Integer page) {
		Pageable pageable = PageRequest.of(page, size);
//		Page<Product> entities = proDAO.findPageWhereStatus(pageable);
		List<Product> lst = this.proDAO.findByStatus();
		List<ProductDTO> lstProDTO = new ArrayList<ProductDTO>();
		for (int i = 0; i < lst.size(); i++) {
			ProductDTO pro = new ProductDTO();
			boolean x = true;
			for (int j = 0; j < lstProDTO.size(); j++) {
				if (lst.get(i).getName().equalsIgnoreCase(lstProDTO.get(j).getName())) {
					x = false;
					break;
				}
			}
			if (x) {
				pro = modelMapper.map(lst.get(i), ProductDTO.class);
				lstProDTO.add(pro);
			}
		}

		List<Product> lstPro = lstProDTO.stream().map(d -> modelMapper.map(d, Product.class))
				.collect(Collectors.toList());
		int start = (int) pageable.getOffset();
		int end = Math.min((start + pageable.getPageSize()), lstPro.size());
		Page<Product> pagePro = new PageImpl<>(lstPro.subList(start, end), pageable, lstPro.size());
		Page<ProductDTO> dtoPage = pagePro.map(new Function<Product, ProductDTO>() {
			@Override
			public ProductDTO apply(Product entity) {
				ProductDTO dto = new ProductDTO();
				dto = modelMapper.map(entity, ProductDTO.class);
				List<Media> media = mediaDao.findMediaByProduct_Id(entity.getId());
				if (media.size() > 0) {
					dto.setImage(media.get(0).getUrl());
				}
				dto.setName_cate(entity.getCategory().getNamecate());
				dto.setId(entity.getId());
				return dto;
			}
		});
		return dtoPage;
	}

	@Override
	public Page<ProductDTO> searchByKeywordAndCate_Id(Integer size, Integer page, String keyword, Integer cate_Id) {
		Category cate = this.cateDao.findById(cate_Id).orElse(null);
		Pageable pageable = PageRequest.of(page, size);
		List<Product> lstProduct;
		if (cate != null) {
			lstProduct = proDAO.searchClient(keyword, cate_Id, pageable);
		} else {
			lstProduct = proDAO.searchClient(keyword, pageable);
		}
		List<ProductDTO> lstProDTO = new ArrayList<ProductDTO>();
		for (int i = 0; i < lstProduct.size(); i++) {
			ProductDTO pro = new ProductDTO();
			boolean x = true;
			for (int j = 0; j < lstProDTO.size(); j++) {
				if (lstProduct.get(i).getName().equalsIgnoreCase(lstProDTO.get(j).getName())) {
					x = false;
					break;
				}
			}
			if (x) {
				pro = modelMapper.map(lstProduct.get(i), ProductDTO.class);
				lstProDTO.add(pro);
			}
		}

		List<Product> lstPro = lstProDTO.stream().map(d -> modelMapper.map(d, Product.class))
				.collect(Collectors.toList());
		int start = (int) pageable.getOffset();
		int end = Math.min((start + pageable.getPageSize()), lstPro.size());
		Page<Product> pagePro = new PageImpl<>(lstPro.subList(start, end), pageable, lstPro.size());

		Page<ProductDTO> dtoPage = pagePro.map(new Function<Product, ProductDTO>() {
			@Override
			public ProductDTO apply(Product entity) {
				ProductDTO dto = new ProductDTO();
				dto = modelMapper.map(entity, ProductDTO.class);
				List<Media> media = mediaDao.findMediaByProduct_Id(entity.getId());
				if (media.size() > 0) {
					dto.setImage(media.get(0).getUrl());
				}
				dto.setName_cate(entity.getCategory().getNamecate());
				dto.setId(entity.getId());
				return dto;
			}
		});
		return dtoPage;
	}

	@Override
	public List<ProductDTO> top5NewProduct() {
		List<Product> pros = this.proDAO.findByStatus();
		List<ProductDTO> lstProDTO = new ArrayList<ProductDTO>();
		for (int i = 0; i < pros.size(); i++) {
			ProductDTO pro = new ProductDTO();
			boolean x = true;
			for (int j = 0; j < lstProDTO.size(); j++) {
				if (pros.get(i).getName().equalsIgnoreCase(lstProDTO.get(j).getName())) {
					x = false;
					break;
				}
			}
			if (x) {
				pro = modelMapper.map(pros.get(i), ProductDTO.class);
				lstProDTO.add(pro);
			}
		}

		List<Product> lstPro = lstProDTO.stream().map(d -> modelMapper.map(d, Product.class))
				.collect(Collectors.toList());
		List<ProductDTO> proDTO = lstPro.stream().map(p -> modelMapper.map(p, ProductDTO.class))
				.collect(Collectors.toList());
		for (int i = 0; i < proDTO.size(); i++) {
			List<MediaDTO> media = this.mediaService.findAllByPro_Id(lstPro.get(i).getId());
			byte[] datamedia = SerializationUtils.serialize(media);
			List<SizeDTO> lstSizeDTO = this.sizeService.findSizeByPro_Id(lstPro.get(i).getId());
			byte[] datalstSizeDTO = SerializationUtils.serialize(lstSizeDTO);
			if (media.size() > 0) {
				proDTO.get(i).setImage(media.get(0).getUrl());
			}
			proDTO.get(i).setMedias(SerializationUtils.deserialize(datamedia));
			proDTO.get(i).setSizes(SerializationUtils.deserialize(datalstSizeDTO));
		}
		return proDTO;

//		List<Product> pros = this.proDAO.findTop5New();
//		List<ProductDTO> proDTO = pros.stream().map(p -> modelMapper.map(p, ProductDTO.class))
//				.collect(Collectors.toList());

//		return proDTO;
	}

	@Override
	public List<ProductDTO> top3BillProduct() {
		List<Product> pros = this.proDAO.findTop3Bill();
		List<ProductDTO> lstProDTO = new ArrayList<ProductDTO>();
		for (int i = 0; i < pros.size(); i++) {
			ProductDTO pro = new ProductDTO();
			boolean x = true;
			for (int j = 0; j < lstProDTO.size(); j++) {
				if (pros.get(i).getName().equalsIgnoreCase(lstProDTO.get(j).getName())) {
					x = false;
					break;
				}
			}
			if (x) {
				pro = modelMapper.map(pros.get(i), ProductDTO.class);
				lstProDTO.add(pro);
			}
		}

		List<Product> lstPro = lstProDTO.stream().map(d -> modelMapper.map(d, Product.class))
				.collect(Collectors.toList());
		List<ProductDTO> proDTO = lstPro.stream().map(p -> modelMapper.map(p, ProductDTO.class))
				.collect(Collectors.toList());
		for (int i = 0; i < proDTO.size(); i++) {
			List<MediaDTO> media = this.mediaService.findAllByPro_Id(lstPro.get(i).getId());
			byte[] datamedia = SerializationUtils.serialize(media);
			List<SizeDTO> lstSizeDTO = this.sizeService.findSizeByPro_Id(lstPro.get(i).getId());
			byte[] datalstSizeDTO = SerializationUtils.serialize(lstSizeDTO);
			if (media.size() > 0) {
				proDTO.get(i).setImage(media.get(0).getUrl());
			}
			proDTO.get(i).setMedias(SerializationUtils.deserialize(datamedia));
			proDTO.get(i).setSizes(SerializationUtils.deserialize(datalstSizeDTO));
		}
		return proDTO;
	}

	@Override
	public ProductDTO findByColorAndName(ColorDTO colorDTO) {
		Product product = proDAO.findByColorAndName(colorDTO.getName(), colorDTO.getColor());
		ProductDTO productdto = modelMapper.map(product, ProductDTO.class);
		List<Product> lst = this.proDAO.findByName(colorDTO.getName());
		List<ColorDTO> colors = new ArrayList<ColorDTO>();
		for (int i = 0; i < lst.size(); i++) {
			ColorDTO newColor = new ColorDTO();
			newColor.setColor(lst.get(i).getColor());
			colors.add(newColor);
		}
		productdto.setColors(colors);
		List<MediaDTO> media = this.mediaService.findAllByPro_Id(product.getId());
		byte[] datamedia = SerializationUtils.serialize(media);
		List<SizeDTO> lstSizeDTO = this.sizeService.findSizeByPro_Id(product.getId());
		byte[] datalstSizeDTO = SerializationUtils.serialize(lstSizeDTO);
		productdto.setName_cate(product.getCategory().getNamecate());
		productdto.setImage(media.get(0).getUrl());
		productdto.setMedias(SerializationUtils.deserialize(datamedia));
		productdto.setSizes(SerializationUtils.deserialize(datalstSizeDTO));
		return productdto;
	}

	@Override
	public ProductDTO findByName(ColorDTO colorDTO) {
		List<Product> lst = this.proDAO.findByName(colorDTO.getName());
		Product product = proDAO.findByColorAndName(colorDTO.getName(), lst.get(0).getColor());
		ProductDTO productdto = modelMapper.map(product, ProductDTO.class);
		List<ColorDTO> colors = new ArrayList<ColorDTO>();
		for (int i = 0; i < lst.size(); i++) {
			ColorDTO newColor = new ColorDTO();
			newColor.setColor(lst.get(i).getColor());
			colors.add(newColor);
		}
		productdto.setColors(colors);
		List<MediaDTO> media = this.mediaService.findAllByPro_Id(product.getId());
		byte[] datamedia = SerializationUtils.serialize(media);
		List<SizeDTO> lstSizeDTO = this.sizeService.findSizeByPro_Id(product.getId());
		byte[] datalstSizeDTO = SerializationUtils.serialize(lstSizeDTO);
		productdto.setName_cate(product.getCategory().getNamecate());
		productdto.setImage(media.get(0).getUrl());
		productdto.setMedias(SerializationUtils.deserialize(datamedia));
		productdto.setSizes(SerializationUtils.deserialize(datalstSizeDTO));
		return productdto;
	}

}
