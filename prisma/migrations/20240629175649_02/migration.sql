/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropTable
DROP TABLE [dbo].[Event];

-- CreateTable
CREATE TABLE [dbo].[Miqaat] (
    [sysid] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [url] NVARCHAR(1000) NOT NULL,
    [createdDate] DATETIME2 NOT NULL CONSTRAINT [Miqaat_createdDate_df] DEFAULT CURRENT_TIMESTAMP,
    [closed] BIT NOT NULL CONSTRAINT [Miqaat_closed_df] DEFAULT 0,
    CONSTRAINT [Miqaat_pkey] PRIMARY KEY CLUSTERED ([sysid])
);

-- CreateTable
CREATE TABLE [dbo].[ActiveMiqaatUsers] (
    [sysid] NVARCHAR(1000) NOT NULL,
    [miqaatId] NVARCHAR(1000) NOT NULL,
    [itsId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [loggedInAt] DATETIME2 NOT NULL,
    [active] BIT NOT NULL CONSTRAINT [ActiveMiqaatUsers_active_df] DEFAULT 0,
    CONSTRAINT [ActiveMiqaatUsers_pkey] PRIMARY KEY CLUSTERED ([sysid])
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
