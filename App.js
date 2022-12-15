const express = require('express');
const app = express();
const mysql = require('mysql');
const session = require('express-session');
const async = require('async');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3000, () => {
    console.log("Server running in port : 3000");
});

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pos"
});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    loggedin: false,
    laporan_awal:null,
    id_session: null
  }));
  
  
  let date_time = new Date();
  let date1 = ("0" + date_time.getDate()).slice(-2);
  let month1 = ("0" + (date_time.getMonth() + 1)).slice(-2);
  let year1 = date_time.getFullYear();
  let tanggal = year1 + "-" + month1 + "-" + date1;
  let tanggal2 =year1+month1+date1;

  //===========================================================//
//===================== /SETTING ============================//
//===========================================================//

app.get('/',(req,res)=>{
    if(req.session.loggedin == true){
      res.redirect('/kasir');
    }else{
      res.render('login.ejs');
    }
  });
  
  app.post('/auth', function(req,res) {
    let kode = req.body.kode_kasir;
    conn.query('SELECT * FROM karyawan WHERE kode = ?', [kode], function(error, results, fields) {
      if (error) throw error;
        if (results.length > 0) {
            req.session.loggedin = true;
            req.session.dataKasir = results[0];
            req.session.id_session = year1+""+month1+""+date1+""+results[0].no_karyawan;
            res.redirect('/laporan-awal');
        } else {
          res.send('Kode Salah!');
        }			
        res.end();
      });
  });
  
  //===========================================================//
  //===================== /LOGIN AUTH ============================//
  //===========================================================//
  
  app.get('/laporan-awal', (req,res) => {
    res.render('kasir/laporan-awal.ejs',{
      dataKasir: req.session.dataKasir,
      dataSession : req.session.id_session
    });
  });
  
  app.post('/add-laporan-awal',(req, res) => {
    let data = {
      no_laporan : req.session.id_session,
      no_karyawan : req.session.dataKasir.no_karyawan,
      tanggal_laporan : tanggal,
      laporan_awal : req.body.laporan_awal
    };
    session.laporan_awal = req.body.laporan_awal;
    let sql = "INSERT INTO laporankasir SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/kasir');
    });
  });
  
  app.get('/laporan-akhir', (req,res) => {
    res.render('kasir/laporan-akhir.ejs',{
      lap_awal: session.laporan_awal,
    });
  });
  
  app.post('/add-laporan-akhir',(req, res) => {
    let sql = "UPDATE laporankasir SET laporan_akhir ='"+req.body.laporan_akhir+"' WHERE no_laporan="+req.session.id_session+";"
    
    let query = conn.query(sql,(err, results) => {
      if(err) throw err;
      req.session.loggedin = false;
      req.session.dataKasir = null;
      req.session.id_session = null;
      res.redirect('/');
    });
  });
  
  
  //===========================================================//
  //===================== /Laporan Laci ============================//
  //===========================================================//
  
  
  app.get('/kasir', (req,res) => {
    var query = 'SELECT produk.kd_produk, produk.nama_produk, jenis.nama_jenis, kategori.nama_kategori, produk.harga from produk INNER JOIN jenis ON produk.no_jenis = jenis.no_jenis INNER JOIN kategori ON produk.no_kategori = kategori.no_kategori;';
    conn.query(query, function(err, data1){
          if(err) throw err;
      res.render('kasir/home-kasir.ejs',{
        listProduk1: data1,
      });
      }); 
  });
  
  app.post("/get-produk-kode", function(request, response, next){
      var kode = request.body.kode;
      var query = `SELECT * FROM produk WHERE kd_produk = "${kode}"`;
      conn.query(query, function(error, data){
          response.json(data[0]);
      });
  });
  
  app.post("/save-item", function(request, response, next){
      var idt = request.body.id_transaksi;
      var idp = request.body.id_produk;
      var kuantitas = request.body.kuantitas;
      var subtotal = request.body.subtotal;
  
      var query = `INSERT INTO detailtransaksi (no_detail, no_transaksi, no_produk, kuantitas, subtotal) VALUES ("", "${idt}", "${idp}", "${kuantitas}", "${subtotal}")`;
      conn.query(query, function(error, data){
          console.log("Sukses Detail Transaksi");
          
      });
  });
  
  app.post("/get-item-list", function(request, response, next){
      var idt = request.body.id_transaksi;
      var query = `select detailtransaksi.no_detail, produk.nama_produk, produk.harga, detailtransaksi.kuantitas, detailtransaksi.subtotal from detailtransaksi INNER JOIN produk ON detailtransaksi.no_produk = produk.no_produk WHERE no_transaksi = "${idt}"`;
      conn.query(query, function(error, data){
          response.json(data);
      });
  });
  
  app.post("/save-penjualan", function(request, response, next){
      var idp = request.body.id_penjualan;
      var idk = request.body.id_karyawan;
      var tp = request.body.tanggal_penjualan;
      var total = request.body.total_transaksi;
      var bayar = request.body.bayar;
  
    console.log(idp);
    console.log(idk);
    console.log(tp);
    console.log(total);
    console.log(bayar);
  
      var query = `INSERT INTO transaksi (no_transaksi, no_karyawan, tanggal_penjualan, total_transaksi, bayar) VALUES ("${idp}", "${idk}", "${tp}", "${total}", "${bayar}")`;
      conn.query(query, function(error, data){
          console.log("Sukses Transaksi");
      });
  
    response.redirect('/kasir');
  });
  
  app.post('/delete-item/', (req,res)=>{
    let id = req.body.id;
    console.log(id);
    let sql = "DELETE FROM detailtransaksi WHERE no_detail="+id+"";
    let query = conn.query(sql,(err, results) => {
      if(err) throw err;
      
    });
  });
  
  
  //===========================================================//
  //===================== /KASIR UTAMA ============================//
  //===========================================================//


  app.post('/pokemon', (req,res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(408).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }
        pool.query("insert into app.pokemon (nama,deskripsi,path) values($1,$2,$3)",[
            req.body.nama,
            req.body.deskripsi,
            req.file.path.replace(/^\/?[^\/]+/, "")
        ],(err,result)=>{
            if(err){
                return res.status(500).json(err);
            }
            pool.query("select * from app.pokemon",(err,result)=>{
                if(err){
                    return res.status(500).json(err);
                }
                return res.status(200).json(result.rows);
            })
        });

    })
});
app.get('/pokemon',(req,res)=>{
    pool.query("select * from app.pokemon",(err,result)=>{
        if(err){
            return res.status(500).json(err);
        }
        return res.status(200).json(result.rows);
    })
})

app.get('/', function (req, res) {
    res.json({message: 'WELCOME'});
});