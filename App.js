const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
// const session = require('express-session');
// const async = require('async');
const { default: axios } = require('axios');
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.options('*', cors());

// let corsOptions = {
//   origin : ['http://localhost:3000/'],
// } 

// app.use(cors(corsOptions));

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
  
  
//   let date_time = new Date();
//   let date1 = ("0" + date_time.getDate()).slice(-2);
//   let month1 = ("0" + (date_time.getMonth() + 1)).slice(-2);
//   let year1 = date_time.getFullYear();
//   let tanggal = year1 + "-" + month1 + "-" + date1;
//   let tanggal2 =year1+month1+date1;

//   //===========================================================//
// //===================== /SETTING ============================//
// //===========================================================//

//   app.post('/pokemon', (req,res) => {
//     upload(req, res, (err) => {
//         if (err instanceof multer.MulterError) {
//             return res.status(408).json(err);
//         } else if (err) {
//             return res.status(500).json(err);
//         }
//         pool.query("insert into app.pokemon (nama,deskripsi,path) values($1,$2,$3)",[
//             req.body.nama,
//             req.body.deskripsi,
//             req.file.path.replace(/^\/?[^\/]+/, "")
//         ],(err,result)=>{
//             if(err){
//                 return res.status(500).json(err);
//             }
//             pool.query("select * from app.pokemon",(err,result)=>{
//                 if(err){
//                     return res.status(500).json(err);
//                 }
//                 return res.status(200).json(result.rows);
//             })
//         });

//     })
// });
// app.get('/pokemon',(req,res)=>{
//     pool.query("select * from app.pokemon",(err,result)=>{
//         if(err){
//             return res.status(500).json(err);
//         }
//         return res.status(200).json(result.rows);
//     })
// })

// app.get('/', function (req, res) {
//     res.json({message: 'WELCOME'});
// });


// app.get('/',(req,res)=>{
//   res.json({token: req.session.loggedin});
// });

// app.post('/auth', function(req,res) {
//   let kode = req.body.kode_kasir;
//   conn.query('SELECT * FROM karyawan WHERE kode = ?', [kode], function(error, results, fields) {
//     if(results.length > 0){
//       req.session.sessionid = year1+""+month1+""+date1+""+results[0].no_karyawan;
//       res.json({
//         token : req.session.loggedin = true,
//         datakasir : req.session.dataKasir = results[0],
//         sessionid : req.session.sessionid
//       })
//     }
//   });
// });
  



// app.post('/add-laporan-awal',(req, res) => {
//     let data = {
//       no_laporan : req.session.id_session,
//       no_karyawan : req.session.dataKasir.no_karyawan,
//       tanggal_laporan : tanggal,
//       laporan_awal : req.body.laporan_awal
//     };
//     session.laporan_awal = req.body.laporan_awal;
//     let sql = "INSERT INTO laporankasir SET ?";
//     let query = conn.query(sql, data,(err, results) => {
//       res.json({laporanawal: session.laporan_awal});
//     });
// });

// app.post('/add-laporan-akhir',(req, res) => {
//     let sql = "UPDATE laporankasir SET laporan_akhir ='"+req.body.laporan_akhir+"' WHERE no_laporan="+req.session.id_session+";"
//     let query = conn.query(sql,(err, results) => {
//       if(err) throw err;
//       req.session.loggedin = false;
//       req.session.dataKasir = null;
//       req.session.id_session = null;
//     });
// });

// app.get('/kasir', (req,res) => {
//     var query = 'SELECT produk.kd_produk, produk.nama_produk, jenis.nama_jenis, kategori.nama_kategori, produk.harga from produk INNER JOIN jenis ON produk.no_jenis = jenis.no_jenis INNER JOIN kategori ON produk.no_kategori = kategori.no_kategori;';
//     conn.query(query, function(err, data1){
//           if(err) throw err;
//       res.json({listProduk1: session.data1});
//       }); 
//   });
  
//   app.post("/get-produk-kode", function(request, response, next){
//       var kode = request.body.kode;
//       var query = `SELECT * FROM produk WHERE kd_produk = "${kode}"`;
//       conn.query(query, function(error, data){
//           response.json(data[0]);
//       });
//   });
  
//   app.post("/save-item", function(request, response, next){
//       var idt = request.body.id_transaksi;
//       var idp = request.body.id_produk;
//       var kuantitas = request.body.kuantitas;
//       var subtotal = request.body.subtotal;
  
//       var query = `INSERT INTO detailtransaksi (no_detail, no_transaksi, no_produk, kuantitas, subtotal) VALUES ("", "${idt}", "${idp}", "${kuantitas}", "${subtotal}")`;
//       conn.query(query, function(error, data){
//           console.log("Sukses Detail Transaksi");
          
//       });
//   });
  
