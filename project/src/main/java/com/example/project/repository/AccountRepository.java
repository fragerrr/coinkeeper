package com.example.project.repository;

import com.example.project.model.Account;
import com.example.project.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    List<Account> findByUser(Optional<Person> user);
    Account findByName(String name);
}
