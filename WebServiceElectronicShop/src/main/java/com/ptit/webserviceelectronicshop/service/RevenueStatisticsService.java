package com.ptit.webserviceelectronicshop.service;

import com.ptit.webserviceelectronicshop.model.request_body.RevenueStatisticsDTO;
import com.ptit.webserviceelectronicshop.repository.OrderRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface RevenueStatisticsService {


    List<RevenueStatisticsDTO> getRevenueStatisticsByDateRange(String startDate, String endDate);
}
