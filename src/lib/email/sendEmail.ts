import * as mailer from 'nodemailer';
import { SendMailOptions } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { HOST_EMAIL, HOST_PW } from '../../config/config'

export default async (email: string, code: string) => {
    const transporter: Mail = mailer.createTransport({
        service: 'Naver',
        host: 'smtp.naver.com',
        port: 587,
        auth: {
            user: HOST_EMAIL,
            pass: HOST_PW
        }
    });

    const mailOptions: SendMailOptions = {
		from: HOST_EMAIL,
		to: email,
		subject: 'My_Blog 이메일 인증',
		text: code,
	};

	await transporter.sendMail(mailOptions);
}