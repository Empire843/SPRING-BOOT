package com.ptit.webserviceelectronicshop.controller;

import com.ptit.webserviceelectronicshop.model.request_body.RevenueStatisticsDTO;
import com.ptit.webserviceelectronicshop.service.RevenueStatisticsService;
import com.ptit.webserviceelectronicshop.service.implement.RevenueStatisticsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/revenue")
public class StatisticsController {
    @Autowired
    private RevenueStatisticsServiceImpl revenueStatisticsService;

    @GetMapping("/statistics")
    //GET /api/revenue/statistics?start=2023-01-01&end=2023-05-01
    public List<RevenueStatisticsDTO> getRevenueStatisticsByDateRange(
            @RequestParam("start")  String start,
            @RequestParam("end")  String end) {
        return revenueStatisticsService.getRevenueStatisticsByDateRange(start, end);
    }
}
