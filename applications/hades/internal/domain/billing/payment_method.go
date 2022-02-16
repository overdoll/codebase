package billing

type PaymentMethod struct {
	card           *Card
	billingContact *Contact
	billingAddress *Address
}

func (c *PaymentMethod) Card() *Card {
	return c.card
}

func (c *PaymentMethod) BillingContact() *Contact {
	return c.billingContact
}

func (c *PaymentMethod) BillingAddress() *Address {
	return c.billingAddress
}

func UnmarshalPaymentMethodFromDatabase(card *Card, billingContact *Contact, billingAddress *Address) *PaymentMethod {
	return &PaymentMethod{
		card:           card,
		billingContact: billingContact,
		billingAddress: billingAddress,
	}
}
