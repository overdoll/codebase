package command

import (
	"context"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/common"
)

type CreatePostHandler struct {
	pr post.Repository
	pi post.IndexRepository

	pir post.IndexRepository
	eva common.EvaService
}

func NewCreatePostHandler(pr post.Repository, pir post.IndexRepository, eva common.EvaService) CreatePostHandler {
	return CreatePostHandler{pr: pr, pir: pir, eva: eva}
}

func (h CreatePostHandler) HandlerName() string {
	return "CreatePostHandler"
}

func (h CreatePostHandler) NewCommand() interface{} {
	return &sting.PostCreated{}
}

func (h CreatePostHandler) Handle(ctx context.Context, c interface{}) error {
	cmd := c.(*sting.PostCreated).Post

	characters, err := h.pr.GetCharactersById(ctx, cmd.CategoryIds)

	if err != nil {
		return err
	}

	categories, err := h.pr.GetCategoriesById(ctx, cmd.CategoryIds)

	if err != nil {
		return err
	}

	// need to grab artist, to ensure it's valid
	artist, err := h.pr.GetArtistById(ctx, cmd.ArtistId)

	if err != nil {
		return err
	}

	contributor, err := h.eva.GetUser(ctx, cmd.ContributorId)

	if err != nil {
		return err
	}

	pst := post.NewPost(cmd.Id, artist, contributor, cmd.Content, categories, characters)

	if err := h.pr.CreatePost(ctx, pst); err != nil {
		return err
	}

	if err := h.pir.IndexPost(ctx, pst); err != nil {
		return err
	}

	return nil
}
