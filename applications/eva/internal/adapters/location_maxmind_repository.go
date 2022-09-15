package adapters

import (
	"context"
	"github.com/oschwald/geoip2-golang"
	"net"
	"overdoll/applications/eva/internal/domain/location"
	"overdoll/libraries/errors"
)

type LocationMaxmindRepository struct {
	reader *geoip2.Reader
}

func NewLocationMaxmindRepository(reader *geoip2.Reader) LocationMaxmindRepository {
	return LocationMaxmindRepository{reader: reader}
}

func (r LocationMaxmindRepository) GetLocationFromIp(ctx context.Context, ip string) (*location.Location, error) {
	record, err := r.reader.City(net.ParseIP(ip))

	if err != nil {
		return nil, errors.Wrap(err, "failed to get city from ip")
	}

	subdivision := ""

	if len(record.Subdivisions) > 0 {
		subdivision = record.Subdivisions[0].Names["en"]
	}

	city := record.City.Names["en"]
	country := record.Country.IsoCode

	if subdivision == "" {
		subdivision = ""
	}

	if city == "" {
		city = ""
	}

	if country == "" {
		country = ""
	}

	return location.UnmarshalLocationFromDatabase(
		city,
		country,
		record.Postal.Code,
		subdivision,
		record.Location.Latitude,
		record.Location.Longitude,
		record.Location.TimeZone,
	), nil
}
