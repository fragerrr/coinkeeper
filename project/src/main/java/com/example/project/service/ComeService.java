package com.example.project.service;

import com.example.project.model.Come;
import com.example.project.repository.ComeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ComeService {
    private final ComeRepository comeRepository;

    @Autowired
    public ComeService(ComeRepository comeRepository) {
        this.comeRepository = comeRepository;
    }

    public void save(Come come){
        comeRepository.save(come);
    }

    public void delete(Come come){
        comeRepository.delete(come);
    }

    public List<Come> findAll(){
        return comeRepository.findAll();
    }

    public Come findById(Integer id) {
        return comeRepository.findById(id).orElse(null);
    }
}
