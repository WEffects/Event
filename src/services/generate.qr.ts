import QRCode from "qrcode";
import * as path from "path";
export const generateQR = async (ticketCode: string) => {
 const baseDir = __dirname.replace(/src[\\/]services/, '');
  const qrCodeFilePath = path.join(baseDir,
    "/public/qr",
    `${ticketCode}.jpg`
  );
  
  QRCode.toFile(
    qrCodeFilePath,
    `http://localhost:5000/checkedin/${ticketCode}`,
    function (err) {
      if (err) throw err;
    }
  );
};
