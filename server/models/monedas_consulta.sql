SELECT JSONDATA. * INTO CoinMarketCap
FROM OPENROWSET (BULK 'C:\Users\Prim\Downloads/monedas.json')
CROSS APPLY OPENJSON(Bulkcolumn)
with (id nvarchar(100), name(100), symbol nvarchar(100), [rank] float,
price_usd float, price_btc float, [24h_volume_usd] float, market_cap_usd float, available_supply float, total_supply float,
max_supply float, percent_change_1h float, percent_change_24h float, percent_change_7d float, last_updated nvarchar(100))
AS JSONDATA