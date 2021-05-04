package command_test

import (
	"context"
	"testing"

	"github.com/bmizerany/assert"
	"github.com/segmentio/ksuid"
	"github.com/stretchr/testify/require"
	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/adapters"
	"overdoll/applications/sting/src/app/command"
	"overdoll/libraries/common"
)

func TestNewPendingPost_in_review(t *testing.T) {
	t.Parallel()

	events := &adapters.EventMock{}

	var newContent []string
	newContent = append(newContent, "test")

	postMock := &adapters.PostMock{}

	handler := command.NewNewPostHandler(postMock, &adapters.PostIndexMock{}, &adapters.ContentMock{
		NewContent: newContent,
	}, &adapters.EvaServiceMock{
		User: common.NewUser(
			"some-random-id",
			"actual-user",
			"",
			nil,
			// false for verified - it will dispatch a review event
			false),
	}, events)

	var oldContent []string
	oldContent = append(oldContent, "asd")

	err := handler.Handle(context.Background(), &sting.SchedulePost{Post: &sting.NewPendingPost{
		Id:                ksuid.New().String(),
		ArtistId:          "artist_id",
		ArtistUsername:    "",
		ContributorId:     "some-random-id",
		Content:           oldContent,
		CharacterIds:      nil,
		MediaRequests:     nil,
		CategoryRequests:  nil,
		CharacterRequests: nil,
	}})

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
