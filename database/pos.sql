-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 24, 2022 at 09:31 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pos`
--

-- --------------------------------------------------------

--
-- Table structure for table `detailtransaksi`
--

CREATE TABLE `detailtransaksi` (
  `no_detail` int(11) NOT NULL,
  `no_transaksi` int(11) NOT NULL,
  `no_produk` int(11) NOT NULL,
  `kuantitas` int(11) NOT NULL,
  `subtotal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detailtransaksi`
--

INSERT INTO `detailtransaksi` (`no_detail`, `no_transaksi`, `no_produk`, `kuantitas`, `subtotal`) VALUES
(10, 29212, 6, 33, 3300000),
(11, 29212, 1, 55, 275000),
(12, 43170, 1, 44, 220000),
(13, 43170, 6, 66, 6600000),
(15, 43170, 1, 44, 220000),
(16, 43170, 6, 54, 5400000),
(17, 43170, 6, 66, 6600000),
(18, 28757, 1, 99, 495000),
(20, 28757, 6, 22, 2200000),
(21, 33166, 1, 34, 170000),
(22, 53444, 1, 78, 390000),
(23, 53444, 6, 55, 5500000),
(24, 53444, 1, 78, 390000),
(25, 53444, 6, 55, 5500000),
(26, 9919, 1, 1, 5000),
(27, 9919, 1, 2, 10000),
(28, 9919, 1, 3, 15000),
(29, 9919, 1, 3, 15000),
(30, 9919, 1, 2, 10000),
(31, 31519, 1, 99, 495000),
(32, 31519, 1, 98, 490000),
(33, 31519, 1, 97, 485000),
(34, 31519, 1, 99, 495000),
(35, 31519, 1, 98, 490000),
(36, 31519, 1, 97, 485000),
(37, 4497, 1, 55, 275000),
(38, 4497, 1, 54, 270000),
(40, 4497, 1, 55, 275000),
(41, 4497, 1, 54, 270000),
(42, 4497, 1, 53, 265000),
(43, 12236, 1, 23, 115000),
(44, 12236, 1, 23, 115000),
(45, 51477, 2, 3, 45000),
(47, 51477, 1, 2, 10000),
(48, 51477, 1, 2, 10000),
(49, 2067, 2, 3, 45000),
(50, 2067, 1, 3, 15000),
(51, 46771, 1, 2, 10000),
(52, 46771, 2, 2, 30000),
(53, 11247937, 1, 5, 25000),
(55, 11247937, 1, 5, 25000),
(56, 1124145612, 2, 2, 30000),
(57, 1124145828, 1, 3, 15000);

-- --------------------------------------------------------

--
-- Table structure for table `jenis`
--

CREATE TABLE `jenis` (
  `no_jenis` int(11) NOT NULL,
  `nama_jenis` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jenis`
--

INSERT INTO `jenis` (`no_jenis`, `nama_jenis`) VALUES
(1, 'Makanan'),
(2, 'Minuman'),
(6, 'Bahan Kimia');

-- --------------------------------------------------------

--
-- Table structure for table `karyawan`
--

CREATE TABLE `karyawan` (
  `no_karyawan` int(11) NOT NULL,
  `id_karyawan` int(11) NOT NULL,
  `nama_karyawan` varchar(25) NOT NULL,
  `nomor_handphone` int(11) NOT NULL,
  `jenis_kelamin` varchar(25) NOT NULL,
  `tanggal_rekrut` date NOT NULL,
  `jabatan` varchar(25) NOT NULL,
  `kode` int(11) NOT NULL,
  `alamat` text NOT NULL,
  `status` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `karyawan`
--

INSERT INTO `karyawan` (`no_karyawan`, `id_karyawan`, `nama_karyawan`, `nomor_handphone`, `jenis_kelamin`, `tanggal_rekrut`, `jabatan`, `kode`, `alamat`, `status`) VALUES
(1, 3001, 'Arief Roihan Nur Rahman', 1, 'Laki - Laki', '2022-10-31', 'Manager', 123456, 'Jl. Kopo', 'Aktif'),
(2, 3002, 'Adi Pratama Putra', 2, 'Laki - Laki', '2022-11-05', 'Kasir', 112233, 'Jl. Cibiru', 'Aktif'),
(3, 3003, 'Ayuni Tia Sari', 3, 'Perempuan', '2022-11-05', 'Owner', 1325467, 'Jl. Cibiru', 'Aktif'),
(8, 3004, 'Aka Fadila', 4, 'Laki - Laki', '2002-01-22', 'Kasir', 121212, 'Jalan Kopo', 'Non-Aktif'),
(9, 3006, 'Abdul', 5, 'Laki - Laki', '2022-11-02', 'Kasir', 123123, 'Jalan Jakarta', 'Non-Aktif');

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `no_kategori` int(11) NOT NULL,
  `nama_kategori` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`no_kategori`, `nama_kategori`) VALUES
