-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 10 2022 г., 18:49
-- Версия сервера: 10.4.22-MariaDB
-- Версия PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `clothes`
--

-- --------------------------------------------------------

--
-- Структура таблицы `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `items_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]' CHECK (json_valid(`items_ids`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `carts`
--

INSERT INTO `carts` (`id`, `items_ids`) VALUES
(1, '[]'),
(2, '[]'),
(3, '[]'),
(4, '[]'),
(5, '[]'),
(6, '[]'),
(7, '[]'),
(8, '[]'),
(9, '[]'),
(10, '[]');

-- --------------------------------------------------------

--
-- Структура таблицы `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `product_type_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `sizes_counts_id` int(11) NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `cart_items`
--

INSERT INTO `cart_items` (`id`, `product_type_id`, `product_id`, `sizes_counts_id`, `count`) VALUES
(127, 1, 1, 1, 4),
(128, 1, 1, 3, 1),
(129, 1, 1, 4, 1),
(130, 1, 1, 1, 1),
(131, 1, 1, 1, 1),
(132, 1, 1, 2, 1),
(133, 1, 1, 1, 1),
(134, 1, 2, 4, 1),
(135, 1, 1, 1, 1),
(136, 2, 1, 5, 1),
(137, 1, 1, 1, 1),
(138, 1, 1, 1, 1),
(139, 1, 1, 1, 1),
(140, 1, 1, 3, 1),
(141, 1, 1, 1, 1),
(142, 2, 1, 5, 4);

-- --------------------------------------------------------

--
-- Структура таблицы `deliveries`
--

