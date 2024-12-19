import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Set Seaborn style for cleaner plots
sns.set(style="whitegrid")

# Load data from CSV file
file_path = "transactions.csv"  # Update the file path accordingly
df = pd.read_csv(file_path)

# Inspect the first few rows to check structure
print("Data Preview:")
print(df.head())

# Ensure necessary columns exist
required_columns = ["timestamp", "gas_used", "gas_limit", "cost", "latency", "transaction_id"]
for col in required_columns:
    if col not in df.columns:
        raise ValueError(f"Missing required column: {col}")

# Convert 'timestamp' to datetime for time-based analysis
df["timestamp"] = pd.to_datetime(df["timestamp"])

# 1. TRANSACTION SUMMARY: Number of Transactions Over Time
def plot_transaction_summary(data):
    data["date"] = data["timestamp"].dt.date
    transactions_per_day = data.groupby("date")["transaction_id"].count().reset_index()
    transactions_per_day.rename(columns={"transaction_id": "transaction_count"}, inplace=True)

    plt.figure(figsize=(10, 6))
    sns.lineplot(x="date", y="transaction_count", data=transactions_per_day, marker="o", color="blue")
    plt.title("Transaction Summary: Transactions Over Time")
    plt.xlabel("Date")
    plt.ylabel("Number of Transactions")
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()

# 2. GAS UTILIZATION: Gas Used vs Gas Limit
def plot_gas_utilization(data):
    plt.figure(figsize=(10, 6))
    plt.plot(data["timestamp"], data["gas_used"], label="Gas Used", color="green")
    plt.plot(data["timestamp"], data["gas_limit"], label="Gas Limit", color="red", linestyle="--")
    plt.title("Gas Utilization Over Time")
    plt.xlabel("Timestamp")
    plt.ylabel("Gas")
    plt.legend()
    plt.tight_layout()
    plt.show()

# 3. COST ANALYSIS: Cost Trends Over Time
def plot_cost_analysis(data):
    plt.figure(figsize=(10, 6))
    sns.lineplot(x="timestamp", y="cost", data=data, color="purple")
    plt.title("Cost Analysis: Cost of Transactions Over Time")
    plt.xlabel("Timestamp")
    plt.ylabel("Cost (in HBAR or equivalent)")
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()

# 4. THROUGHPUT AND LATENCY TRENDS
def plot_throughput_and_latency(data):
    # Throughput: Transactions per minute
    data["minute"] = data["timestamp"].dt.to_period("T")
    throughput = data.groupby("minute")["transaction_id"].count().reset_index()
    throughput["minute"] = throughput["minute"].astype(str)

    # Latency Trends
    plt.figure(figsize=(12, 6))

    # Plot Throughput
    plt.subplot(1, 2, 1)
    sns.lineplot(x="minute", y="transaction_id", data=throughput, marker="o", color="blue")
    plt.title("Throughput: Transactions Per Minute")
    plt.xlabel("Minute")
    plt.ylabel("Number of Transactions")
    plt.xticks(rotation=45)

    # Plot Latency
    plt.subplot(1, 2, 2)
    sns.lineplot(x="timestamp", y="latency", data=data, color="orange")
    plt.title("Latency Trends")
    plt.xlabel("Timestamp")
    plt.ylabel("Latency (ms)")
    plt.xticks(rotation=45)

    plt.tight_layout()
    plt.show()

# Generate the graphs
if __name__ == "__main__":
    print("Generating Transaction Summary...")
    plot_transaction_summary(df)

    print("Generating Gas Utilization Plot...")
    plot_gas_utilization(df)

    print("Generating Cost Analysis Plot...")
    plot_cost_analysis(df)

    print("Generating Throughput and Latency Trends...")
    plot_throughput_and_latency(df)
