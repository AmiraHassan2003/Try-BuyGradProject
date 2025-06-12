package com.shop.shop.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.shop.Model.ContactModel;
import com.shop.shop.Service.ContactMessageService;

@RestController
@RequestMapping("/contact")
public class ContactController {

    @Autowired
    private ContactMessageService contactMessageService;

    @PostMapping
    public ResponseEntity<String> submitContactMessage(@RequestBody ContactModel message) {
        contactMessageService.saveMessage(message);
        return ResponseEntity.ok("Message submitted successfully!");
    }

}
