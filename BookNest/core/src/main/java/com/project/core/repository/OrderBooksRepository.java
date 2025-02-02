package com.project.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.core.bean.OrderBooks;

public interface OrderBooksRepository extends JpaRepository<OrderBooks, Integer> {
}