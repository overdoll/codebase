package billing

type Contact struct {
	firstName   string
	lastName    string
	email       string
	phoneNumber string
}

func (c *Contact) FirstName() string {
	return c.firstName
}

func (c *Contact) LastName() string {
	return c.lastName
}

func (c *Contact) Email() string {
	return c.email
}

func (c *Contact) PhoneNumber() string {
	return c.phoneNumber
}

func UnmarshalContactFromDatabase(firstName, lastName, email, phoneNumber string) *Contact {
	return &Contact{
		firstName:   firstName,
		lastName:    lastName,
		email:       email,
		phoneNumber: phoneNumber,
	}
}
