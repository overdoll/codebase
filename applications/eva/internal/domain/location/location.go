package location

import (
	"context"
	"fmt"
	"overdoll/libraries/helpers"
	"strconv"
)

type Serializable struct {
	Ip          string `json:"ip"`
	City        string `json:"city"`
	Country     string `json:"country"`
	PostalCode  string `json:"postalCode"`
	Subdivision string `json:"subdivision"`
	Latitude    string `json:"latitude"`
	Longitude   string `json:"longitude"`
}

type Location struct {
	ip          string
	city        string
	country     string
	postalCode  string
	subdivision string
	latitude    float64
	longitude   float64
}

func UnmarshalLocationFromDatabase(ip, city, country, postalCode, subdivision string, latitude, longitude float64) *Location {
	return &Location{
		ip:          ip,
		city:        city,
		country:     country,
		postalCode:  postalCode,
		subdivision: subdivision,
		latitude:    latitude,
		longitude:   longitude,
	}
}

func UnmarshalLocationFromSerialized(serialized Serializable) *Location {

	lat, _ := strconv.ParseFloat(serialized.Latitude, 64)
	lng, _ := strconv.ParseFloat(serialized.Longitude, 64)

	return &Location{
		ip:          serialized.Ip,
		city:        serialized.City,
		country:     serialized.Country,
		postalCode:  serialized.PostalCode,
		subdivision: serialized.Subdivision,
		latitude:    lat,
		longitude:   lng,
	}
}

func Serialize(loc *Location) Serializable {
	return Serializable{
		Ip:          loc.ip,
		City:        loc.city,
		Country:     loc.country,
		PostalCode:  loc.postalCode,
		Subdivision: loc.subdivision,
		Latitude:    fmt.Sprintf("%f", loc.latitude),
		Longitude:   fmt.Sprintf("%f", loc.longitude),
	}
}

func (c *Location) IP() string {
	return c.ip
}

func (c *Location) IsSecure(ctx context.Context) bool {
	return false
	req := helpers.GinContextFromContext(ctx).Request

	forwarded := req.Header.Get("X-FORWARDED-FOR")

	ip := ""

	if forwarded != "" {
		ip = forwarded
	} else {
		ip = req.RemoteAddr
	}

	return ip == c.ip
}

func (c *Location) City() string {
	return c.city
}

func (c *Location) Country() string {
	return c.country
}

func (c *Location) Latitude() float64 {
	return c.latitude
}

func (c *Location) Longitude() float64 {
	return c.longitude
}

func (c *Location) Subdivision() string {
	return c.subdivision
}

func (c *Location) PostalCode() string {
	return c.postalCode
}
