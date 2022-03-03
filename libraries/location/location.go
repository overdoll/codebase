package location

type Location struct {
	city        string
	country     string
	postalCode  string
	subdivision string
	latitude    float64
	longitude   float64
}

func UnmarshalLocationFromDatabase(city, country, postalCode, subdivision string, latitude, longitude float64) *Location {
	return &Location{
		city:        city,
		country:     country,
		postalCode:  postalCode,
		subdivision: subdivision,
		latitude:    latitude,
		longitude:   longitude,
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

func (c *Location) PostalCode() string {
	return c.postalCode
}
