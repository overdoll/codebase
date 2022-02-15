package billing

type SavedPaymentMethod struct {
	accountId string

	paymentMethod *PaymentMethod
}

func (c *SavedPaymentMethod) AccountId() string {
	return c.accountId
}

func (c *SavedPaymentMethod) PaymentMethod() *PaymentMethod {
	return c.paymentMethod
}

func UnmarshalSavedPaymentMethodFromDatabase(accountId string, paymentMethod *PaymentMethod) *SavedPaymentMethod {
	return &SavedPaymentMethod{
		accountId:     accountId,
		paymentMethod: paymentMethod,
	}
}
