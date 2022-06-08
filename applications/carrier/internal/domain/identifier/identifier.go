package identifier

// Carrier doesn't do any permission checks because it implicitly trusts all calls that come through are
// valid through GRPC

// Identifier this is used to identify an account, mainly for sending emails, etc...
type Identifier struct {
	accountId string
	username  string
	email     string
}

func (i *Identifier) AccountId() string {
	return i.accountId
}

func (i *Identifier) Username() string {
	return i.username
}

func (i *Identifier) Email() string {
	return i.email
}

func UnmarshalIdentifierFromDatabase(accountId, username, email string) *Identifier {
	return &Identifier{
		accountId: accountId,
		username:  username,
		email:     email,
	}
}
