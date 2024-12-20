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


