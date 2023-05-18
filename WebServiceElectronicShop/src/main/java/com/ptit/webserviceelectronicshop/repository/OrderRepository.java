package com.ptit.webserviceelectronicshop.repository;

import com.ptit.webserviceelectronicshop.model.Order;
import com.ptit.webserviceelectronicshop.model.User;
import com.ptit.webserviceelectronicshop.model.request_body.RevenueStatisticsDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByVnpayCode(String vnpayCode);

    @Query("SELECT new com.ptit.webserviceelectronicshop.model.request_body.RevenueStatisticsDTO(" +
            "i.product.id AS productId, i.product.name AS productName,i.product.image AS productImage, i.product.category.name AS categoryName, " +
            "SUM(i.quantity) AS totalQuantity, SUM(i.quantity * i.product.price) AS totalPrice) " +
            "FROM Order o " +
            "JOIN OrderItem i ON o.id = i.order.id " +
            "WHERE o.payment_at BETWEEN :startDate AND :endDate " +
            "GROUP BY i.product.id, i.product.name, i.product.category.name ORDER BY totalQuantity DESC")
    List<RevenueStatisticsDTO> getRevenueStatisticsByDateRange(@Param("startDate") String startDate,
                                                               @Param("endDate") String endDate);

    List<Order> findByUser(User user);
}
