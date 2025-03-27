CREATE DATABASE InvestTrack;
USE InvestTrack;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Accounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    account_type ENUM('Savings', 'Investment', 'Expense') NOT NULL,
    balance DECIMAL(15,2) DEFAULT 0.00,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE Transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    account_id INT,
    transaction_type ENUM('Income', 'Expense', 'Investment') NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    category VARCHAR(50),
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (account_id) REFERENCES Accounts(account_id) ON DELETE CASCADE
);

CREATE TABLE Investments (
    investment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    investment_type ENUM('Stocks', 'Mutual Funds', 'Crypto', 'Real Estate') NOT NULL,
    amount_invested DECIMAL(15,2) NOT NULL,
    returns DECIMAL(15,2) DEFAULT 0.00,
    investment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Insert sample users
INSERT INTO Users (name, email, password_hash) 
VALUES 
('John Doe', 'john@example.com', 'hashed_password_123'),
('Jane Smith', 'jane@example.com', 'hashed_password_456');

-- Insert sample accounts
INSERT INTO Accounts (user_id, account_type, balance) 
VALUES 
(1, 'Savings', 5000.00),
(1, 'Investment', 2000.00),
(2, 'Expense', 1500.00);

-- Insert sample transactions
INSERT INTO Transactions (user_id, account_id, transaction_type, amount, category) 
VALUES 
(1, 1, 'Income', 1000.00, 'Salary'),
(1, 3, 'Expense', 200.00, 'Groceries'),
(2, 2, 'Investment', 500.00, 'Stocks');

-- Insert sample investments
INSERT INTO Investments (user_id, investment_type, amount_invested, returns) 
VALUES 
(1, 'Stocks', 1000.00, 150.00),
(2, 'Crypto', 500.00, 20.00);

SELECT * FROM Users;

SELECT * FROM Accounts;

SELECT * FROM Transactions;

SELECT * FROM Investments;

-- Viewing Expenses By Category
SELECT * FROM Transactions 
WHERE transaction_type = 'Expense' 
AND category = 'Groceries' 
ORDER BY transaction_date DESC;

-- Total money saved in all accounts
SELECT SUM(balance) AS total_savings 
FROM Accounts 
WHERE account_type = 'Savings';

-- Average Investment Amoun For User
SELECT user_id, AVG(amount_invested) AS avg_investment 
FROM Investments 
GROUP BY user_id;

-- To see all Transactions with usernames
SELECT Users.name, Transactions.transaction_type, Transactions.amount, Transactions.category, Transactions.transaction_date 
FROM Users 
INNER JOIN Transactions ON Users.user_id = Transactions.user_id;

-- Users who Invested more than 1000 
SELECT name FROM Users 
WHERE user_id IN (
    SELECT user_id FROM Investments 
    WHERE amount_invested > 1000
);


