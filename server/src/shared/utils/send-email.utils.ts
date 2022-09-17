import * as nodemailer from 'nodemailer';
import * as config from 'config'
import { InternalServerErrorException } from '@nestjs/common';
import {SendMailModel} from "../../common/models/send-mail.model";

export const sendEmail = async (data: SendMailModel) => {

  const emailConfig = config.get('email');
  const db = config.get('db');

  const transporter = nodemailer.createTransport({
    host: db.host,
    port: db.port,
    secure: true,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.pass
    }
  });

  try {
    await transporter.sendMail({
      from: data.from, // sender address
      to: data.to, // list of receivers
      subject: data.subject, // Subject line
      text: data.text, // plain text body
      html: data.html, // html body
    });
  }catch (e) {
    throw new InternalServerErrorException(e)
  }
  return true
};
