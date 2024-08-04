import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const emailAdapter = {
    async sendEmail(email: string, subject: string, message: string) {
        const transport = nodemailer.createTransport({
            host: 'smtp.yandex.ru',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const info = await transport.sendMail({
            from: 'Pavel <pav.murashckin@yandex.ru>',
            to: email,
            subject: subject,
            html: message,
        });
        return info;
    },
};