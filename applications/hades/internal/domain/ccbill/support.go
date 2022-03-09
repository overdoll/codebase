package ccbill

import (
	"errors"
	"strconv"
	"time"
)

func ParseCCBillDateWithTime(timestamp string) (time.Time, error) {
	loc, err := time.LoadLocation("MST")
	if err != nil {
		return time.Time{}, err
	}
	return time.ParseInLocation("2006-01-02 15:04:05", timestamp, loc)
}

func ParseCCBillDate(timestamp string) (time.Time, error) {
	tm, _ := time.Parse("2006-01-02", timestamp)
	return tm, nil
}

func ConvertAmountToFloat(amount int64, currencyCode int) (float64, error) {
	switch currencyCode {
	case 840:
	case 978:
	case 036:
	case 826:
	case 124:
		return float64(amount) / 100, nil
	case 392:
		return float64(amount), nil
	}

	return 0, errors.New("invalid currency passed")
}

func ParseCCBillCurrencyAmount(amount string, currency string) (int64, error) {
	switch currency {
	case "EUR":
	case "AUD":
	case "CAD":
	case "GBP":
	case "USD":
		amt, err := strconv.ParseFloat(amount, 64)

		if err != nil {
			return 0, err
		}

		return int64(amt * 100), nil
	case "JPY":
		amt, err := strconv.ParseInt(amount, 10, 64)

		if err != nil {
			return 0, err
		}

		return amt, nil
	}

	return 0, errors.New("invalid currency passed")
}
