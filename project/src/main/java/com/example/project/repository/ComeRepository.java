package com.example.project.repository;


import com.example.project.model.Come;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComeRepository extends JpaRepository<Come, Integer> {
}
