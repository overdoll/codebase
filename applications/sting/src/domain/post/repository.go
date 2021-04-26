package post

import (
	"context"

	"overdoll/libraries/ksuid"
)

type Repository interface {
	GetPendingPost(ctx context.Context, id ksuid.UUID) (*PostPending, error)
	CreatePendingPost(context.Context, *PostPending) error
	UpdatePendingPost(context.Context, *PostPending) error

	CreatePost(context.Context, *Post) error

	GetArtists(ctx context.Context) ([]*Artist, error)

	GetCharactersById(context.Context, []ksuid.UUID) ([]*Character, error)
	GetCharacters(context.Context) ([]*Character, error)
	CreateCharacters(context.Context, []*Character) error

	CreateMedias(context.Context, []*Media) error
	GetMediasById(context.Context, []ksuid.UUID) ([]*Media, error)
	GetMedias(context.Context) ([]*Media, error)

	GetCategoriesById(context.Context, []ksuid.UUID) ([]*Category, error)
	GetCategories(ctx context.Context) ([]*Category, error)
	CreateCategories(ctx context.Context, categories []*Category) error
}

type IndexRepository interface {
	BulkIndexPosts(context.Context, []*Post) error
	BulkIndexPendingPosts(context.Context, []*PostPending) error

	DeletePostIndex(ctx context.Context) error
	DeletePendingPostIndex(ctx context.Context) error

	DeleteArtistIndex(ctx context.Context) error
	BulkIndexArtists(ctx context.Context, artists []*Artist) error

	BulkIndexCharacters(context.Context, []*Character) error
	DeleteIndexCharacters(context.Context) error

	BulkIndexMedia(context.Context, []*Media) error
	DeleteIndexMedia(context.Context) error

	BulkIndexCategories(ctx context.Context, categories []*Category) error
	DeleteCategoryIndex(ctx context.Context) error
}

type EventRepository interface {
	PostCreated(context.Context, *PostPending) error
	PostCompleted(context.Context, *PostPending) error
	PostPendingUpdated(context.Context, *PostPending) error

	CharactersCreated(context.Context, []*Character) error
	MediaCreated(context.Context, []*Media) error

	CategoriesCreated(ctx context.Context, cats []*Category) error
}
