# Import necessary libraries
import pandas as pd

# Load and inspect the dataset
file_path = '../transactions.csv'
data = pd.read_csv(file_path)
# Load CSV data
df = pd.read_csv('hashscan.csv')


# Display the first few rows and dataset info
data.head(), data.info()

import matplotlib.pyplot as plt

# Calculate total gas used per transaction
data['TotalGasUsed'] = data['GasLimit'] * data['MaxFeePerGas']

# Aggregate data for analysis
total_gas_by_sender = data.groupby('From')['TotalGasUsed'].sum().sort_values(ascending=False)
average_gas_fee = data['MaxFeePerGas'].mean()

# Plot Total Gas Used by Sender
plt.figure(figsize=(10, 6))
total_gas_by_sender.plot(kind='bar', color='skyblue')
plt.title('Total Gas Used by Sender')
plt.xlabel('Sender Address')
plt.ylabel('Total Gas Used')
plt.xticks(rotation=45, ha='right')
plt.show()

# Plot Average Gas Fee
plt.figure(figsize=(6, 4))
plt.bar(['Average Gas Fee'], [average_gas_fee], color='orange')
plt.title('Average Gas Fee per Transaction')
plt.ylabel('Gas Fee')
plt.show()


# Transaction Value Distribution
plt.figure(figsize=(8, 6))
plt.hist(data['Value'], bins=10, color='orange', edgecolor='black')
plt.title('Transaction Value Distribution')
plt.xlabel('Transaction Value')
plt.ylabel('Frequency')
plt.show()

# Top Receivers by Gas Consumption
total_gas_by_receiver = data.groupby('To')['TotalGasUsed'].sum().sort_values(ascending=False)
plt.figure(figsize=(10, 6))
total_gas_by_receiver.plot(kind='bar', color='skyblue')
plt.title('Top Receivers by Gas Consumption')
plt.xlabel('Receiver Address')
plt.ylabel('Total Gas Used')
plt.xticks(rotation=45, ha='right')
plt.show()


# Plot histogram for transaction amounts
plt.figure(figsize=(8, 6))
plt.hist(df['amount'], bins=20, edgecolor='black', alpha=0.7)
plt.title('Transaction Amount Distribution')
plt.xlabel('Amount')
plt.ylabel('Frequency')
plt.grid(True)
plt.show()

# Convert date to datetime format
df['date'] = pd.to_datetime(df['date'], format='%m/%d/%Y')

# Count the number of transactions per day
df['date'] = df['date'].dt.date
transaction_counts = df.groupby('date').size()

# Plot transactions over time
transaction_counts.plot(kind='line', figsize=(10, 6))
plt.title('Transactions Over Time')
plt.xlabel('Date')
plt.ylabel('Number of Transactions')
plt.grid(True)
plt.show()

# Create separate columns for sent and received amounts
df['sent_amount'] = df['amount'].where(df['amount'] < 0, 0)
df['received_amount'] = df['amount'].where(df['amount'] > 0, 0)

# Sum the amounts sent and received per day
amounts_per_day = df.groupby('date')[['sent_amount', 'received_amount']].sum()

# Plot stacked bar chart
amounts_per_day.plot(kind='bar', stacked=True, figsize=(10, 6))
plt.title('Sent and Received Amounts Over Time')
plt.xlabel('Date')
plt.ylabel('Amount')
plt.grid(True)
plt.show()


# Count transactions per 'from_account_id'
account_transactions = df.groupby('from_account_id').size()

# Plot bar chart
account_transactions.plot(kind='bar', figsize=(10, 6))
plt.title('Transactions per Account')
plt.xlabel('Account ID')
plt.ylabel('Number of Transactions')
plt.grid(True)
plt.show()

