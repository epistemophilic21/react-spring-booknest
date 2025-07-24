package com.project.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.core.bean.OrderBook;

public interface OrderBookRepository extends JpaRepository<OrderBook, Integer> {
}