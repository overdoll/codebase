package billing

type PaymentMethod struct {
	id string

	card           *Card
	billingContact *Contact
	billingAddress *Address

	isCCBill bool
}

func (c *PaymentMethod) ID() string {
	return c.id
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

func UnmarshalPaymentMethodFromDatabase(id string, card *Card, billingContact *Contact, billingAddress *Address, isCCBill bool) *PaymentMethod {
	return &PaymentMethod{
		id:             id,
		card:           card,
		billingContact: billingContact,
		billingAddress: billingAddress,
		isCCBill:       isCCBill,
	}
}