//   app.post("/get-item-list", function(request, response, next){
//       var idt = request.body.id_transaksi;
//       var query = `select detailtransaksi.no_detail, produk.nama_produk, produk.harga, detailtransaksi.kuantitas, detailtransaksi.subtotal from detailtransaksi INNER JOIN produk ON detailtransaksi.no_produk = produk.no_produk WHERE no_transaksi = "${idt}"`;
//       conn.query(query, function(error, data){
//           response.json(data);
//       });
//   });
  
//   app.post("/save-penjualan", function(request, response, next){
//       var idp = request.body.id_penjualan;
//       var idk = request.body.id_karyawan;
//       var tp = request.body.tanggal_penjualan;
//       var total = request.body.total_transaksi;
//       var bayar = request.body.bayar;
  
//     console.log(idp);
//     console.log(idk);
//     console.log(tp);
//     console.log(total);
//     console.log(bayar);
  
//       var query = `INSERT INTO transaksi (no_transaksi, no_karyawan, tanggal_penjualan, total_transaksi, bayar) VALUES ("${idp}", "${idk}", "${tp}", "${total}", "${bayar}")`;
//       conn.query(query, function(error, data){
//           console.log("Sukses Transaksi");
//       });
  
//     response.redirect('/kasir');
//   });
  
//   app.post('/delete-item/', (req,res)=>{
//     let id = req.body.id;
//     console.log(id);
//     let sql = "DELETE FROM detailtransaksi WHERE no_detail="+id+"";
//     let query = conn.query(sql,(err, results) => {
//       if(err) throw err;
      
//     });
//   });
  
  // app.get('/laporan-awal', (req,res) => {
  //   res.render('kasir/laporan-awal.ejs',{
  //     dataKasir: req.session.dataKasir,
  //     dataSession : req.session.id_session
  //   });
  // });
  
  // app.get('/laporan-akhir', (req,res) => {
  //   res.render('kasir/laporan-akhir.ejs',{
  //     lap_awal: session.laporan_awal,
  //   });
  // });

// ================== GET DATA MANAGER =======================
  
app.get('/API/jenis', (req, res)=>{
  res.set('Access-Control-Allow-Origin', '*');
  conn.query('select * from jenis ORDER BY nama_jenis ASC;', (error, result)=>{
    if(error) return console.log("Error Request Jenis From Database");
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  });
});

app.get('/API/kategori', (req, res)=>{
  res.set('Access-Control-Allow-Origin', '*');
  conn.query('select * from kategori ORDER BY nama_kategori ASC;', (error, result)=>{
    if(error) return console.log("Error Request Jenis From Database");
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  });
});

app.get('/API/karyawan', (req, res)=>{
  res.set('Access-Control-Allow-Origin', '*');
  conn.query('select * from karyawan ORDER BY nama_karyawan ASC;', (error, result)=>{
    if(error) return console.log("Error Request Jenis From Database");
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  });
});

app.get('/API/produk', (req, res)=>{
  res.set('Access-Control-Allow-Origin', '*');
  conn.query('select * from produk ORDER BY nama_produk ASC;', (error, result)=>{
    if(error) return console.log("Error Request Jenis From Database");
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  });
});

app.get('/API/penjualan', (req, res)=>{
  res.set('Access-Control-Allow-Origin', '*');
  conn.query('select * from penjualan ORDER BY tanngal_penjualan ASC;', (error, result)=>{
    if(error) return console.log("Error Request Jenis From Database");
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  });
});

// ================== EDIT MANAGER =======================

app.post('/API/post/jenis', (req, res)=>{
  res.set('Access-Control-Allow-Origin', '*');
  const {
    nama_jenis,
    no_jenis,
  } = req.body;
  conn.query(`UPDATE jenis SET nama_jenis = '${nama_jenis}' WHERE jenis.no_jenis = ${no_jenis}`, (error, result)=>{
    if(error) return console.log(`Error Request Jenis From Database: ${error}`);
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  });
});

app.post('/API/post/kategori', (req, res)=>{
  res.set('Access-Control-Allow-Origin', '*');
  const {
    nama_kategori,
    no_kategori,
  } = req.body;
  conn.query(`UPDATE kategori SET nama_kategori = '${nama_kategori}' WHERE kategori.no_kategori = ${no_kategori}`, (error, result)=>{
    if(error) return console.log(`Error Request Kategori From Database: ${error}`);
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  });
});

app.post('/API/post/produk', (req, res)=>{
  res.set('Access-Control-Allow-Origin', '*');
  const {
    no_produk,
    kd_produk,
    nama_produk,
    no_jenis,
    no_kategori,
    harga,
  } = req.body;
  conn.query(`UPDATE produk SET kd_produk = '${kd_produk}', nama_produk = '${nama_produk}', no_jenis = '${no_jenis}', no_kategori = '${no_kategori}', harga = '${harga}' WHERE no_produk = '${no_produk}'`, (error, result)=>{
    if(error) return console.log(`Error Request Produk From Database: ${error}`);
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  });
});

