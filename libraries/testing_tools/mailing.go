package testing_tools

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"overdoll/libraries/errors"
	"strings"
)

var (
	mailingCache = make(map[string][]byte)
)

// tools used for "reading" emails in tests - just save to a map and read back later when needed

type MailingRedisUtility struct {
	sessionId string
}

func NewMailingRedisUtility() *MailingRedisUtility {
	return &MailingRedisUtility{
		sessionId: os.Getenv("BAZEL_INTERNAL_INVOCATION_ID"),
	}
}

func (u *MailingRedisUtility) SendEmail(ctx context.Context, prefix, email string, variables map[string]interface{}) error {

	val, err := json.Marshal(variables)

	if err != nil {
		return fmt.Errorf("failed to marshal email variables: %v", err)
	}

	mailingCache[u.sessionId+":"+prefix+":"+strings.ToLower(email)] = val
	return err
}

func (u *MailingRedisUtility) ReadEmail(ctx context.Context, prefix, email string) (map[string]interface{}, error) {

	val, ok := mailingCache[u.sessionId+":"+prefix+":"+strings.ToLower(email)]

	if !ok {
		return nil, errors.New("email not found")
	}

	var res map[string]interface{}
	if err := json.Unmarshal(val, &res); err != nil {
		return nil, err
	}

	return res, nil
}
