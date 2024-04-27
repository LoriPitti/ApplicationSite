package com.dev.demo.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailService {
  @Autowired
  private JavaMailSender mailSender;

  public void sendRecoveryEmail(String user, String psw, String toEmail, String subject){
   /* SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom("applications.manager.info@gmail.com");
    message.setTo(toEmail);
    message.setText(body);
    message.setSubject(subject);
    mailSender.send(message);*/

    System.out.println("USer:"+user + "psw "+psw + " email: "+toEmail);

    MimeMessage message = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
    try {
      helper.setFrom("applications.manager.info@gmail.com");
      helper.setTo(toEmail);
      helper.setSubject(subject);
      // Set the content of the email as HTML with CSS styles
      String styledBody = "<html>" +
        "<head>" +
        "<style>" +
        ".div-body{" +
        "background-color: grey;" +
        "padding: 2vh;" +
        "}" +
        ".title{" +
        "background-color: orange;" +
        "display: flex;" +
        "justify-content: center;" +
        "align-items: center;" +
        "padding: 2vh;" +
        "}" +
        "h2{" +
        "color: white;" +
        "font-size: 3vh;" +
        "}" +
        ".content{" +
        "padding: 2vh;" +
        "background-color: black;" +
        "}" +
        ".subject{" +
        "margin-bottom: 4vh;" +
        "font-style: italic;" +
        "}" +
        "p{" +
        "color: white;" +
        "font-size: 2vh;" +
        "}" +
        ".credenziali{" +
        "background-color: orange;" +
        "max-width: 40vh;" +
        "margin-top: 5vh;" +
        "padding: 2vh;" +
        "font-size: 2vh;" +
        "margin-bottom: 5vh;" +
        "}" +
        ".p-credenziali{" +
        "margin-top: 2vh;" +
        "font-size: 2.5vh;" +
        "}" +
        ".p-footer{" +
        "display: flex;" +
        "justify-content: center;" +
        "align-items: center;" +
        "margin-top: 5vh;" +
        "font-size: 1.5vh;" +
        "}" +
        "</style>" +
        "</head>" +
        "<body>" +
        "<div class=\"div-body\">" +
        "<div class=\"main\">" +
        "<div class=\"title\"><h2>Applications Manager</h2></div>" +
        "<div class=\"content\">" +
        "<p class=\"subject\">Recupero credenziali</p>" +
        "<p>Ciao Utente,</p>" +
        "<p>Ecco le tue credenziali per accedere al nostro sito:</p>" +
        "<div class=\"credenziali\">" +
        "Username: <p class=\"p-credenziali\">"+user+"</p>" +
        "Password: <p class=\"p-credenziali\">"+psw+"</p>" +
        "</div>" +
        "<p>Tienile memorizzate e al sicuro</p>" +
        "<p>Per qualsiasi problema, non esistare a contattarci</p>" +
        "</div>" +
        "<div class=\"Footer\">" +
        "<p class=\"p-footer\">Stai ricevendo questa mail perchè hai acconsentito alla ricezione di mail informative da parte di Applications Manager. Rispettiamo la tua privacy e non condivideremo mai i tuoi dati con terze parti senza il tuo consenso.</p>" +
        "<p class=\"p-footer\">&#64;ApplicationsManager all rights reserved</p>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</body>" +
        "</html>";
      helper.setText(styledBody, true);

      mailSender.send(message);
    } catch (MessagingException e) {
      System.out.println("error while sendin mail");
      // Handle exception
    }
  }

}
