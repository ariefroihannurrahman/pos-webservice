const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
// const session = require('express-session');
const async = require('async');
const { default: axios } = require('axios');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// let corsOptions = {
//   origin: ['http://localhost:3000/'],
// }

// app.use(cors(corsOptions));


app.use(cors());

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pos"
});

// app.use(session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true,
//     loggedin: false,
//     laporan_awal:null,
//     sessionid: null
//   }));


let date_time = new Date();
let date1 = ("0" + date_time.getDate()).slice(-2);
let month1 = ("0" + (date_time.getMonth() + 1)).slice(-2);
let year1 = date_time.getFullYear();
let menit = date_time.getMinutes();
let tanggal = year1 + "-" + month1 + "-" + date1;
let tanggal2 = year1 + month1 + date1;
let tahun = year1.toString().substring(2);

app.post('/auth', function (req, res) {
  let kode = req.body.kode;
  conn.query('SELECT * FROM karyawan WHERE kode = ?', [kode], function (error, results, fields) {
    if (results.length > 0) {
      let sessionid = tahun + "" + month1 + "" + date1 + "" + menit + "" + results[0].no_karyawan;
      res.send({
        login: true,
        namakasir: results[0].nama_karyawan,
        idkasir: results[0].no_karyawan,
        sessionid: sessionid
      })
    } else {
      res.send({
        login: false
      })
    }
  });
});

app.post('/add-laporan-awal', (req, res) => {
  let data = {
    no_laporan: req.body.id_session,
    no_karyawan: req.body.no_karyawan,
    tanggal_laporan: tanggal,
    laporan_awal: req.body.laporan_awal
  };
  let laporan_awal = req.body.laporan_awal;
  let sql = "INSERT INTO laporankasir SET ?";
  conn.query(sql, data, (err, results) => {
    res.json({ laporanawal: laporan_awal });
  });
});

app.post('/add-laporan-akhir', (req, res) => {
  let sql = "UPDATE laporankasir SET laporan_akhir ='" + req.body.laporan_akhir + "' WHERE no_laporan=" + req.body.id_session + ";"
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json({ message: "sukses" });
  });
});



app.post("/get-produk-kode", function (request, response, next) {
  var kode = request.body.kode;
  var query = `SELECT * FROM produk WHERE kd_produk = "${kode}"`;
  conn.query(query, function (error, data) {
    response.json(data[0]);
  });
});

app.post("/save-item", function (request, response, next) {
  var idt = request.body.id_transaksi;
  var idp = request.body.id_produk;
  var kuantitas = request.body.kuantitas;
  var subtotal = request.body.subTotal;

  var query = `INSERT INTO detailtransaksi (no_detail, no_transaksi, no_produk, kuantitas, subtotal) VALUES ("", "${idt}", "${idp}", "${kuantitas}", "${subtotal}")`;
  conn.query(query, function (error, data1) {
    response.send(data1);

  });
});

app.post("/get-item-list", function (request, response, next) {
  var idt = request.body.id_transaksi;
  var query = `select detailtransaksi.no_detail, produk.nama_produk, produk.harga, detailtransaksi.kuantitas, detailtransaksi.subtotal from detailtransaksi INNER JOIN produk ON detailtransaksi.no_produk = produk.no_produk WHERE no_transaksi = "${idt}"`;
  conn.query(query, function (error, data2) {
    response.send(data2);
  });
});

app.post("/get-save-item", function (request, response, next) {
  var idt = request.body.id_transaksi;
  var idp = request.body.id_produk;
  var kuantitas = request.body.kuantitas;
  var subtotal = request.body.subTotal;

  async.parallel([
    function (callback) {
      let sql = `INSERT INTO detailtransaksi (no_detail, no_transaksi, no_produk, kuantitas, subtotal) VALUES ("", "${idt}", "${idp}", "${kuantitas}", "${subtotal}")`;
      conn.query(sql, (err, results1) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results1);
      });
    }, function (callback) {
      let sql = `select detailtransaksi.no_detail, produk.nama_produk, produk.harga, detailtransaksi.kuantitas, detailtransaksi.subtotal from detailtransaksi INNER JOIN produk ON detailtransaksi.no_produk = produk.no_produk WHERE no_transaksi = "${idt}"`;
      conn.query(sql, (err, results2) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results2);
      });
    }
  ], function (error, callbackResults) {
    if (error) {
      console.log(error);
    } else {
      response.send({
        listItem: callbackResults[1]
      })
    }
  });
});

app.post("/get-delete-item", function (request, response, next) {
  var idt = request.body.id_transaksi;
  var id = request.body.no_detail;

  async.parallel([
    function (callback) {
      let sql = `SELECT subtotal FROM detailtransaksi WHERE no_detail="${id}"`;
      conn.query(sql, (err, results1) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results1);
      });
    }, function (callback) {
      let sql = `DELETE FROM detailtransaksi WHERE no_detail="${id}"`;
      conn.query(sql, (err, results2) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results2);
      });
    }, function (callback) {
      let sql = `select detailtransaksi.no_detail, produk.nama_produk, produk.harga, detailtransaksi.kuantitas, detailtransaksi.subtotal from detailtransaksi INNER JOIN produk ON detailtransaksi.no_produk = produk.no_produk WHERE no_transaksi = "${idt}"`;
      conn.query(sql, (err, results3) => {
        if (err) {
          return callback(err);
        }
        return callback(null, results3);
      });
    }
  ], function (error, callbackResults) {
    if (error) {
      console.log(error);
    } else {
      response.send({
        subtotalItem: callbackResults[0],
        listItem: callbackResults[2]
      })
    }
  });
});

app.post("/save-transaksi", function (request, response, next) {
  var idp = request.body.id_transaksi;
  var idk = request.body.id_karyawan;
  var tp = request.body.tanggal_penjualan;
  var total = request.body.total_transaksi;
  var bayar = request.body.bayar;

  var query = `INSERT INTO transaksi (no_transaksi, no_karyawan, tanggal_penjualan, total_transaksi, bayar) VALUES ("${idp}", "${idk}", "${tp}", "${total}", "${bayar}")`;
  conn.query(query, function (error, data) {
    console.log("Sukses Transaksi");
  });
});





app.get('/API/jenis', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  conn.query('select * from jenis', (error, result) => {
    if (error) return console.log("Error Request Jenis From Database");
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  });
});

app.get('/API/kategori', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  conn.query('select * from kategori', (error, result) => {
    if (error) return console.log("Error Request Jenis From Database");
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  });
});

app.get('/API/karyawan', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  conn.query('select * from karyawan', (error, result) => {
    if (error) return console.log("Error Request Jenis From Database");
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  });
});

app.get('/API/produk', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  conn.query('select * from produk', (error, result) => {
    if (error) return console.log("Error Request Jenis From Database");
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  });
});

app.get('/API/penjualan', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  conn.query('select * from penjualan', (error, result) => {
    if (error) return console.log("Error Request Jenis From Database");
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  });
});

app.listen(5000, () => {
  console.log("Server running in port : 5000");
});