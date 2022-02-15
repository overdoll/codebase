package billing

type Card struct {
	btype      CardType
	last4      string
	expiration string
}

func (c *Card) Type() CardType {
	return c.btype
}

func (c *Card) Last4() string {
	return c.last4
}

func (c *Card) Expiration() string {
	return c.expiration
}

func UnmarshalCardFromDatabase(btype, last4, expiration string) *Card {

	t, _ := CardTypeFromString(btype)

	return &Card{
		btype:      t,
		last4:      last4,
		expiration: expiration,
	}
}
