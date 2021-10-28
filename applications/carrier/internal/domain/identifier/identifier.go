package identifier

// Carrier doesn't do any permission checks because it implicitly trusts all calls that come through are
// valid through GRPC

// this is used to identify an account, mainly for sending emails, etc...
type Identifier struct {
	accountId string
	username  string
	email     string
	language  string
}

func (i *Identifier) AccountId() string {
	return i.accountId
}

func (i *Identifier) Username() string {
	return i.username
}

func (i *Identifier) Language() string {
	return i.language
}

func (i *Identifier) Email() string {
	return i.email
}

func UnmarshalIdentifierFromDatabase(accountId, username, email, language string) *Identifier {
	return &Identifier{
		accountId: accountId,
		username:  username,
		email:     email,
		language:  language,
	}
}
