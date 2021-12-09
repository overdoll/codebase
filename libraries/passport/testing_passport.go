package passport

import "github.com/google/uuid"

func issueTestingPassport(id *string) (*Passport, error) {

	accountId := ""
	sessionId := ""

	if id != nil {
		accountId = *id
		sessionId = "testing-session-dont-use-lol"
	}

	return issuePassport(sessionId, uuid.New().String(), "127.0.0.1", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36", "en-US", accountId)
}