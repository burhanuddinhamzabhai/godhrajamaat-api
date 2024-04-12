BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Users] (
    [sysid] NVARCHAR(1000) NOT NULL,
    [sortSequenceNumber] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [itsId] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [passwordSalt] NVARCHAR(1000) NOT NULL CONSTRAINT [Users_passwordSalt_df] DEFAULT '',
    [createdDate] DATETIME2 NOT NULL CONSTRAINT [Users_createdDate_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedDate] DATETIME2 NOT NULL,
    [freezed] BIT NOT NULL CONSTRAINT [Users_freezed_df] DEFAULT 0,
    [isAdmin] BIT NOT NULL CONSTRAINT [Users_isAdmin_df] DEFAULT 0,
    CONSTRAINT [Users_pkey] PRIMARY KEY CLUSTERED ([sysid]),
    CONSTRAINT [Users_itsId_key] UNIQUE NONCLUSTERED ([itsId])
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
