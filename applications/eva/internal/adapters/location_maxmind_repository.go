package adapters

import (
	"context"
	"github.com/oschwald/geoip2-golang"
	"net"
	"overdoll/applications/eva/internal/domain/location"
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
		return nil, err
	}

	subdivision := ""

	if len(record.Subdivisions) > 0 {
		subdivision = record.Subdivisions[0].Names["en"]
	}

	return location.UnmarshalLocationFromDatabase(ip,
		record.City.Names["en"],
		record.Country.Names["en"],
		record.Postal.Code,
		subdivision,
		record.Location.Latitude,
		record.Location.Longitude,
	), nil
}
