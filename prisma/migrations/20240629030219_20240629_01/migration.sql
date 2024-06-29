BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Event] (
    [sysid] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [url] NVARCHAR(1000) NOT NULL,
    [createdDate] DATETIME2 NOT NULL CONSTRAINT [Event_createdDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Event_pkey] PRIMARY KEY CLUSTERED ([sysid])
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
