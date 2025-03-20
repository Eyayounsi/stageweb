package com.example.loginInscription.Services;


import com.example.loginInscription.Repo.ContactRepository;
import com.example.loginInscription.entities.Contact;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    public Contact saveContact(Contact contact) {
        return contactRepository.save(contact);
    }
}