CREATE TABLE `deliveries` (
  `id` int(11) NOT NULL,
  `delivery_items_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '[]' CHECK (json_valid(`delivery_items_ids`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `deliveries`
--

INSERT INTO `deliveries` (`id`, `delivery_items_ids`) VALUES
(1, '[]'),
(2, '[58,59,60,61,62,63,64,65]'),
(3, '[]'),
(4, '[]'),
(5, '[]'),
(6, '[]'),
(7, '[]'),
(8, '[]'),
(9, '[]'),
(10, '[]');

-- --------------------------------------------------------

--
-- Структура таблицы `delivery_items`
--

CREATE TABLE `delivery_items` (
  `id` int(11) NOT NULL,
  `product_type_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `sizes_counts_id` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `status_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `delivery_items`
--

INSERT INTO `delivery_items` (`id`, `product_type_id`, `product_id`, `sizes_counts_id`, `count`, `status_id`) VALUES
(1, 1, 2, 1, 2, 2),
(2, 2, 3, 5, 1, 5),
(3, 1, 1, 1, 1, 2),
(4, 2, 1, 5, 1, 2),
(5, 1, 1, 1, 1, 2),
(6, 2, 1, 5, 1, 2),
(7, 1, 1, 1, 1, 2),
(8, 2, 1, 5, 1, 2),
(9, 1, 1, 1, 1, 2),
(10, 2, 1, 5, 1, 2),
(11, 1, 1, 1, 1, 2),
(12, 2, 1, 5, 1, 2),
(13, 1, 1, 1, 1, 2),
(14, 2, 1, 5, 1, 2),
(15, 1, 1, 1, 1, 2),
(16, 2, 1, 5, 1, 2),
(17, 1, 1, 1, 1, 2),
(18, 2, 1, 5, 1, 2),
(19, 1, 1, 1, 1, 2),
(20, 2, 1, 5, 1, 2),
(21, 1, 1, 1, 1, 2),
(22, 2, 1, 5, 2, 2),
(23, 1, 2, 3, 1, 2),
(24, 1, 2, 3, 2, 2),
(25, 1, 2, 1, 20, 3),
(26, 1, 2, 1, 10, 3),
(27, 2, 1, 5, 8, 3),
(28, 1, 1, 3, 4, 3),
(29, 1, 2, 1, 10, 3),
(30, 1, 2, 1, 2, 3),
(31, 1, 2, 1, 38, 3),
(32, 1, 2, 1, 3, 3),
(33, 1, 1, 1, 3, 3),
(34, 1, 1, 2, 1, 3),
(35, 1, 2, 1, 1, 3),
(36, 1, 3, 1, 1, 3),
(37, 1, 1, 2, 1, 2),
(38, 1, 2, 4, 3, 2),
(39, 2, 1, 6, 4, 2),
(40, 1, 1, 1, 1, 2),
(41, 1, 2, 3, 1, 2),
(42, 1, 1, 2, 1, 2),
(43, 2, 1, 6, 1, 2),
(44, 1, 1, 1, 1, 2),
(45, 2, 1, 6, 1, 2),
(46, 1, 1, 1, 1, 2),
(47, 2, 1, 5, 1, 2),
(48, 1, 1, 1, 1, 2),
(49, 2, 1, 5, 1, 2),
(50, 1, 2, 1, 1, 2),
(51, 2, 1, 5, 1, 2),
(52, 1, 2, 1, 1, 2),
(53, 2, 1, 5, 1, 2),
(54, 1, 2, 1, 1, 2),
(55, 2, 1, 5, 1, 2),
(56, 1, 1, 1, 1, 2),
(57, 2, 1, 5, 1, 2),
(58, 1, 1, 3, 1, 3),
(59, 2, 2, 6, 2, 3),
(60, 3, 1, 2, 2, 3),
(61, 4, 3, 2, 1, 3),
(62, 2, 2, 6, 1, 2),
(63, 1, 1, 1, 32, 3),
(64, 1, 1, 1, 32, 3),
(65, 1, 1, 1, 1, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `hoodies`
--

CREATE TABLE `hoodies` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `sizes_price_id` int(11) NOT NULL,
  `structure` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`structure`)),
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `hoodies`
--

INSERT INTO `hoodies` (`id`, `name`, `sizes_price_id`, `structure`, `images`, `description`) VALUES
(1, 'Желтое худи', 2, '{ \n\"cotton\" : 95,\n \"spandex\": 5\n}', '[ \"api/img/hoodies/1.jpg\" ]', 'Очень красивое желтое худи'),
(2, 'Серое худи', 2, '{ \n\"cotton\" : 95,\n \"spandex\": 5\n}', '[\"api/img/hoodies/2.jpg\"]', 'Скромное, но при этом изящное серое худи'),
(3, 'Бирюзовое худи', 2, '{\r\n \"cotton\": 95,\r\n \"spandex\": 5\r\n}', '[\"api/img/hoodies/4.jpg\"]', 'Очень красивое бирюзовое худи');

-- --------------------------------------------------------

--
-- Структура таблицы `pants`
--

CREATE TABLE `pants` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `sizes_price_id` int(11) NOT NULL,
  `structure` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`structure`)),
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `pants`
--

INSERT INTO `pants` (`id`, `name`, `sizes_price_id`, `structure`, `images`, `description`) VALUES
(1, 'Синие джинсы', 1, '{ \n\"cotton\" : 95,\n \"spandex\": 5\n}', '[\"api/img/pants/1.jpg\" ]', 'Очень стильные синие джинсы'),
(2, 'Штаны в клетку', 1, '{ \n\"cotton\" : 95,\n \"spandex\": 5\n}', '[\"api/img/pants/2.jpg\"]', 'Скромное, но при этом изящное серое худи'),
(3, 'Бежевые штаны', 1, '{\r\n \"cotton\": 95,\r\n \"spandex\": 5\r\n}', '[\"api/img/pants/3.jpg\"]', 'Очень красивое бирюзовое худи');

-- --------------------------------------------------------

--
-- Структура таблицы `polo`
--

CREATE TABLE `polo` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `sizes_price_id` int(11) NOT NULL,
  `structure` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`structure`)),
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `polo`
--

INSERT INTO `polo` (`id`, `name`, `sizes_price_id`, `structure`, `images`, `description`) VALUES
(1, 'Черное поло', 1, '{ \n\"cotton\" : 95,\n \"spandex\": 5\n}', '[ \"api/img/polo/1.jpg\" ]', 'Очень стильное черное поло'),
(2, 'Голубое поло', 1, '{ \n\"cotton\" : 95,\n \"spandex\": 5\n}', '[\"api/img/polo/2.jpg\"]', 'Скромное, но при этом изящное серое худи'),
(3, 'Белое поло', 1, '{\r\n \"cotton\": 95,\r\n \"spandex\": 5\r\n}', '[\"api/img/polo/3.jpg\"]', 'Очень красивое бирюзовое худи');

-- --------------------------------------------------------

--
-- Структура таблицы `product_types`
--

CREATE TABLE `product_types` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `product_types`
--

INSERT INTO `product_types` (`id`, `name`) VALUES
(1, 't-shirts'),
(2, 'hoodies'),
(3, 'pants'),
(4, 'polo');

-- --------------------------------------------------------

--
-- Структура таблицы `sizes`
--

CREATE TABLE `sizes` (
  `id` int(11) NOT NULL,
  `name` varchar(12) NOT NULL,
  `ru_size` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `sizes`
--

INSERT INTO `sizes` (`id`, `name`, `ru_size`) VALUES
(1, 'XS', 40),
(2, 'S', 42),
(3, 'M', 44),
(4, 'L', 46),
(5, 'XL', 48),
(6, 'XXL', 50);

-- --------------------------------------------------------

--
-- Структура таблицы `sizes_counts`
--

CREATE TABLE `sizes_counts` (
  `id` int(11) NOT NULL,
  `size_id` int(11) NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `sizes_counts`
--

INSERT INTO `sizes_counts` (`id`, `size_id`, `count`) VALUES
(1, 1, 33),
(2, 2, 41),
(3, 3, 59),
(4, 4, 87),
(5, 3, 4),
(6, 4, 13),
(7, 5, 23),
(8, 6, 31);

-- --------------------------------------------------------

--
-- Структура таблицы `sizes_price`
--

CREATE TABLE `sizes_price` (
  `id` int(11) NOT NULL,
  `sizes_counts_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`sizes_counts_id`)),
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `sizes_price`
--

INSERT INTO `sizes_price` (`id`, `sizes_counts_id`, `price`) VALUES
(1, '[1, 2, 3, 4]', 799),
(2, '[5, 6]', 1299);

