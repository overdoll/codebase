package ccbill

import (
	"fmt"
	"overdoll/libraries/errors"
	"strconv"
	"time"
)

func ParseCCBillDateWithTime(timestamp string) (time.Time, error) {
	loc, err := time.LoadLocation("MST")
	if err != nil {
		return time.Time{}, err
	}

	tm, err := time.ParseInLocation("2006-01-02 15:04:05", timestamp, loc)
	if err != nil {
		return time.Time{}, err
	}

	utcLoc, err := time.LoadLocation("UTC")

	if err != nil {
		return time.Time{}, err
	}

	return tm.In(utcLoc), nil

}

func ParseCCBillDate(timestamp string) (time.Time, error) {
	tm, _ := time.Parse("2006-01-02", timestamp)
	return tm, nil
}

func ConvertAmountToCCBillFloat(amount uint64, currencyCode string) (float64, error) {
	switch currencyCode {
	case "840":
		fallthrough
	case "978":
		fallthrough
	case "036":
		fallthrough
	case "826":
		fallthrough
	case "124":
		return float64(amount) / 100, nil
	case "392":
		return float64(amount), nil
	}

	return 0, fmt.Errorf("invalid currency code passed: %s", currencyCode)
}

func ParseCCBillCurrencyAmount(amount string, currency string) (uint64, error) {
	switch currency {
	case "USD":
		fallthrough
	case "AUD":
		fallthrough
	case "CAD":
		fallthrough
	case "GBP":
		fallthrough
	case "EUR":
		amt, err := strconv.ParseFloat(amount, 64)

		if err != nil {
			return 0, errors.Wrap(err, fmt.Sprintf("error parsing float %s", amount))
		}

		return uint64(amt * 100), nil
	case "JPY":
		amt, err := strconv.ParseInt(amount, 10, 64)

		if err != nil {
			return 0, errors.Wrap(err, fmt.Sprintf("error parsing int %s", amount))
		}

		return uint64(amt), nil
	}

	return 0, fmt.Errorf("invalid currency passed: %s", currency)
}
