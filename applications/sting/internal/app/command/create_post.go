package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/account"
	"overdoll/libraries/uuid"
)

type CreatePost struct {
	ContributorId string
	// optional
	ExistingArtistId  *string
	ArtistUsername    string
	PosterIsArtist    bool
	Content           []string
	CharacterIds      []string
	CategoryIds       []string
	CharacterRequests map[string]string
	MediaRequests     []string
}

type CreatePostHandler struct {
	pr     post.Repository
	parley ParleyService
	eva    EvaService
}

func NewCreatePostHandler(pr post.Repository, eva EvaService, parley ParleyService) CreatePostHandler {
	return CreatePostHandler{pr: pr, eva: eva, parley: parley}
}

func (h CreatePostHandler) Handle(ctx context.Context, cmd CreatePost) (*post.Post, error) {

	// Get our contributor
	contributor, err := h.eva.GetAccount(ctx, cmd.ContributorId)

	if err != nil {
		return nil, err
	}

	if contributor.IsLocked() {
		return nil, err
	}

	characters, err := h.pr.GetCharactersById(ctx, cmd.CharacterIds)

	if err != nil {
		return nil, err
	}

	categories, err := h.pr.GetCategoriesById(ctx, cmd.CategoryIds)

	if err != nil {
		return nil, err
	}

	var artist *account.Account

	if cmd.PosterIsArtist {
		artist, err = h.eva.GetAccount(ctx, cmd.ContributorId)

		if err != nil {
			return nil, err
		}
	} else if cmd.ExistingArtistId != nil {
		artist, err = h.eva.GetAccount(ctx, *cmd.ExistingArtistId)

		if err != nil {
			return nil, err
		}
	}

	moderatorId, err := h.parley.GetNextModeratorId(ctx)

	if err != nil {
		return nil, err
	}

	pendingPost, err := post.NewPost(uuid.New().String(), moderatorId, artist, cmd.ArtistUsername, contributor, cmd.Content, characters, categories)

	if err != nil {
		return nil, err
	}

	// Request new resources
	pendingPost.RequestResources(cmd.CharacterRequests, make([]string, 0), cmd.MediaRequests)

	_ = pendingPost.MakeProcessing()

	// create a pending post in the database with all of the data
	if err := h.pr.CreatePost(ctx, pendingPost); err != nil {
		return nil, err
	}

	return pendingPost, nil
}
