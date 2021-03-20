package mutations

import (
	"context"

	eva "overdoll/applications/eva/proto"
	"overdoll/applications/hades/src/helpers"
	"overdoll/applications/hades/src/models"
	sting "overdoll/applications/sting/proto"
)

// Post - create a post and determine if a review is required based on who the user is and if new items were requested
func (r *MutationResolver) Post(ctx context.Context, data *models.PostInput) (*models.PostResponse, error) {
	user := helpers.UserFromContext(ctx)

	if len(data.Categories) < 3 {
		return &models.PostResponse{Validation: &models.Validation{Code: "categories_amount"}}, nil
	}

	if len(data.Characters) < 1 {
		return &models.PostResponse{Validation: &models.Validation{Code: "characters_amount"}}, nil
	}

	artist := ""

	if data.ArtistID != nil {

		_, err := r.Services.Eva().GetUser(ctx, &eva.GetUserRequest{Id: *data.ArtistID})

		if err != nil {
			return &models.PostResponse{Validation: &models.Validation{Code: "invalid_artist"}}, nil
		}

		artist = *data.ArtistID
	}

	characterRequests := make(map[string]string)

	for _, character := range data.CharacterRequests {
		characterRequests[character.Name] = character.Media
	}

	reviewRequired := !user.IsVerified()

	// Even if user is verified, review is required if they requested a new character or media
	if data.MediaRequests != nil || data.CharacterRequests != nil || data.ArtistID == nil {
		reviewRequired = true
	}

	// Schedule a post to be created - some validation will occur here
	_, err := r.Services.Sting().SchedulePost(ctx, &sting.SchedulePostRequest{
		ArtistId:            artist,
		ArtistUsername:      data.ArtistUsername,
		ContributorId:       user.Id,
		ContributorUsername: user.Username,
		Content:             data.Content,
		Categories:          data.Categories,
		Characters:          data.Characters,
		CategoriesRequests:  nil,
		MediaRequests:       data.MediaRequests,
		CharacterRequests:   characterRequests,
		ReviewRequired:      reviewRequired,
	})

	if err != nil {
		return &models.PostResponse{Validation: &models.Validation{Code: "bad_data"}}, nil
	}

	return &models.PostResponse{Validation: nil, Review: reviewRequired}, nil
}
