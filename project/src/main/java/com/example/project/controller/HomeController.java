package com.example.project.controller;

import com.example.project.dto.PersonDTO;
import com.example.project.model.Person;
import com.example.project.service.ComeService;
import com.example.project.service.PersonService;
import com.example.project.util.PersonNotFoundException;
import com.example.project.util.PersonNotValidException;
import jakarta.servlet.http.Cookie;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@CrossOrigin
public class HomeController {

    private final PersonService personService;

    private final ComeService comeService;
    private final ModelMapper modelMapper;

    @Autowired
    public HomeController(PersonService personService, ComeService comeService, ModelMapper modelMapper) {
        this.personService = personService;
        this.comeService = comeService;
        this.modelMapper = modelMapper;
    }


    @PostMapping("/login")
    public ResponseEntity<Integer> login(@RequestBody @Valid PersonDTO personDTO,
                                         BindingResult bindingResult){
        checkForErrors(bindingResult, personDTO);
        Person person = personService.findByEmail(personDTO.getEmail());

        if(person == null){
            throw new PersonNotFoundException();
        } else if(person.getPassword().equalsIgnoreCase(personDTO.getPassword())){
            return ResponseEntity.ok(person.getId());
        } else{
            personDTO.setEmail("");
            personDTO.setPassword("Password is wrong");
            throw new PersonNotValidException(personDTO);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<Integer> signup(@RequestBody @Valid PersonDTO personDTO,
                                        BindingResult bindingResult){

        checkForErrors(bindingResult, personDTO);
        Person person = personService.findByEmail(personDTO.getEmail());

        if(person == null){
            person = modelMapper.map(personDTO, Person.class);
            return ResponseEntity.ok(personService.save(person).getId());
        } else{
            personDTO.setEmail("This email is already used!");
            personDTO.setPassword("");
            throw new PersonNotValidException(personDTO);
        }


    }


    @ExceptionHandler
    private ResponseEntity<PersonDTO> personNotValid(PersonNotValidException e){
        return new ResponseEntity<>(e.getPersonDTO(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    private ResponseEntity<PersonDTO> personNotFound(PersonNotFoundException e){
        PersonDTO personDTO = new PersonDTO();
        personDTO.setEmail("Person not found!");
        personDTO.setPassword("");
        return new ResponseEntity<>(personDTO, HttpStatus.NOT_FOUND);
    }

    public static void checkForErrors(BindingResult bindingResult, PersonDTO personDTO){
        Map<String, String> errors = new HashMap<>();


        if(bindingResult.hasErrors()){
            for(FieldError err : bindingResult.getFieldErrors()){
                errors.put(err.getField(), err.getDefaultMessage());
            }
            if(errors.containsKey("email") && errors.containsKey("password")){
                personDTO.setEmail(errors.get("email"));
                personDTO.setPassword(errors.get("password"));
            } else if(errors.containsKey("email")){
                personDTO.setEmail(errors.get("email"));
                personDTO.setPassword("");
            } else{
                personDTO.setPassword(errors.get("password"));
                personDTO.setEmail("");
            }

            throw new PersonNotValidException(personDTO);
        }
    }
}
