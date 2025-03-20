package com.example.loginInscription.Controller;


import com.example.loginInscription.Services.ContactService;
import com.example.loginInscription.entities.Contact;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping("/send")
    public String sendMessage(@RequestBody Contact contact) {
        contactService.saveContact(contact);
        return "Message envoyé avec succès !";
    }
}