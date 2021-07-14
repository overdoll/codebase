package types

import (
	"overdoll/applications/sting/src/domain/post"
)

func MarshalPendingPostToGraphQL(result *post.PendingPostEdge) *PendingPostEdge {

	// Unmarshal our json into the correct model
	var mediaRequests []string

	for _, med := range result.Node.MediaRequests() {
		mediaRequests = append(mediaRequests, med.Title)
	}

	var characterRequests []*CharacterRequestType

	for _, med := range result.Node.CharacterRequests() {
		characterRequests = append(characterRequests, &CharacterRequestType{
			Name:  med.Name,
			Media: med.Media,
		})
	}

	artist := result.Node.Artist()
	id := artist.ID()

	var categories []*Category

	for _, cat := range result.Node.Categories() {
		categories = append(categories, &Category{
			ID:        cat.ID(),
			Thumbnail: cat.Thumbnail(),
			Title:     cat.Title(),
		})
	}

	var characters []*Character

	for _, char := range result.Node.Characters() {
		characters = append(characters, &Character{
			ID:        char.ID(),
			Thumbnail: char.Thumbnail(),
			Name:      char.Name(),
			Media: &Media{
				ID:        char.Media().ID(),
				Thumbnail: char.Media().Thumbnail(),
				Title:     char.Media().Title(),
			},
		})
	}

	var state PendingPostStateEnum

	if result.Node.InReview() {
		state = PendingPostStateEnumReview
	}

	if result.Node.IsDiscarded() {
		state = PendingPostStateEnumDiscarded
	}

	if result.Node.IsPublished() {
		state = PendingPostStateEnumPublished
	}

	if result.Node.IsRejected() {
		state = PendingPostStateEnumRejected
	}

	return &PendingPostEdge{
		Cursor: result.Cursor,
		Node: &PendingPost{
			ID:        result.Node.ID(),
			Moderator: result.Node.ModeratorId(),
			State:     state,
			Contributor: &Contributor{
				ID:       result.Node.Contributor().ID(),
				Username: result.Node.Contributor().Username(),
				Avatar:   result.Node.Contributor().Avatar(),
			},
			Content:           result.Node.Content(),
			Categories:        categories,
			Characters:        characters,
			MediaRequests:     mediaRequests,
			CharacterRequests: characterRequests,
			ArtistID:          &id,
			ArtistUsername:    artist.Username(),
		},
	}
}
