package com.example.project.service;

import com.example.project.model.Person;
import com.example.project.repository.PersonRepository;
import com.example.project.util.PersonNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class PersonService {
    private final PersonRepository personRepository;

    @Autowired
    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public List<Person> findAll(){
        return personRepository.findAll();
    }

    public Person findById(Integer id){
        return personRepository.findById(id).orElseThrow(PersonNotFoundException::new);
    }

    public Person findByEmail(String email){
        return personRepository.findByEmail(email);
    }

    public Person save(Person person){
        return personRepository.save(person);
    }
}
