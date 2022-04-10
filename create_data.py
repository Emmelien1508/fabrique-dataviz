import pandas as pd

df = pd.read_csv("test_data_comma.csv")
# hourly
hourly_df = df.groupby("datetime").sum().round(0)
hourly_df = hourly_df.reset_index()
hourly_df.to_json("data/hourly_data.json", orient='records', indent=2)

# daily 
df['datetime'] = df['datetime'].str.split(' ').str[0]
daily_df = df.groupby("datetime").sum().round(0)
daily_df = daily_df.reset_index()
daily_df.to_json("data/daily_data.json", orient='records', indent=2)

# monthly
df['date'] = df['datetime'].str.split(' ').str[0]
df['datetime'] = df['date'].str.split('-').str[1]
monthly_df = df.groupby("datetime").sum().round(0)
monthly_df = monthly_df.reset_index()
monthly_df.to_json("data/monthly_data.json", orient='records', indent=2)