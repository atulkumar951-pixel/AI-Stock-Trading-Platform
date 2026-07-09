# ==========================================================
# CELL 58 : CREATE LIVE FEATURES (FINAL)
# ==========================================================

import numpy as np
import pandas as pd

from ta.trend import MACD
from ta.momentum import (
    RSIIndicator,
    ROCIndicator,
    StochasticOscillator,
    WilliamsRIndicator
)
from ta.volatility import (
    AverageTrueRange,
    BollingerBands
)

def create_live_features(df):

    df = df.copy()

    close = df["Close"]
    high = df["High"]
    low = df["Low"]
    volume = df["Volume"]

    is_index = (volume == 0).all()

    # =====================================================
    # EMA
    # =====================================================

    for p in [5, 8, 13, 21, 34, 50, 100, 200]:
        df[f"EMA_{p}"] = close.ewm(span=p, adjust=False).mean()

    # =====================================================
    # SMA
    # =====================================================

    for p in [5, 10, 20, 50, 100, 200]:
        df[f"SMA_{p}"] = close.rolling(p).mean()

    # =====================================================
    # RSI
    # =====================================================

    df["RSI"] = RSIIndicator(close).rsi()

    # =====================================================
    # MACD
    # =====================================================

    macd = MACD(close)

    df["MACD"] = macd.macd()
    df["MACD_Signal"] = macd.macd_signal()
    df["MACD_Hist"] = macd.macd_diff()

    # =====================================================
    # ATR
    # =====================================================

    atr = AverageTrueRange(high, low, close)

    df["ATR"] = atr.average_true_range()

    # =====================================================
    # Bollinger Bands
    # =====================================================

    bb = BollingerBands(close)

    df["BB_High"] = bb.bollinger_hband()
    df["BB_Low"] = bb.bollinger_lband()
    df["BB_Mid"] = bb.bollinger_mavg()
    df["BB_Width"] = bb.bollinger_wband()

    # =====================================================
    # STOCHASTIC
    # =====================================================

    stoch = StochasticOscillator(high, low, close)

    df["Stoch_K"] = stoch.stoch()
    df["Stoch_D"] = stoch.stoch_signal()

    # =====================================================
    # Williams %R
    # =====================================================

    df["WilliamsR"] = WilliamsRIndicator(
        high,
        low,
        close
    ).williams_r()

    # =====================================================
    # ROC
    # =====================================================

    df["ROC"] = ROCIndicator(close).roc()

    # =====================================================
    # MFI
    # =====================================================

    from ta.volume import MFIIndicator

    if is_index:

        # Neutral value for indices
        df["MFI"] = 50

    else:

        df["MFI"] = MFIIndicator(
            high=high,
            low=low,
            close=close,
            volume=volume
        ).money_flow_index()

    # =====================================================
    # MOMENTUM
    # =====================================================

    df["Momentum"] = close.diff(10)

    # =====================================================
    # RETURNS
    # =====================================================

    df["Return_1"] = close.pct_change(1)
    df["Return_3"] = close.pct_change(3)
    df["Return_5"] = close.pct_change(5)
    df["Return_10"] = close.pct_change(10)

    # =====================================================
    # VOLUME FEATURES
    # =====================================================

    if is_index:

        # Indices don't provide usable volume
        df["Volume_Change"] = 0
        df["Volume_MA5"] = 0
        df["Volume_MA20"] = 0

    else:

        df["Volume_Change"] = volume.pct_change()
        df["Volume_MA5"] = volume.rolling(5).mean()
        df["Volume_MA20"] = volume.rolling(20).mean()

    # =====================================================
    # BODY / RANGE
    # =====================================================

    df["Body"] = abs(df["Close"] - df["Open"])

    df["Range"] = df["High"] - df["Low"]

    df["Body_Pct"] = df["Body"] / df["Range"]

    df["Upper_Wick"] = df["High"] - df[["Open", "Close"]].max(axis=1)

    df["Lower_Wick"] = df[["Open", "Close"]].min(axis=1) - df["Low"]

    df["Gap"] = (
        df["Open"] - df["Close"].shift()
    ) / df["Close"].shift()

    # =====================================================
    # DATE FEATURES
    # =====================================================

    df["Month"] = df["Date"].dt.month

    df["Year"] = df["Date"].dt.year

    df["Quarter"] = df["Date"].dt.quarter

    df["Week_Day"] = df["Date"].dt.weekday

    df["Week"] = df["Date"].dt.isocalendar().week.astype(int)

    df["Day"] = df["Date"].dt.day

    df["DayOfWeek"] = df["Date"].dt.dayofweek

    # =====================================================
    # PRICE VS EMA
    # =====================================================

    for ema in [5, 8, 13, 21, 34, 50, 100, 200]:

        df[f"Price_EMA_{ema}"] = (
            df["Close"] - df[f"EMA_{ema}"]
        ) / df[f"EMA_{ema}"]

    # =====================================================
    # PRICE VS SMA
    # =====================================================

    for sma in [5, 10, 20, 50, 100, 200]:

        df[f"Price_SMA_{sma}"] = (
            df["Close"] - df[f"SMA_{sma}"]
        ) / df[f"SMA_{sma}"]

    # =====================================================
    # EMA DIFFERENCE
    # =====================================================

    df["EMA_Diff_5_21"] = (
        df["EMA_5"] - df["EMA_21"]
    ) / df["EMA_21"]

    df["EMA_Diff_21_50"] = (
        df["EMA_21"] - df["EMA_50"]
    ) / df["EMA_50"]

    df["EMA_Diff_50_200"] = (
        df["EMA_50"] - df["EMA_200"]
    ) / df["EMA_200"]

    # =====================================================
    # SMA DIFFERENCE
    # =====================================================

    df["SMA_Diff_10_20"] = (
        df["SMA_10"] - df["SMA_20"]
    ) / df["SMA_20"]

    df["SMA_Diff_20_50"] = (
        df["SMA_20"] - df["SMA_50"]
    ) / df["SMA_50"]

    # =====================================================
    # ATR %
    # =====================================================

    df["ATR_PCT"] = df["ATR"] / df["Close"]

    # =====================================================
    # BB POSITION
    # =====================================================

    df["BB_Position"] = (
        (df["Close"] - df["BB_Low"]) /
        (df["BB_High"] - df["BB_Low"])
    )

    # =====================================================
    # RSI SLOPE
    # =====================================================

    df["RSI_Slope"] = df["RSI"].diff()

    # =====================================================
    # MACD STRENGTH
    # =====================================================

    df["MACD_Strength"] = (
        df["MACD"] - df["MACD_Signal"]
    )

    # =====================================================
    # VOLATILITY
    # =====================================================

    df["Volatility_5"] = df["Return_1"].rolling(5).std()

    df["Volatility_10"] = df["Return_1"].rolling(10).std()

    df["Volatility_20"] = df["Return_1"].rolling(20).std()

    # =====================================================
    # TREND
    # =====================================================

    df["Trend_5"] = (
        df["EMA_5"] > df["EMA_21"]
    ).astype(int)

    df["Trend_21"] = (
        df["EMA_21"] > df["EMA_50"]
    ).astype(int)

    df["Trend_50"] = (
        df["EMA_50"] > df["EMA_200"]
    ).astype(int)

    # =====================================================
    # ROLLING FEATURES
    # =====================================================

    for w in [5, 10, 20]:

        df[f"RollingMean_{w}"] = df["Close"].rolling(w).mean()

        df[f"RollingStd_{w}"] = df["Close"].rolling(w).std()

        df[f"RollingMax_{w}"] = df["High"].rolling(w).max()

        df[f"RollingMin_{w}"] = df["Low"].rolling(w).min()

    # =====================================================
    # CLEAN
    # =====================================================

    df.replace([np.inf, -np.inf], np.nan, inplace=True)

    # Only remove rows that are incomplete because of indicator lookback periods
    df = df.iloc[220:].copy()

    df.fillna(0, inplace=True)

    df.reset_index(drop=True, inplace=True)

    return df