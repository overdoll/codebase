package token

type TemporaryState struct {
	email  string
	secret string
}

func (t *TemporaryState) Email() string {
	return t.email
}

func (t *TemporaryState) Secret() string {
	return t.secret
}
