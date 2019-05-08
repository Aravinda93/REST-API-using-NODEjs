This is an Simple application which makes connection to the local SQL Server db and does CRUD operation.
For the operation of this just change the DB credentials in the settings.js
Also make sure you have created the db with following table structure:

CREATE DATABASE SampleDb;

CREATE TABLE [dbo].[Dept](
	[Deptno] [int] NOT NULL,
	[Deptname] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Deptno] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

CREATE TABLE [dbo].[Emp](
	[Empno] [int] NOT NULL,
	[Ename] [varchar](50) NULL,
	[Sal] [bigint] NULL,
	[Deptno] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Empno] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

INSERT some values into both of these tables and you are good to go.
This is very simple app, Happy coding :)
