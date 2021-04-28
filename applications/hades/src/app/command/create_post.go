package command

import (
	"context"

	"overdoll/applications/hades/src/domain/user"
	"overdoll/applications/hades/src/ports/graphql/types"
)

type CreatePostHandler struct{}

func NewCreatePostHandler() CreatePostHandler {
	return CreatePostHandler{}
}

func (h CreatePostHandler) Handle(ctx context.Context, data *types.PostInput) (*types.PostResponse, error) {

	usr := user.FromContext(ctx)

	if len(data.Categories) < 3 {
		return &types.PostResponse{Validation: &types.Validation{Code: "categories_amount"}}, nil
	}

	if !(len(data.Characters) >= 1 || len(data.CharacterRequests) >= 1) {
		return &types.PostResponse{Validation: &types.Validation{Code: "characters_amount"}}, nil
	}

	characterRequests := make(map[string]string)

	for _, character := range data.CharacterRequests {
		characterRequests[character.Name] = character.Media
	}

	// TODO: schedule post

	if err != nil {
		return &types.PostResponse{Validation: &types.Validation{Code: err.Error()}}, nil
	}

	return &types.PostResponse{Validation: nil, Review: false}, nil
}
