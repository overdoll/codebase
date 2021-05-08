package activities_test

import (
	"context"
	"testing"

	"github.com/bmizerany/assert"
	"github.com/segmentio/ksuid"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/src/adapters"
	activities2 "overdoll/applications/sting/src/app/activities"
	"overdoll/libraries/user"
)

func TestNewPendingPost_in_review(t *testing.T) {
	t.Parallel()

	events := &adapters.EventMock{}

	var newContent []string
	newContent = append(newContent, "test")

	postMock := &adapters.PostMock{}

	handler := activities2.NewNewPostActivityHandler(postMock, &adapters.PostIndexMock{}, &adapters.ContentMock{
		NewContent: newContent,
	}, &adapters.EvaServiceMock{
		User: user.NewUser(
			"some-random-id",
			"actual-user",
			"",
			nil,
			// false for verified - it will dispatch a review event
			false),
	})

	var oldContent []string
	oldContent = append(oldContent, "asd")

	err := handler.Handle(context.Background(), ksuid.New().String())

	require.NoError(t, err)

	// should dispatch "PostCompleted" event since a review is required
	require.Contains(t, events.DispatchedEvents, "PostCompleted")

	// content should have been updated
	require.Equal(t, postMock.PendingPost.RawContent(), newContent)

	// artist should have been setup correctly
	assert.Equal(t, postMock.PendingPost.Artist().ID(), "artist_id")

	// contributor should have been setup correctly
	assert.Equal(t, postMock.PendingPost.Contributor().Username, "actual-user")
}
