/*
  Warnings:

  - You are about to drop the `Song` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropTable
DROP TABLE [dbo].[Song];

-- CreateTable
CREATE TABLE [dbo].[Session] (
    [id] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Session_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Album] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [session_id] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Album_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[mp3File] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [artist] NVARCHAR(1000) NOT NULL,
    [year] INT NOT NULL,
    [albumTitle] NVARCHAR(1000) NOT NULL,
    [albumArtist] NVARCHAR(1000) NOT NULL,
    [trackNumber] INT NOT NULL,
    [image] NVARCHAR(1000) NOT NULL,
    [albumId] INT,
    [session_id] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [mp3File_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Album] ADD CONSTRAINT [Album_session_id_fkey] FOREIGN KEY ([session_id]) REFERENCES [dbo].[Session]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[mp3File] ADD CONSTRAINT [mp3File_albumId_fkey] FOREIGN KEY ([albumId]) REFERENCES [dbo].[Album]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[mp3File] ADD CONSTRAINT [mp3File_session_id_fkey] FOREIGN KEY ([session_id]) REFERENCES [dbo].[Session]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
