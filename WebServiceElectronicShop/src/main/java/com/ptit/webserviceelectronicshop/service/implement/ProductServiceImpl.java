package com.ptit.webserviceelectronicshop.service.implement;

import com.ptit.webserviceelectronicshop.model.Category;
import com.ptit.webserviceelectronicshop.model.Product;
import com.ptit.webserviceelectronicshop.repository.CategoryRepository;
import com.ptit.webserviceelectronicshop.repository.ProductRepository;
import com.ptit.webserviceelectronicshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository repo;
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public void addProduct(Product product) {
        repo.save(product);
    }

    @Override
    public List<Product> getAllProduct() {
        return repo.findAll();
    }

    @Override
    public boolean deleteProduct(Long id) {
        Optional<Product> product = repo.findById(id);
        if (product.isPresent()) {
            repo.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override 
    public Optional<Product> getProductById(Long id) {
        return repo.findById(id);
    }
    @Override
    public void updateProduct(Product product) {
        repo.save(product);
    }
    @Override
    public List<Product> getProductByCategory(Category category) {
        return repo.findByCategory(category);
    }
    @Override
    public void updateProductQuantity(Long productId, int newQuantity) {
        Optional<Product> optionalProduct = repo.findById(productId);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setQuantity(product.getQuantity() - newQuantity);
            repo.save(product);
        } else {
            throw new RuntimeException("Product not found with id " + productId);
        }
    }

    @Override
    public ArrayList<Product> getProductsContainKeys(String key) {
        ArrayList<Product> listProducts = new ArrayList<Product>();
        listProducts = this.repo.findByKey(key);
        return listProducts;
    }

    @Override
    public ArrayList<Product> getProductsByCategory(Long id) {
        ArrayList<Product> products = new ArrayList<>();
        products = this.repo.getProductsByCategory(id);
        return  products;
    }

    @Override
    public ArrayList<Product> getProductInSpacePrice(Double start, Double end) {
        ArrayList<Product> products = new ArrayList<>();
        products = this.repo.getProductInSpacePrice(start, end);
        return products;
    }

    @Override
    public ArrayList<Product> getProductsByIds(List<Long> selectedIds) {
        ArrayList<Product> products = new ArrayList<>();

        for (Long id : selectedIds) {
            ArrayList<Product> list = this.repo.getProductsByCategory(id);
            products.addAll(list);
        }

        return products;
    }
}
