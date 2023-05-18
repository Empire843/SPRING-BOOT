package com.ptit.webserviceelectronicshop.service.implement;

import com.ptit.webserviceelectronicshop.model.request_body.RevenueStatisticsDTO;
import com.ptit.webserviceelectronicshop.repository.OrderRepository;
import com.ptit.webserviceelectronicshop.service.RevenueStatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class RevenueStatisticsServiceImpl implements RevenueStatisticsService {
    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<RevenueStatisticsDTO> getRevenueStatisticsByDateRange(String startDate, String endDate) {
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy-HH:mm");
//        String formattedStartDate = startDate.format(formatter);
//        String formattedEndDate = endDate.format(formatter);
        return orderRepository.getRevenueStatisticsByDateRange(startDate, endDate);
    }

}
