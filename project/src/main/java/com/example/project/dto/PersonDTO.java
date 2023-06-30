package com.example.project.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonDTO {
    @Email(message = "Email not available")
    @NotBlank(message = "Please enter email")
    private String email;

    @NotBlank(message = "Pass can't be blank")
    @Size(min = 6, message = "Pass should contain at least 6 character")
    private String password;

}
