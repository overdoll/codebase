package ccbill

import "time"

func ParseCCBillDateWithTime(timestamp string) (time.Time, error) {
	return time.Parse("2006-01-02 15:04:05", timestamp)
}

func ParseCCBillDate(timestamp string) (time.Time, error) {
	tm, _ := time.Parse("2006-01-02", timestamp)
	return tm, nil
}