-- --------------------------------------------------------

--
-- Структура таблицы `statuses`
--

CREATE TABLE `statuses` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `statuses`
--

INSERT INTO `statuses` (`id`, `name`) VALUES
(1, 'Доставлено'),
(2, 'Доставляется'),
(3, 'Отменен'),
(4, 'Ошибка'),
(5, 'Ожидает получения');

-- --------------------------------------------------------

--
-- Структура таблицы `t-shirts`
--

CREATE TABLE `t-shirts` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `sizes_price_id` int(11) NOT NULL,
  `structure` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`structure`)),
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `t-shirts`
--

INSERT INTO `t-shirts` (`id`, `name`, `sizes_price_id`, `structure`, `images`, `description`) VALUES
(1, 'Черная футболка', 1, '{ \n\"cotton\" : 95,\n \"spandex\": 5\n}', '[\"api/img/tshirts/1.jpg\",\n\"api/img/tshirts/1.2.jpeg\",\n\"api/img/tshirts/1.3.jpeg\"\n]', 'Очень стильная футболка'),
(2, 'Розовая футболка', 1, '{ \n\"cotton\" : 95,\n \"spandex\": 5\n}', '[ \"api/img/tshirts/2.jpg\"]', 'Розовый очень красивый цвет'),
(3, 'Розовая футболка с треугольником', 1, '{\r\n \"cotton\": 95,\r\n \"spandex\": 5\r\n}', '[ \"api/img/tshirts/3.jpg\"]', 'Эргономичный треугольник сделает из вас красавца');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(32) DEFAULT NULL,
  `phone_number` varchar(32) DEFAULT NULL,
  `email` varchar(32) NOT NULL,
  `hash` varchar(64) NOT NULL,
  `address` text DEFAULT NULL,
  `token` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `phone_number`, `email`, `hash`, `address`, `token`) VALUES
(1, NULL, NULL, 'd@mail.ru', 'a7e1fead656cda573e6fcd3ba0fbf0e5', NULL, '744d52ac57377a971dfaa9ca71b486f9'),
(2, 'Администратор', '32133452', 'admin@mail.ru', '1a78daed80eeba1cade7c75d0f5c1cda', 'Ижевск, Кунгурцева, 123', '25849bc0fd0f4e18e4ff7ff47b446e0b'),
(3, NULL, NULL, 'admin2@mail.ru', '6b3104f4de0226f35cf82fafb15bc276', NULL, '9e7db6179b644f5a42e950530b36f1bd'),
(4, NULL, NULL, 'a@mail.ru', '82578926f8cf432ea9f72974084f0ac4', NULL, 'a17efbddc5330bf988aea38d668cd84c'),
(5, NULL, NULL, 'b@mail.ru', '9757f2f43174d3ab1d80bfb3a07dc32a', NULL, '2bf7d3d396b782d14146bd10fb8d45bd'),
(6, NULL, NULL, 'c@mail.ru', 'd18a531717f59909c25895f75956acae', NULL, '3d507b8c2852c1ddbd0735d25f0a8f2c'),
(7, NULL, NULL, 'e@mail.ru', 'ecdf18287563549636ed71cebf534ef9', NULL, '49f1e9f8a7e5c7d0a218fad917e80b3b'),
(8, NULL, NULL, 'g@mail.ru', '40a8f08942944626366bb40b6ba8f2cb', NULL, 'e5bfcf85b45c49183eaaa9cee5165337'),
(9, NULL, NULL, 'f@mail.ru', '5957f9d673c99ee82dcc8dcb76dab8d0', NULL, 'ced539ba2974304d731aae843023fcce'),
(10, NULL, NULL, 'h@mail.ru', 'cacff5f444e4e23af37e5bc738ba893b', NULL, 'd69a30ea275ec34ad0f7df41085e7008');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `deliveries`
--
ALTER TABLE `deliveries`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `delivery_items`
--
ALTER TABLE `delivery_items`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `hoodies`
--
ALTER TABLE `hoodies`
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `pants`
--
ALTER TABLE `pants`
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `polo`
--
ALTER TABLE `polo`
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `product_types`
--
ALTER TABLE `product_types`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `sizes_counts`
--
ALTER TABLE `sizes_counts`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `sizes_price`
--
ALTER TABLE `sizes_price`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `t-shirts`
--
ALTER TABLE `t-shirts`
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `number` (`phone_number`),
  ADD UNIQUE KEY `token` (`token`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT для таблицы `deliveries`
--
ALTER TABLE `deliveries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `delivery_items`
--
ALTER TABLE `delivery_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT для таблицы `hoodies`
--
ALTER TABLE `hoodies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `pants`
--
ALTER TABLE `pants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `polo`
--
ALTER TABLE `polo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `product_types`
--
ALTER TABLE `product_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `sizes_counts`
--
ALTER TABLE `sizes_counts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `sizes_price`
--
ALTER TABLE `sizes_price`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `statuses`
--
ALTER TABLE `statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `t-shirts`
--
ALTER TABLE `t-shirts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
