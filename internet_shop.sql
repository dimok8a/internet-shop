-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Июл 30 2022 г., 12:32
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
-- База данных: `internet_shop`
--

-- --------------------------------------------------------

--
-- Структура таблицы `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `clothe_id` int(11) DEFAULT NULL,
  `size_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `clothes`
--

CREATE TABLE `clothes` (
  `id` int(11) NOT NULL,
  `clothe_type_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `description` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `clothes`
--

INSERT INTO `clothes` (`id`, `clothe_type_id`, `price`, `name`, `description`) VALUES
(1, 1, 799, 'Черная футболка', 'Очень стильная футболка'),
(2, 1, 990, 'Розовая футболка', 'Розовый очень красивый цвет'),
(3, 1, 850, 'Розовая футболка с треугольником', 'Эргономичный треугольник сделает из вас красавца'),
(4, 2, 1290, 'Желтое худи', 'Очень красивое желтое худи'),
(5, 2, 1500, 'Серое худи', 'Скромное, но при этом изящное серое худи'),
(6, 2, 1400, 'Бирюзовое худи', 'Очень красивое бирюзовое худи'),
(7, 3, 1990, 'Синие джинсы', 'Очень стильные синие джинсы'),
(8, 3, 1390, 'Штаны в клетку', 'Скромные, но при этом изящные штаны в клетку'),
(9, 3, 1790, 'Бежевые штаны', 'Очень красивые бежевые штаны'),
(10, 4, 1460, 'Черное поло', 'Очень стильное черное поло'),
(11, 4, 1300, 'Голубое поло', 'Скромное, но при этом изящное голубое поло'),
(12, 4, 1700, 'Белое поло', 'Очень красивое белое поло');

-- --------------------------------------------------------

--
-- Структура таблицы `clothe_types`
--

CREATE TABLE `clothe_types` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `link` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `clothe_types`
--

INSERT INTO `clothe_types` (`id`, `name`, `link`) VALUES
(1, 'Футболки', 't-shirts'),
(2, 'Худи', 'hoodies'),
(3, 'Штаны', 'pants'),
(4, 'Поло', 'polo');

-- --------------------------------------------------------

--
-- Структура таблицы `delivery_items`
--

CREATE TABLE `delivery_items` (
  `id` int(11) NOT NULL,
  `clothe_id` int(11) DEFAULT NULL,
  `size_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `clothe_id` int(11) DEFAULT NULL,
  `link` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `images`
--

INSERT INTO `images` (`id`, `clothe_id`, `link`) VALUES
(1, 1, 'api/img/tshirts/1.jpg'),
(2, 1, 'api/img/tshirts/1.2.jpeg'),
(3, 1, 'api/img/tshirts/1.3.jpeg'),
(4, 2, 'api/img/tshirts/2.jpg'),
(5, 3, 'api/img/tshirts/3.jpg'),
(6, 4, 'api/img/hoodies/1.jpg'),
(7, 5, 'api/img/hoodies/2.jpg'),
(8, 5, 'api/img/hoodies/2.jpg'),
(9, 6, 'api/img/hoodies/4.jpg'),
(10, 7, 'api/img/pants/1.jpg'),
(11, 8, 'api/img/pants/2.jpg'),
(12, 9, 'api/img/pants/3.jpg'),
(13, 10, 'api/img/polo/1.jpg'),
(14, 11, 'api/img/polo/2.jpg'),
(15, 12, 'api/img/polo/3.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `sizes`
--

CREATE TABLE `sizes` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `ru_size` int(11) NOT NULL,
  `china_size` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `sizes`
--

INSERT INTO `sizes` (`id`, `name`, `ru_size`, `china_size`) VALUES
(1, 'XS', 40, 'XXL'),
(2, 'S', 42, 'XXL'),
(3, 'M', 44, 'XXL'),
(4, 'L', 46, 'XXXL'),
(5, 'XL', 48, 'XXXL'),
(6, 'XXL', 50, 'XXXL');

-- --------------------------------------------------------

--
-- Структура таблицы `sizes_counts`
--

CREATE TABLE `sizes_counts` (
  `id` int(11) NOT NULL,
  `size_id` int(11) DEFAULT NULL,
  `clothe_id` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `sizes_counts`
--

INSERT INTO `sizes_counts` (`id`, `size_id`, `clothe_id`, `count`) VALUES
(1, 4, 1, 10),
(2, 3, 1, 15),
(3, 5, 1, 31),
(4, 3, 2, 14),
(5, 1, 3, 54),
(6, 6, 4, 66),
(7, 5, 5, 61),
(8, 4, 6, 13),
(9, 4, 7, 33),
(10, 3, 8, 43),
(11, 3, 9, 11),
(12, 1, 10, 12),
(13, 4, 11, 32),
(14, 3, 12, 21);

-- --------------------------------------------------------

--
-- Структура таблицы `statuses`
--

CREATE TABLE `statuses` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `e-mail` varchar(50) NOT NULL,
  `hash` varchar(32) NOT NULL,
  `address` varchar(100) NOT NULL,
  `token` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `phone_number`, `e-mail`, `hash`, `address`, `token`) VALUES
(8, 'Админ', '89635466743', 'admin@mail.ru', '1a78daed80eeba1cade7c75d0f5c1cda', 'Ижевск, Кунгурцева, 123', 'f837b134b5c10df390ca5cb6cd3b0858');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clothe_id` (`clothe_id`),
  ADD KEY `size_id` (`size_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `clothes`
--
ALTER TABLE `clothes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clothe_type_id` (`clothe_type_id`);

--
-- Индексы таблицы `clothe_types`
--
ALTER TABLE `clothe_types`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `delivery_items`
--
ALTER TABLE `delivery_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clothe_id` (`clothe_id`),
  ADD KEY `size_id` (`size_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `status_id` (`status_id`);

--
-- Индексы таблицы `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clothe_id` (`clothe_id`);

--
-- Индексы таблицы `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `sizes_counts`
--
ALTER TABLE `sizes_counts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clothe_id` (`clothe_id`),
  ADD KEY `size_id` (`size_id`);

--
-- Индексы таблицы `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `clothes`
--
ALTER TABLE `clothes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `clothe_types`
--
ALTER TABLE `clothe_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `delivery_items`
--
ALTER TABLE `delivery_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `sizes_counts`
--
ALTER TABLE `sizes_counts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT для таблицы `statuses`
--
ALTER TABLE `statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`clothe_id`) REFERENCES `clothes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`),
  ADD CONSTRAINT `cart_items_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `clothes`
--
ALTER TABLE `clothes`
  ADD CONSTRAINT `clothes_ibfk_1` FOREIGN KEY (`clothe_type_id`) REFERENCES `clothe_types` (`id`);

--
-- Ограничения внешнего ключа таблицы `delivery_items`
--
ALTER TABLE `delivery_items`
  ADD CONSTRAINT `delivery_items_ibfk_1` FOREIGN KEY (`clothe_id`) REFERENCES `clothes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `delivery_items_ibfk_2` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`),
  ADD CONSTRAINT `delivery_items_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `delivery_items_ibfk_4` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`);

--
-- Ограничения внешнего ключа таблицы `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`clothe_id`) REFERENCES `clothes` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `sizes_counts`
--
ALTER TABLE `sizes_counts`
  ADD CONSTRAINT `sizes_counts_ibfk_1` FOREIGN KEY (`clothe_id`) REFERENCES `clothes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sizes_counts_ibfk_2` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
