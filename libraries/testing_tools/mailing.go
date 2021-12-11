package testing_tools

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/go-redis/redis/v8"
	"os"
	"overdoll/libraries/bootstrap"
	"strings"
	"time"
)

const (
	mailingRedisUtilityPrefix = "email:"
	mailingRedisDB            = 15
)

// tools used for "reading" emails in tests - just save to a redis key and read it back later

type MailingRedisUtility struct {
	client    *redis.Client
	sessionId string
}

func NewMailingRedisUtility() *MailingRedisUtility {
	return &MailingRedisUtility{
		client: bootstrap.InitializeRedisSessionWithCustomDB(mailingRedisDB),
		// we use bazel to run tests, so we need an ID that's gonna be unique per test run
		sessionId: os.Getenv("BAZEL_INTERNAL_INVOCATION_ID"),
	}
}

func (u *MailingRedisUtility) SendEmail(ctx context.Context, prefix, email string, variables map[string]interface{}) error {

	val, err := json.Marshal(variables)

	if err != nil {
		return fmt.Errorf("failed to marshal email variables: %v", err)
	}

	_, err = u.client.Set(ctx, mailingRedisUtilityPrefix+u.sessionId+":"+prefix+":"+strings.ToLower(email), val, time.Minute*5).Result()

	return err
}

func (u *MailingRedisUtility) ReadEmail(ctx context.Context, prefix, email string) (map[string]interface{}, error) {

	val, err := u.client.Get(ctx, mailingRedisUtilityPrefix+u.sessionId+":"+prefix+":"+strings.ToLower(email)).Result()

	if err != nil {
		return nil, err
	}

	var res map[string]interface{}
	if err := json.Unmarshal([]byte(val), &res); err != nil {
		return nil, err
	}

	return res, nil
}
