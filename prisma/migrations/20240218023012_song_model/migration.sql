/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropTable
DROP TABLE [dbo].[Test];

-- CreateTable
CREATE TABLE [dbo].[Song] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [artist] NVARCHAR(1000) NOT NULL,
    [year] INT NOT NULL,
    [album] NVARCHAR(1000) NOT NULL,
    [genre] NVARCHAR(1000) NOT NULL,
    [track] INT NOT NULL,
    CONSTRAINT [Song_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
