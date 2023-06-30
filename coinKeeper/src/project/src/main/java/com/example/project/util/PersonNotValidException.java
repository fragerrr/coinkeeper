package com.example.project.util;

import com.example.project.dto.PersonDTO;


public class PersonNotValidException extends RuntimeException{
    private PersonDTO personDTO;

    public PersonDTO getPersonDTO() {
        return personDTO;
    }

    public void setPersonDTO(PersonDTO personDTO) {
        this.personDTO = personDTO;
    }

    public PersonNotValidException(PersonDTO personDTO) {
        this.personDTO = personDTO;
    }
}
