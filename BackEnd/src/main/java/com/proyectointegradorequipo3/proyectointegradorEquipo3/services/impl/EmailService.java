package com.proyectointegradorequipo3.proyectointegradorEquipo3.services.impl;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.UserEntity;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

import org.springframework.core.io.ClassPathResource;
import org.springframework.util.StreamUtils;

import java.nio.charset.Charset;

@Service
public class EmailService {

    @Value("${sendgrid.api.key}")
    private String sendGridAPIKey;

    public String loadHtmlContent(String filename) throws IOException {
        ClassPathResource resource = new ClassPathResource(filename);
        byte[] fileContentBytes = StreamUtils.copyToByteArray(resource.getInputStream());
        return new String(fileContentBytes, Charset.defaultCharset());
    }

    public void sendConfirmationEmail(UserEntity userEntity, String token) throws IOException {
        Email from = new Email("noreplygourmetgo@gmail.com");
        String subject = "Confirmation of registration";
        Email to = new Email(userEntity.getEmail());

        String htmlContent;
        try {
            htmlContent = loadHtmlContent("templates/confirmationEmail.html");
            htmlContent = htmlContent.replace("{{token}}", "http://localhost:8080/auth/confirm?token=" + token);
        } catch (IOException e) {
            return;
        }

        Content content = new Content("text/html", htmlContent);
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sendGrid = new SendGrid(sendGridAPIKey);
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sendGrid.api(request);
        } catch (IOException ex) {
            throw new IOException(ex.getMessage());
        }
    }
}


