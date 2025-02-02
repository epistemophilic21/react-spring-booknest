package com.project.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.core.bean.BookDetails;

public interface BookDetailsRepository extends JpaRepository<BookDetails, String> {
}
