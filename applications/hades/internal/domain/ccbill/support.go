package ccbill

import "time"

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
