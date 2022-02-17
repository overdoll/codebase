package billing

type Address struct {
	addressLine1 string
	city         string
	state        string
	country      string
	postalCode   string
}

func NewAddress(addressLine1, city, state, country, postalCode string) (*Address, error) {
	return &Address{
		addressLine1: addressLine1,
		city:         city,
		state:        state,
		country:      country,
		postalCode:   postalCode,
	}, nil
}

func (c *Address) AddressLine1() string {
	return c.addressLine1
}

func (c *Address) City() string {
	return c.city
}

func (c *Address) State() string {
	return c.state
}

func (c *Address) Country() string {
	return c.country
}

func (c *Address) PostalCode() string {
	return c.postalCode
}

func UnmarshalAddressFromDatabase(addressLine1, city, state, country, postalCode string) *Address {
	return &Address{
		addressLine1: addressLine1,
		city:         city,
		state:        state,
		country:      country,
		postalCode:   postalCode,
	}
}
