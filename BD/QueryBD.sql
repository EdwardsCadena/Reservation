create database reservation
use reservation

CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY IDENTITY(1,1),
    FirstName VARCHAR(100),
    LastName VARCHAR(100),
    Email VARCHAR(100),
    Phone VARCHAR(20),
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Services (
    ServiceID INT PRIMARY KEY IDENTITY(1,1),
    ServiceName VARCHAR(100),
    Description TEXT,
    Price DECIMAL(10,2),
    AvailableSlots INT,
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Reservations (
    ReservationID INT PRIMARY KEY IDENTITY(1,1),
    CustomerID INT FOREIGN KEY REFERENCES Customers(CustomerID),
    ServiceID INT FOREIGN KEY REFERENCES Services(ServiceID),
    ReservationDate DATETIME,
    Status VARCHAR(20) CHECK (Status IN ('Pending', 'Confirmed', 'Cancelled')),
    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE AvailableSlots (
    SlotID INT PRIMARY KEY IDENTITY(1,1),
    ServiceID INT FOREIGN KEY REFERENCES Services(ServiceID),
    SlotTime DATETIME,
    IsAvailable BIT DEFAULT 1
);

INSERT INTO Customers (FirstName, LastName, Email, Phone) 
VALUES ('Juan', 'Pérez', 'juan.perez@email.com', '555-1234');

INSERT INTO Services (ServiceName, Description, Price, AvailableSlots) 
VALUES ('Cena Romántica', 'Cena de lujo para dos personas.', 150.00, 10);

INSERT INTO Reservations (CustomerID, ServiceID, ReservationDate, Status) 
VALUES (1, 1, '2024-09-15 19:00', 'Pending');

