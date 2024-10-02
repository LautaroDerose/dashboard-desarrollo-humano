-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('user', 'user_dh', 'admin', 'subsecretaria', 'contaduria', 'tesoreria', 'caja', 'trabajador_social', 'secretaria_dh', 'provedor') NOT NULL DEFAULT 'user';
