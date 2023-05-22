package billing

type Card struct {
	bin        string
	btype      CardType
	last4      string
	expiration string
}

func NewCard(bin, btype, last4, expiration string) (*Card, error) {

	parsedType, err := CardTypeFromString(btype)

	if err != nil {
		return &Card{
			bin:        "",
			btype:      Other,
			last4:      "",
			expiration: "",
		}, nil
	}

	return &Card{
		bin:   bin,
		btype: parsedType,
		last4: last4,
		// format expiration date correctly
		expiration: expiration[:2] + "/" + "20" + expiration[2:],
	}, nil
}

func (c *Card) Type() CardType {
	return c.btype
}

func (c *Card) Last4() string {
	return c.last4
}

func (c *Card) BIN() string {
	return c.bin
}

func (c *Card) Expiration() string {
	return c.expiration
}

func UnmarshalCardFromDatabase(bin, btype, last4, expiration string) *Card {

	t, _ := CardTypeFromString(btype)

	return &Card{
		btype:      t,
		bin:        bin,
		last4:      last4,
		expiration: expiration,
	}
}
