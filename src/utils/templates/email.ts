import { SES } from 'aws-sdk';
import config from '../config';

// Sender email
const sender_email = 'no-reply@vc-generator.com';


export const sendEmail = (qrCode: string, sharingUrl: string, receiver_email: string) => {
    const ses = new SES({
        apiVersion: '2020-12-01',
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
        region: "us-east-1",
      });
    
    const redirectUrl: string = `${config.wallet_url}/accept-credentials?vcURL=${sharingUrl}`

    let ses_mail = "From: 'Hope Clinic' <" + sender_email + ">\n";
    ses_mail = ses_mail + "To: " + receiver_email + "\n";
    ses_mail = ses_mail + "Subject: Rx from Hope Clinic\n";
    ses_mail = ses_mail + "MIME-Version: 1.0\n";
    ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
    ses_mail = ses_mail + "--NextPart\n";
    ses_mail = ses_mail + "Content-Type: text/html; charset=iso-8859-1\n\n";
    ses_mail = ses_mail + "<html>\n\n";
    ses_mail = ses_mail + "<body>\n\n";
    ses_mail = ses_mail + "<h2>Your Prescription is now available for use</h2>\n\n";
    ses_mail = ses_mail + "<p>To retrieve it, please click on the following link:</p>\n\n";
    ses_mail = ses_mail + "<p><a href='" + redirectUrl + "'>Rx Link</a></p>\n\n";
    ses_mail = ses_mail + "</body>\n\n";
    ses_mail = ses_mail + "</html>\n\n";

    const params = {
        RawMessage: { Data: ses_mail },
        Destinations: [  receiver_email ],
        Source: "Hope Clinic <" + sender_email + ">"
    }

    ses.sendRawEmail(params, (err: any, data: any) => {
        if(err){
            console.log(err)
        }
        else {
            console.log('send');
            console.log(data)
        }
    })
}