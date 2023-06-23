import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SendEmailDto } from 'src/modules/users/dto/send-email.dto';
import * as Mailgen from 'mailgen';

const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Emotors',
    link: 'http://localhost:3001',
  },
});

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail({ to, subject, text }: SendEmailDto) {
    await this.mailerService
      .sendMail({
        to,
        subject,
        html: text,
      })
      .then(() => {
        console.log('Email send with sucess');
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException(
          'Error sending email, try again later',
        );
      });
  }

  resetPasswordTemplate(
    userEmail: string,
    userName: string,
    resetToken: string,
  ) {
    const email = {
      body: {
        name: userName,
        intro:
          'Você recebeu esse e-mail devido a sua solicitação de recuparação de senha',
        action: {
          instructions: 'Clique no botão abaixo para recuperar sua senha:',
          button: {
            color: '#DC4D2F',
            text: 'Recuperar Senha',
            link: `http://localhost:3001/users/resetPassword/${resetToken}`,
          },
        },
        outro:
          'Se você não solicitou uma redefinição de senha, nenhuma outra ação será necessária de sua parte.',
      },
    };

    const emailbody = mailGenerator.generate(email);

    const emailTemplate = {
      to: userEmail,
      subject: 'Reset password Emotors',
      text: emailbody,
    };

    return emailTemplate;
  }
}
