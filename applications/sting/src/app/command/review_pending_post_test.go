package command_test

import (
	"context"
	"testing"
	"time"

	"github.com/segmentio/ksuid"
	"github.com/stretchr/testify/require"
	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/adapters"
	"overdoll/applications/sting/src/app/command"
	"overdoll/applications/sting/src/domain/post"
)

func TestReviewPendingPost_review_post(t *testing.T) {
	t.Parallel()

	postMock := &adapters.PostMock{
		PendingPost: post.UnmarshalPendingPostFromDatabase("id", string(post.Review), &post.Artist{}, "", nil, nil, nil, make(map[string]string), nil, nil, time.Now(), ""),
	}

	handler := command.NewReviewPostHandler(postMock, &adapters.EventMock{})

	err := handler.Handle(context.Background(), &sting.ReviewPost{Post: &sting.NewPendingPost{
		Id:                ksuid.New().String(),
		ArtistId:          "artist_id",
		ArtistUsername:    "",
		ContributorId:     "some-random-id",
		Content:           nil,
		CharacterIds:      nil,
		MediaRequests:     nil,
		CategoryRequests:  nil,
		CharacterRequests: nil,
	}})

	require.NoError(t, err)

	// should have been updated to publishing
	require.Equal(t, postMock.PendingPost.State(), post.Publishing)
}
