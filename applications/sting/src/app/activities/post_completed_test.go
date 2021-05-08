package activities_test

import (
	"context"
	"testing"
	"time"

	"github.com/segmentio/ksuid"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/src/adapters"
	activities2 "overdoll/applications/sting/src/app/activities"
	"overdoll/applications/sting/src/domain/post"
)

func TestPostCompleted_complete_post(t *testing.T) {
	t.Parallel()

	var newContent []string
	newContent = append(newContent, "test")

	postMock := &adapters.PostMock{
		PendingPost: post.UnmarshalPendingPostFromDatabase("id", string(post.Review), &post.Artist{}, "", nil, nil, nil, make(map[string]string), nil, nil, time.Now(), ""),
	}

	handler := activities2.NewPublishPostActivityHandler(postMock, &adapters.PostIndexMock{}, &adapters.ContentMock{
		NewContent: newContent,
	}, &adapters.EvaServiceMock{})

	err := handler.Handle(context.Background(), ksuid.New().String())

	require.NoError(t, err)

	// should have been updated to published
	require.Equal(t, postMock.PendingPost.State(), post.Published)

	// content should have been updated
	require.Equal(t, postMock.PendingPost.RawContent(), newContent)
}
