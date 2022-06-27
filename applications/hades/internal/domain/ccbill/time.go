package ccbill

import (
	"overdoll/libraries/errors"
	"time"
)

func ParseDateWithTimeString(tm string) (time.Time, error) {
	loc, err := time.LoadLocation("MST")
	if err != nil {
		return time.Time{}, errors.Wrap(err, "error parsing timezone")
	}

	dateTime, err := time.ParseInLocation("20060102150405", tm, loc)

	if err != nil {
		var parseError time.ParseError
		if errors.Is(err, &parseError) {
			dateTime = time.Now()
		} else {
			return time.Time{}, errors.Wrap(err, "error parsing date")
		}
	}

	return dateTime, nil
}
