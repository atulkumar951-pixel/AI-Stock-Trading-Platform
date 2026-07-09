COMPANIES = {

    "INFY": {
        "name": "Infosys Ltd",
        "sector": "Information Technology",
        "exchange": "NSE"
    },

    "RELIANCE": {
        "name": "Reliance Industries Ltd",
        "sector": "Oil & Gas",
        "exchange": "NSE"
    },

    "TCS": {
        "name": "Tata Consultancy Services",
        "sector": "Information Technology",
        "exchange": "NSE"
    },

    "SBIN": {
        "name": "State Bank of India",
        "sector": "Banking",
        "exchange": "NSE"
    },

    "ICICIBANK": {
        "name": "ICICI Bank Ltd",
        "sector": "Banking",
        "exchange": "NSE"
    },

    "HDFCBANK": {
        "name": "HDFC Bank Ltd",
        "sector": "Banking",
        "exchange": "NSE"
    }

}


class CompanyService:

    @staticmethod
    def get(symbol: str):

        return COMPANIES.get(
            symbol,
            {
                "name": symbol,
                "sector": "Unknown",
                "exchange": "NSE"
            }
        )


company_service = CompanyService()