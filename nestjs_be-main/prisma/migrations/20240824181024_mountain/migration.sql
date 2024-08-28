-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mountain` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `imageLink` VARCHAR(191) NULL,
    `level` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conquerInfo` (
    `imageLink` VARCHAR(191) NOT NULL,
    `conquerDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `mountainId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    INDEX `conquerInfo_mountainId_fkey`(`mountainId`),
    PRIMARY KEY (`userId`, `mountainId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `conquerInfo` ADD CONSTRAINT `conquerInfo_mountainId_fkey` FOREIGN KEY (`mountainId`) REFERENCES `mountain`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conquerInfo` ADD CONSTRAINT `conquerInfo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
