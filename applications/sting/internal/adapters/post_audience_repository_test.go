package adapters_test

import (
	"context"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
)

func TestPostAudienceRepository_failure(t *testing.T) {
	t.Parallel()

	postRepo := newPostRepositoryWithESFailure(t)

	audienceId := uuid.New().String()
	audienceSlug := createFakeSlug(t)

	audience := post.UnmarshalAudienceFromDatabase(audienceId, audienceSlug, map[string]string{"en": "test"}, nil, 0, 0, 0)

	ctx := context.Background()

	requester := testing_tools.NewStaffPrincipal(uuid.New().String())

	err := postRepo.CreateAudience(ctx, requester, audience)
	require.Error(t, err, "should have received an error while creating the audience")

	_, err = postRepo.GetAudienceById(ctx, requester, audienceId)
	require.Equal(t, post.ErrAudienceNotFound, err, "category should not be found by id")

	_, err = postRepo.GetAudienceBySlug(ctx, requester, audienceSlug)
	require.Equal(t, post.ErrAudienceNotFound, err, "category should not be found by slug")
}
