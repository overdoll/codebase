package cookie_test

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/libraries/uuid"
)

func TestCookie_Consume_not_redeemed(t *testing.T) {
	t.Parallel()

	ck, err := cookie.NewCookie(uuid.New().String(), "test-email@test.com", "")

	require.NoError(t, err)

	assert.Equal(t, cookie.ErrCookieNotRedeemed, ck.MakeConsumed())
}

func TestCookie_Consume(t *testing.T) {
	t.Parallel()

	ck, err := cookie.NewCookie(uuid.New().String(), "test-email@test.com", "")

	require.NoError(t, err)

	err = ck.MakeRedeemed()

	require.NoError(t, err)

	require.NoError(t, ck.MakeConsumed())
}

func TestCookie_Redeem_expired(t *testing.T) {
	t.Parallel()

	ck := cookie.UnmarshalCookieFromDatabase(uuid.New().String(), "test-email@test.com", false, "", time.Now())

	assert.Equal(t, cookie.ErrCookieExpired, ck.MakeRedeemed())
}

func TestCookie_Consume_expired(t *testing.T) {
	t.Parallel()

	ck := cookie.UnmarshalCookieFromDatabase(uuid.New().String(), "test-email@test.com", true, "", time.Now())

	assert.Equal(t, cookie.ErrCookieExpired, ck.MakeConsumed())
}
