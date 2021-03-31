import aws from 'aws-sdk';

// Sender email
const sender_email = 'hello@example.com';

export const sendEmail = (qrCode: string, sharingUrl: string, receiver_email: string) => {
    const ses = new aws.SES();

    let ses_mail = "From: 'StartUpA Driving License Issuer' <" + sender_email + ">\n";
    ses_mail = ses_mail + "To: " + receiver_email + "\n";
    ses_mail = ses_mail + "Subject: Driving License VC Approval\n";
    ses_mail = ses_mail + "MIME-Version: 1.0\n";
    ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
    ses_mail = ses_mail + "--NextPart\n";
    ses_mail = ses_mail + "Content-Type: text/html; charset=iso-8859-1\n\n";
    ses_mail = ses_mail + "Content-Transfer-Encoding: quoted-printable\n\n";
    ses_mail = ses_mail + "<html>\n\n";
    ses_mail = ses_mail + "<body>\n\n";
    ses_mail = ses_mail + "<h2>Your application for verifiable credentials has been approved.</h2>\n\n";
    ses_mail = ses_mail + "<p>You can retrieve and store your verifiable credentials through either the link provided or by scanning the QR code.</p>\n\n";
    ses_mail = ses_mail + "<p>Link: <a href='"+sharingUrl+"'>Sharing URL</a></p>\n\n";
    ses_mail = ses_mail + "<p>QR Code:</p>\n\n";
    ses_mail = ses_mail + "<img src="+qrCode+"/>\n\n";
    ses_mail = ses_mail + "</body>\n\n";
    ses_mail = ses_mail + "</html>\n\n";

    const params = {
        RawMessage: { Data: btoa(ses_mail) },
        Destinations: [ receiver_email ],
        Source: "StartUpA Driving License Issuer' <" + sender_email + ">'"
    }

    ses.sendRawEmail(params, (err, data) => {
        if(err){
            console.log(err)
        }
        else {
            console.log('send');
            console.log(data)
        }
    })
}