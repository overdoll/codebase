package command

import (
	"context"

	"github.com/pkg/errors"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
)

type CreatePost struct {
	Principal *principal.Principal

	// optional
	ExistingArtistId     *string
	CustomArtistUsername *string
	PosterIsArtist       bool
	Content              []string
	CharacterIds         []string
	CategoryIds          []string
	CharacterRequests    map[string]string
	MediaRequests        []string
}

type NewPostHandler struct {
	pr     post.Repository
	parley ParleyService
	eva    EvaService
}

func NewNewPostHandler(pr post.Repository, eva EvaService, parley ParleyService) NewPostHandler {
	return NewPostHandler{pr: pr, eva: eva, parley: parley}
}

func (h NewPostHandler) Handle(ctx context.Context, cmd CreatePost) (*post.Post, error) {

	characters, err := h.pr.GetCharactersById(ctx, cmd.CharacterIds)

	if err != nil {
		return nil, err
	}

	categories, err := h.pr.GetCategoriesById(ctx, cmd.CategoryIds)

	if err != nil {
		return nil, err
	}

	var artist *principal.Principal

	if cmd.PosterIsArtist {
		artist = cmd.Principal
	} else if cmd.ExistingArtistId != nil {
		artist, err = h.eva.GetAccount(ctx, *cmd.ExistingArtistId)

		if err != nil {
			return nil, errors.Wrap(err, "failed to get account")
		}
	}

	moderatorId, err := h.parley.GetNextModeratorId(ctx)

	if err != nil {
		return nil, errors.Wrap(err, "failed to get next moderator")
	}

	customArtistUsername := ""

	if cmd.CustomArtistUsername != nil {
		customArtistUsername = *cmd.CustomArtistUsername
	}

	pendingPost, err := post.NewPost(uuid.New().String(), moderatorId, artist, customArtistUsername, cmd.Principal, cmd.Content, characters, categories)

	if err != nil {
		return nil, err
	}

	_ = pendingPost.MakeProcessing()

	// create a pending post in the database with all of the data
	if err := h.pr.CreatePost(ctx, pendingPost); err != nil {
		return nil, err
	}

	return pendingPost, nil
}
