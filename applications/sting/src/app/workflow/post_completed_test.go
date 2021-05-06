package workflow_test

import (
	"context"
	"testing"
	"time"

	"github.com/segmentio/ksuid"
	"github.com/stretchr/testify/require"
	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/adapters"
	"overdoll/applications/sting/src/app/workflow"
	"overdoll/applications/sting/src/domain/post"
)

func TestPostCompleted_complete_post(t *testing.T) {
	t.Parallel()

	var newContent []string
	newContent = append(newContent, "test")

	postMock := &adapters.PostMock{
		PendingPost: post.UnmarshalPendingPostFromDatabase("id", string(post.Review), &post.Artist{}, "", nil, nil, nil, make(map[string]string), nil, nil, time.Now(), ""),
	}

	handler := workflow.NewPublishPostHandler(postMock, &adapters.PostIndexMock{}, &adapters.EventMock{}, &adapters.ContentMock{
		NewContent: newContent,
	}, &adapters.EvaServiceMock{})

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

	// should have been updated to published
	require.Equal(t, postMock.PendingPost.State(), post.Published)

	// content should have been updated
	require.Equal(t, postMock.PendingPost.RawContent(), newContent)
}
