package command_test

import (
	"context"
	"testing"
	"time"

	"github.com/segmentio/ksuid"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/src/adapters"
	"overdoll/applications/sting/src/app/command"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/helpers"
)

func TestPostCompleted_complete_post(t *testing.T) {
	t.Parallel()

	var newContent []string
	newContent = append(newContent, "test")

	postMock := &adapters.PostMock{
		PendingPost: post.UnmarshalPendingPostFromDatabase("id", string(post.Review), &post.Artist{}, "", nil, nil, nil, make(map[string]string), nil, nil, time.Now(), ""),
	}

	handler := command.NewPublishPostActivityHandler(postMock, &adapters.PostIndexMock{}, &adapters.ContentMock{
		NewContent: newContent,
	}, &adapters.EvaServiceMock{})

	err := handler.Handle(helpers.GinContextWithTesting(context.Background()), ksuid.New().String())

	require.NoError(t, err)

	// should have been updated to published
	// TODO: broken?
	// require.Equal(t, string(postMock.PendingPost.State()), string(post.Review))

	// content should have been updated
	// require.Equal(t, postMock.PendingPost.RawContent(), newContent)
}
