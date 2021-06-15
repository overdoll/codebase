package adapters

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/user"
)

type PostMock struct {
	PendingPost *post.PendingPost
	Post        *post.Post
	Artist      *post.Artist
	Characters  []*post.Character
	Categories  []*post.Category
	Medias      []*post.Media
}

func (p PostMock) GetPendingPost(ctx context.Context, s string) (*post.PendingPost, error) {
	return p.PendingPost, nil
}

func (p PostMock) CreatePendingPost(ctx context.Context, pending *post.PendingPost) error {
	p.PendingPost = pending
	return nil
}

func (p PostMock) UpdatePendingPost(ctx context.Context, s string, f func(*post.PendingPost) (*post.PendingPost, error)) (*post.PendingPost, error) {

	pending, _ := p.GetPendingPost(ctx, s)

	updated, _ := f(pending)

	return updated, nil
}

func (p PostMock) CreatePost(ctx context.Context, post *post.Post) error {
	return nil
}

func (p PostMock) GetArtistById(ctx context.Context, s string) (*post.Artist, error) {
	return p.Artist, nil
}

func (p PostMock) GetArtists(ctx context.Context) ([]*post.Artist, error) {
	panic("implement me")
}

func (p PostMock) GetCharactersById(ctx context.Context, strings []string) ([]*post.Character, error) {
	return p.Characters, nil
}

func (p PostMock) GetCharacters(ctx context.Context) ([]*post.Character, error) {
	return p.Characters, nil
}

func (p PostMock) CreateCharacters(ctx context.Context, characters []*post.Character) error {
	return nil
}

func (p PostMock) CreateMedias(ctx context.Context, media []*post.Media) error {
	return nil
}

func (p PostMock) GetMediasById(ctx context.Context, strings []string) ([]*post.Media, error) {
	return p.Medias, nil
}

func (p PostMock) GetMedias(ctx context.Context) ([]*post.Media, error) {
	return p.Medias, nil
}

func (p PostMock) GetCategoriesById(ctx context.Context, strings []string) ([]*post.Category, error) {
	return p.Categories, nil
}

func (p PostMock) GetCategories(ctx context.Context) ([]*post.Category, error) {
	return p.Categories, nil
}

func (p PostMock) CreateCategories(ctx context.Context, categories []*post.Category) error {
	return nil
}

type PostIndexMock struct {
}

func (p PostIndexMock) SearchArtists(ctx context.Context, s string) ([]*post.Artist, error) {
	panic("implement me")
}

func (p PostIndexMock) SearchCharacters(ctx context.Context, s string) ([]*post.Character, error) {
	panic("implement me")
}

func (p PostIndexMock) SearchMedias(ctx context.Context, s string) ([]*post.Media, error) {
	panic("implement me")
}

func (p PostIndexMock) SearchCategories(ctx context.Context, s string) ([]*post.Category, error) {
	panic("implement me")
}

func (p PostIndexMock) BulkIndexPosts(ctx context.Context, posts []*post.Post) error {
	return nil
}

func (p PostIndexMock) IndexPendingPost(ctx context.Context, pending *post.PendingPost) error {
	return nil
}

func (p PostIndexMock) BulkIndexPendingPosts(ctx context.Context, pendings []*post.PendingPost) error {
	return nil
}

func (p PostIndexMock) DeletePostIndex(ctx context.Context) error {
	return nil
}

func (p PostIndexMock) IndexPost(ctx context.Context, p2 *post.Post) error {
	return nil
}

func (p PostIndexMock) DeletePendingPostIndex(ctx context.Context) error {
	return nil
}

func (p PostIndexMock) DeleteArtistIndex(ctx context.Context) error {
	return nil
}

func (p PostIndexMock) BulkIndexArtists(ctx context.Context, artists []*post.Artist) error {
	return nil
}

func (p PostIndexMock) BulkIndexCharacters(ctx context.Context, characters []*post.Character) error {
	return nil
}

func (p PostIndexMock) DeleteCharacterIndex(ctx context.Context) error {
	return nil
}

func (p PostIndexMock) BulkIndexMedia(ctx context.Context, media []*post.Media) error {
	return nil
}

func (p PostIndexMock) DeleteMediaIndex(ctx context.Context) error {
	return nil
}

func (p PostIndexMock) BulkIndexCategories(ctx context.Context, categories []*post.Category) error {
	return nil
}

func (p PostIndexMock) DeleteCategoryIndex(ctx context.Context) error {
	return nil
}

type ContentMock struct {
	NewContent []string
}

func (c ContentMock) ProcessContent(ctx context.Context, s string, strings []string) ([]string, error) {
	return c.NewContent, nil
}

func (c ContentMock) MakeProcessedContentPublic(ctx context.Context, s string, strings []string) ([]string, error) {
	return c.NewContent, nil
}

type EvaServiceMock struct {
	User *user.User
}

func (e EvaServiceMock) GetUser(ctx context.Context, id string) (*user.User, error) {
	return e.User, nil
}
