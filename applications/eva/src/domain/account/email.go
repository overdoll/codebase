package account

type EmailStatus string

const (
	EmailConfirmed   EmailStatus = "confirmed"
	EmailUnconfirmed EmailStatus = "unconfirmed"
)

type Email struct {
	email  string
	status EmailStatus
}

func UnmarshalEmailFromDatabase(email string, status int) *Email {
	var st EmailStatus

	if status == 0 {
		st = EmailUnconfirmed
	}

	if status == 1 {
		st = EmailConfirmed
	}

	return &Email{
		email:  email,
		status: st,
	}
}

func (c *Email) Email() string {
	return c.email
}

func (c *Email) Status() EmailStatus {
	return c.status
}