app.post('/API/post/karyawan', (req, res)=>{
  res.set('Access-Control-Allow-Origin', '*');
  const {
    no_karyawan,
    id_karyawan,
    nomor_handphone,
    nama_karyawan,
    jenis_kelamin,
    tanggal_rekrut,
    jabatan,
    kode,
    status,
    alamat,
  } = req.body;
  conn.query(`UPDATE karyawan SET id_karyawan='${id_karyawan}',nama_karyawan='${nama_karyawan}',nomor_handphone='${nomor_handphone}',jenis_kelamin='${jenis_kelamin}',tanggal_rekrut='${tanggal_rekrut}',jabatan='${jabatan}',kode='${kode}', status='${status}',alamat='${alamat}' WHERE no_karyawan = '${no_karyawan}'`, (error, result)=>{
    if(error) return console.log(`Error Request Karyawan From Database: ${error}`);
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  });
});

app.post('/API/post/penjualan', (req, res)=>{
  res.set('Access-Control-Allow-Origin', '*');
  const {
    nama_penjualan,
    no_penjualan,
  } = req.body;
  conn.query(`UPDATE penjualan SET nama_penjualan = '${nama_penjualan}' WHERE penjualan.no_penjualan = ${no_penjualan}`, (error, result)=>{
    if(error) return console.log(`Error Request Penjualan From Database: ${error}`);
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  });
});

// ================== DELETE MANAGER =======================

app.delete('/API/delete/jenis/:no_jenis', (req, res)=>{
  res.set('Access-Control-Allow-Origin', '*');
  const {no_jenis} = req.params;
  console.log(no_jenis);
  conn.query(`DELETE FROM jenis WHERE no_jenis = '${no_jenis}'`, (error, result)=>{
    if(error) console.log(error);
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  })
});
app.delete('/API/delete/kategori/:no_kategori', (req, res)=>{
  res.set('Access-Control-Allow-Origin', '*');
  const {no_kategori} = req.params;
  console.log(no_kategori);
  conn.query(`DELETE FROM kategori WHERE no_kategori = '${no_kategori}'`, (error, result)=>{
    if(error) console.log(error);
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  })
});

app.delete('/API/delete/karyawan/:no_karyawan', (req, res)=>{
  res.set('Access-Control-Allow-Origin', '*');
  const {no_karyawan} = req.params;
  console.log(no_karyawan);
  conn.query(`DELETE FROM karyawan WHERE no_karyawan = '${no_karyawan}'`, (error, result)=>{
    if(error) console.log(error);
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  })
});

app.delete('/API/delete/produk/:no_produk', (req, res)=>{
  res.set('Access-Control-Allow-Origin', '*');
  const {no_produk} = req.params;
  console.log(no_produk);
  conn.query(`DELETE FROM produk WHERE no_produk = '${no_produk}'`, (error, result)=>{
    if(error) console.log(error);
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  })
});


// ================== TAMBAH MANAGER =======================
app.post('/API/tambah/jenis', (req, res)=>{
  res.set('Access-Control-Allow-Origin', '*');
  const {nama_jenis} = req.body;
  conn.query(`INSERT INTO jenis VALUES (NULL, '${nama_jenis}')`, (error, result)=>{
    if(error) return console.log(error);
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  })
});

app.post('/API/tambah/kategori', (req, res)=>{
  res.set('Access-Control-Allow-Origin', '*');
  const {nama_kategori} = req.body;
  conn.query(`INSERT INTO kategori VALUES (NULL, '${nama_kategori}')`, (error, result)=>{
    if(error) return console.log(error);
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  })
});

app.post('/API/tambah/karyawan', (req, res)=>{
  res.set('Access-Control-Allow-Origin', '*');
  const {
    id_karyawan,
    nama_karyawan,
    nomor_handphone,
    jenis_kelamin,
    tanggal_rekrut,
    jabatan,
    kode,
    status,
    alamat,
  } = req.body;
  conn.query(`INSERT INTO karyawan VALUES (NULL, '${id_karyawan}', '${nama_karyawan}', '${nomor_handphone}', '${jenis_kelamin}', '${tanggal_rekrut}', '${jabatan}', '${kode}', '${status}' , '${alamat}')`, (error, result)=>{
    if(error) return console.log(error);
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  })
});

app.post('/API/tambah/produk', (req, res)=>{
  res.set('Access-Control-Allow-Origin', '*');
  const {
    kd_produk,
    nama_produk,
    no_jenis,
    no_kategori,
    harga,
  } = req.body;
  conn.query(`INSERT INTO produk VALUES (NULL, '${kd_produk}', '${nama_produk}', '${no_jenis}', '${no_kategori}', '${harga}')`, (error, result)=>{
    if(error) return console.log(error);
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  })
});

app.listen(5000, () => {
  console.log("Server running in port : 5000");
});