package token_test

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"overdoll/applications/eva/src/domain/token"
	"overdoll/libraries/uuid"
)

func TestCookie_Consume_not_redeemed(t *testing.T) {
	t.Parallel()

	ck, err := token.NewAuthenticationToken(uuid.New().String(), "test-email@test.com", "")

	require.NoError(t, err)

	assert.Equal(t, token.ErrTokenNotVerified, ck.MakeConsumed())
}

func TestCookie_Consume(t *testing.T) {
	t.Parallel()

	ck, err := token.NewAuthenticationToken(uuid.New().String(), "test-email@test.com", "")

	require.NoError(t, err)

	err = ck.MakeRedeemed()

	require.NoError(t, err)

	require.NoError(t, ck.MakeConsumed())
}
