package cookie_test

import (
	"testing"

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