(1, 'lokal'),
(2, 'Internasional'),
(6, 'Interlokal');

-- --------------------------------------------------------

--
-- Table structure for table `laporankasir`
--

CREATE TABLE `laporankasir` (
  `no_laporan` int(11) NOT NULL,
  `no_karyawan` int(11) NOT NULL,
  `tanggal_laporan` date NOT NULL,
  `laporan_awal` int(11) NOT NULL,
  `laporan_akhir` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `laporankasir`
--

INSERT INTO `laporankasir` (`no_laporan`, `no_karyawan`, `tanggal_laporan`, `laporan_awal`, `laporan_akhir`) VALUES
(22122462, 2, '2022-12-24', 100000, 1200000),
(202211061, 1, '2022-11-06', 3000000, 4000000);

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `no_produk` int(11) NOT NULL,
  `kd_produk` varchar(25) NOT NULL,
  `nama_produk` varchar(25) NOT NULL,
  `no_jenis` int(11) NOT NULL,
  `no_kategori` int(11) NOT NULL,
  `harga` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `produk`
--

INSERT INTO `produk` (`no_produk`, `kd_produk`, `nama_produk`, `no_jenis`, `no_kategori`, `harga`) VALUES
(1, 'J01K1001', 'Peuyeum', 1, 1, 5000),
(2, 'J02K2002', 'Thai Tea', 2, 2, 15000),
(6, 'J03K1003', 'Asam Sulfat', 6, 6, 100000);

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `no_transaksi` int(11) NOT NULL,
  `no_karyawan` int(11) NOT NULL,
  `tanggal_penjualan` date NOT NULL,
  `total_transaksi` int(11) NOT NULL,
  `bayar` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`no_transaksi`, `no_karyawan`, `tanggal_penjualan`, `total_transaksi`, `bayar`) VALUES
(2067, 1, '2022-10-06', 60000, 70000),
(4497, 1, '2022-10-06', 810000, 0),
(46771, 1, '2022-10-06', 40000, 50000),
(112233, 1, '2022-12-24', 995522, 1000000),
(11247937, 2, '2022-11-24', 50000, 60000),
(112471254, 2, '2022-11-24', 50000, 60000),
(112471323, 2, '2022-11-24', 50000, 60000),
(1124145612, 2, '2022-11-24', 30000, 100000),
(1124145828, 2, '2022-11-24', 15000, 100000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detailtransaksi`
--
ALTER TABLE `detailtransaksi`
  ADD PRIMARY KEY (`no_detail`),
  ADD KEY `no_penjualan` (`no_transaksi`),
  ADD KEY `no_produk` (`no_produk`);

--
-- Indexes for table `jenis`
--
ALTER TABLE `jenis`
  ADD PRIMARY KEY (`no_jenis`);

--
-- Indexes for table `karyawan`
--
ALTER TABLE `karyawan`
  ADD PRIMARY KEY (`no_karyawan`),
  ADD UNIQUE KEY `id_karyawan` (`id_karyawan`),
  ADD UNIQUE KEY `kode` (`kode`),
  ADD UNIQUE KEY `nomor_handphone` (`nomor_handphone`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`no_kategori`);

--
-- Indexes for table `laporankasir`
--
ALTER TABLE `laporankasir`
  ADD PRIMARY KEY (`no_laporan`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`no_produk`),
  ADD UNIQUE KEY `kd_produk` (`kd_produk`),
  ADD KEY `no_jenis` (`no_jenis`),
  ADD KEY `no_kategori` (`no_kategori`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`no_transaksi`),
  ADD KEY `no_karyawan` (`no_karyawan`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detailtransaksi`
--
ALTER TABLE `detailtransaksi`
  MODIFY `no_detail` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `jenis`
--
ALTER TABLE `jenis`
  MODIFY `no_jenis` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `karyawan`
--
ALTER TABLE `karyawan`
  MODIFY `no_karyawan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `no_kategori` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `produk`
--
ALTER TABLE `produk`
  MODIFY `no_produk` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `no_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1124145829;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detailtransaksi`
--
ALTER TABLE `detailtransaksi`
  ADD CONSTRAINT `detailtransaksi_ibfk_2` FOREIGN KEY (`no_produk`) REFERENCES `produk` (`no_produk`);

--
-- Constraints for table `produk`
--
ALTER TABLE `produk`
  ADD CONSTRAINT `produk_ibfk_1` FOREIGN KEY (`no_jenis`) REFERENCES `jenis` (`no_jenis`) ON DELETE CASCADE,
  ADD CONSTRAINT `produk_ibfk_2` FOREIGN KEY (`no_kategori`) REFERENCES `kategori` (`no_kategori`) ON DELETE CASCADE;

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`no_karyawan`) REFERENCES `karyawan` (`no_karyawan`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
