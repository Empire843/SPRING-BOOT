package com.ptit.webserviceelectronicshop.controller;

import com.ptit.webserviceelectronicshop.model.Category;
import com.ptit.webserviceelectronicshop.model.Product;
import com.ptit.webserviceelectronicshop.model.request_body.Product.ProductDTO;
import com.ptit.webserviceelectronicshop.service.CategoryService;
import com.ptit.webserviceelectronicshop.service.implement.CategoryServiceImpl;
import com.ptit.webserviceelectronicshop.service.implement.ProductServiceImpl;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import jakarta.validation.Valid;


@RestController
@CrossOrigin
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductServiceImpl service;
    @Autowired
    private CategoryServiceImpl categoryService;

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return service.getAllProduct();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return this.service.getProductById(id).orElse(null);
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addNewProduct(@NotNull @RequestBody @Valid ProductDTO body, BindingResult bindingResult) {
        HashMap<String, Object> response = new HashMap<>();
        HashMap<String, Object> error = new HashMap<>();

        if (bindingResult.hasErrors()) {
            for (FieldError error1 : bindingResult.getFieldErrors()) {
                error.put(error1.getField(), error1.getDefaultMessage());
            }
            return new ResponseEntity<Object>(error, HttpStatus.BAD_REQUEST);
        }
//        ModelMapper mapper = new ModelMapper();
//        Product user = mapper.map(body, Product.class);

        Product product = new Product();

        product.setCreated_date(LocalDateTime.now());
        product.setPrice(body.getPrice());
        product.setQuantity(body.getQuantity());
        product.setName(body.getName());
        product.setImage(body.getImage());
        product.setDescription(body.getDescription());

        Category category = categoryService.getCategoryById(body.getCategory_id());
        if (category != null) {
            product.setCategory(category);
        } else {
            return new ResponseEntity<>("Category of product not found", HttpStatus.NOT_FOUND);
        }
        service.addProduct(product);
        response.put("message", "Product has been added successfully");
        response.put("product", product);
        return new ResponseEntity<Object>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        if (service.deleteProduct(id)) {
            return new ResponseEntity<>("Product has been deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Object> editProduct(@PathVariable Long id, @RequestBody ProductDTO body) {
        HashMap<String, Object> response = new HashMap<>();
        HashMap<String, Object> error = new HashMap<>();
        Optional<Product> product = service.getProductById(id);

        if (product.isPresent()) {
            Product existingProduct = product.get();
            Category category = categoryService.getCategoryById(body.getCategory_id());
            if (category != null) {
                existingProduct.setCategory(category);
            } else {
                error.put("error", "Category of product not found");
                return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
            }
            existingProduct.setName(body.getName());
            existingProduct.setPrice(body.getPrice());
            existingProduct.setQuantity(body.getQuantity());
            existingProduct.setImage(body.getImage());
            existingProduct.setDescription(body.getDescription());
            service.updateProduct(existingProduct);
//            code here
            response.put("message", "Product has been updated successfully");
            response.put("product", existingProduct);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            error.put("error", "Product not found");
            return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/filter/products")
    public ArrayList<Product> filterByKey(@RequestParam(name = "key") String keyword) {
        HashMap<String, Object> error = new HashMap<>();
        ArrayList<Product> listProducts = new ArrayList<>();

        try {
            listProducts = this.service.getProductsContainKeys(keyword);
        }
        catch (Exception e) {
        }
        return listProducts;
    }

    @GetMapping("/filter/categories")
    public ResponseEntity<ArrayList<Product>> getProductsByCategory(@RequestParam(name = "id") Long id) {
        ArrayList<Product> listProducts = new ArrayList<>();
        try {
            listProducts = this.service.getProductsByCategory(id);
        }
        catch (Exception ex) {
            ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(listProducts);
    }

    @GetMapping("/filter/price")
    public ResponseEntity<ArrayList<Product>> getProductInSpacePrice(
            @RequestParam(name = "start") Double start,
            @RequestParam(name = "end") Double end
    ) {
        ArrayList<Product> products = new ArrayList<>();
        try {
            products = this.service.getProductInSpacePrice(start, end);
        }
        catch (Exception ex) {
            ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(products);
    }

    @GetMapping("/filter")
    public ResponseEntity<ArrayList<Product>> getSelectedProducts(@RequestParam("ids") List<Long> selectedIds) {
        ArrayList<Product> products = new ArrayList<>();

        try {
            products = this.service.getProductsByIds(selectedIds);
        }
        catch (Exception ex) {
            ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(products);
    }

    @GetMapping("/filter/combination")
    public ResponseEntity<ArrayList<Product>> getCombinationFilterProducts(
            @RequestParam(name = "ids") List<Long> selectedIds,
            @RequestParam(name = "start") Double start,
            @RequestParam(name = "end") Double end
    )
    {
        ArrayList<Product> products = new ArrayList<>();
        try {
            ArrayList<Product> filter1 = new ArrayList<>();
            ArrayList<Product> filter2 = new ArrayList<>();
            filter1 = this.service.getProductsByIds(selectedIds);
            filter2 = this.service.getProductInSpacePrice(start, end);

            for(Product p1: filter1) {
                Long id = p1.getId();
                for(Product p2: filter2) {
                    Long id2 = p2.getId();
                    if(id == id2) {
                        products.add(p1);
                    }
                }
            }
        }
        catch (Exception ex) {
            ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(products);
    }
}
