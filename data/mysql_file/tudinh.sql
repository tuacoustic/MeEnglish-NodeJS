-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 19, 2023 at 06:45 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `migrations_typeorm`
--

CREATE TABLE `migrations_typeorm` (
  `id` int(11) NOT NULL,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` varchar(36) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  `slug` text NOT NULL,
  `title` varchar(150) NOT NULL,
  `excerpt` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `tags` text NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `author_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `created_at`, `updated_at`, `deleted_at`, `slug`, `title`, `excerpt`, `content`, `category`, `tags`, `status`, `author_id`) VALUES
('52ea117f-d33e-4ca0-b960-e306a1bef9c3', '2023-03-17 03:30:31.906970', '2023-03-17 03:30:31.906970', NULL, 'admin', 'admin', 'admin', 'admin', 'TECHNOLOGY', 'admin', 1, '2cf6e154-f7a0-4b6e-a827-62ef74d6c9fe'),
('5f49db6d-ff28-4fbc-993b-1fd42f0e8605', '2023-03-17 05:03:27.509396', '2023-03-17 05:03:27.509396', NULL, 'test', 'test', 'test', 'test', 'TECHNOLOGY', 'test', 1, '3da2a228-511a-4ee5-b946-74214d298a81'),
('a2d3df01-5d99-45cb-9001-137d07c2b44e', '2023-03-17 03:30:17.451939', '2023-03-17 03:30:17.451939', NULL, 'admin2', 'admin2', 'admin2', 'admin2', 'TECHNOLOGY', 'admin2', 1, '2cf6e154-f7a0-4b6e-a827-62ef74d6c9fe');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(128) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 0,
  `roles` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `created_at`, `updated_at`, `deleted_at`, `firstname`, `lastname`, `phone`, `email`, `password`, `isActive`, `roles`) VALUES
('2cf6e154-f7a0-4b6e-a827-62ef74d6c9fe', '2023-03-16 07:55:21.566192', '2023-03-16 14:06:48.000000', NULL, 'Nguyen', 'Tuan', '0975089502', 'tudinhacoustic@gmail.com', '$2a$10$PQ0dEYUO80YWXyZq5zoQXO7b79GEpsEsn3qXHryCA/FB9dxNPse6y', 0, 'ADMIN'),
('3da2a228-511a-4ee5-b946-74214d298a81', '2023-03-16 08:41:11.049454', '2023-03-16 13:44:06.000000', NULL, 'Nguyen', 'Tuan', '', 'crazyghostlish@gmail.com', '$2a$10$fFoh2uNNZqsZjSl.ey1axOW3wH7W7q1VJ689AvLD.uwx3vwO/EvRO', 0, 'AUTHOR');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `migrations_typeorm`
--
ALTER TABLE `migrations_typeorm`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_312c63be865c81b922e39c2475e` (`author_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `migrations_typeorm`
--
ALTER TABLE `migrations_typeorm`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `FK_312c63be865c81b922e39c2475e` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
