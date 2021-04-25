package command

import (
	"context"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/domain/category"
	"overdoll/applications/sting/src/domain/character"
	"overdoll/applications/sting/src/domain/post"
)

type CreatePostHandler struct {
	pr post.Repository

	cr  character.Repository
	ctr category.Repository

	pir post.IndexRepository
	eva EvaService
}

func NewCreatePostHandler(pr post.Repository, pir post.IndexRepository, cr character.Repository, ctr category.Repository, eva EvaService) CreatePostHandler {
	return CreatePostHandler{pr: pr, pir: pir, cr: cr, ctr: ctr, eva: eva}
}

func (h CreatePostHandler) HandlerName() string {
	return "CreatePostHandler"
}

func (h CreatePostHandler) NewCommand() interface{} {
	return &sting.PostCreated{}
}

func (h CreatePostHandler) Handle(ctx context.Context, c interface{}) error {
	cmd := c.(*sting.PostCreated)

	// TODO: capture all categories, characters & media from DB and insert them
	pst, err := post.UnmarshalPostFromProto(cmd.Post)

	if err != nil {
		return err
	}

	characters, err := h.cr.GetCharactersById(ctx, pst.Characters())

	if err != nil {
		return err
	}

	categories, err := h.ctr.GetCategoriesById(ctx, pst.Categories())

	if err != nil {
		return err
	}

	artist, err := h.eva.GetUser(ctx, pst.ArtistId().String())

	if err != nil {
		return err
	}

	contributor, err := h.eva.GetUser(ctx, pst.ContributorId().String())

	if err != nil {
		return err
	}

	return nil
}
