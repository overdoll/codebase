package location

import (
	"fmt"
	"strconv"
)

type Serializable struct {
	City        string `json:"city"`
	Country     string `json:"country"`
	PostalCode  string `json:"postalCode"`
	Subdivision string `json:"subdivision"`
	Latitude    string `json:"latitude"`
	Longitude   string `json:"longitude"`
	Timezone    string `json:"timezone"`
}

type Location struct {
	city        string
	country     string
	postalCode  string
	subdivision string
	latitude    float64
	longitude   float64
	timezone    string
}

func UnmarshalLocationFromDatabase(city, country, postalCode, subdivision string, latitude, longitude float64, timezone string) *Location {
	return &Location{
		city:        city,
		country:     country,
		postalCode:  postalCode,
		subdivision: subdivision,
		latitude:    latitude,
		longitude:   longitude,
		timezone:    timezone,
	}
}

func UnmarshalLocationFromSerialized(serialized Serializable) *Location {

	lat, _ := strconv.ParseFloat(serialized.Latitude, 64)
	lng, _ := strconv.ParseFloat(serialized.Longitude, 64)

	return &Location{
		city:        serialized.City,
		country:     serialized.Country,
		postalCode:  serialized.PostalCode,
		subdivision: serialized.Subdivision,
		latitude:    lat,
		longitude:   lng,
		timezone:    serialized.Timezone,
	}
}

func Serialize(loc *Location) Serializable {
	return Serializable{
		City:        loc.city,
		Country:     loc.country,
		PostalCode:  loc.postalCode,
		Subdivision: loc.subdivision,
		Timezone:    loc.timezone,
		Latitude:    fmt.Sprintf("%f", loc.latitude),
		Longitude:   fmt.Sprintf("%f", loc.longitude),
	}
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

func (c *Location) Timezone() string {
	return c.timezone
}

func (c *Location) PostalCode() string {
	return c.postalCode
}
