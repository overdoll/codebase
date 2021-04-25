package command

import (
	"context"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/domain/category"
	"overdoll/applications/sting/src/domain/character"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/ksuid"
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
	cmd := c.(*sting.PostCreated).Post

	// TODO: capture all categories, characters & media from DB and insert them
	id, err := ksuid.Parse(cmd.Id)

	if err != nil {
		return err
	}

	artistId, err := ksuid.Parse(cmd.ArtistId)

	if err != nil {
		return err
	}

	contributorId, err := ksuid.Parse(cmd.ContributorId)

	if err != nil {
		return err
	}

	categoryIds, err := ksuid.ToUUIDArray(cmd.Categories)

	if err != nil {
		return err
	}

	characterIds, err := ksuid.ToUUIDArray(cmd.Characters)

	if err != nil {
		return err
	}

	characters, err := h.cr.GetCharactersById(ctx, characterIds)

	if err != nil {
		return err
	}

	categories, err := h.ctr.GetCategoriesById(ctx, categoryIds)

	if err != nil {
		return err
	}

	artist, err := h.eva.GetUser(ctx, artistId)

	if err != nil {
		return err
	}

	contributor, err := h.eva.GetUser(ctx, contributorId)

	if err != nil {
		return err
	}

	pst := post.NewPost(id, artist, contributor, cmd.Content, categories, characters)

	if err := h.pr.CreatePost(ctx, pst); err != nil {
		return err
	}

	// We have only one post - index it
	var posts []*post.Post
	posts = append(posts, pst)

	if err := h.pir.BulkIndexPosts(ctx, posts); err != nil {
		return err
	}

	return nil
}
