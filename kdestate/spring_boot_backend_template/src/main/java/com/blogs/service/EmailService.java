package com.blogs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.blogs.dto.MailRequestDto;

@Service
public class EmailService {
	@Autowired
	JavaMailSender mailSender;
    public void sendEmail(MailRequestDto mail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mail.getTo());
        message.setSubject(mail.getSubject());
        message.setText(mail.getMessage());
        message.setFrom("ketankinniwadi@gmail.com");  // Optional
        mailSender.send(message);
    }

}
