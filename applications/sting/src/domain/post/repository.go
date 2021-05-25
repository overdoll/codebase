package post

import (
	"context"
)

type Repository interface {
	GetPendingPost(context.Context, string) (*PostPending, error)
	CreatePendingPost(context.Context, *PostPending) error
	UpdatePendingPost(context.Context, string, func(*PostPending) (*PostPending, error)) (*PostPending, error)

	CreatePost(context.Context, *Post) error

	GetArtistById(context.Context, string) (*Artist, error)
	GetArtists(context.Context) ([]*Artist, error)

	GetCharactersById(context.Context, []string) ([]*Character, error)
	GetCharacters(context.Context) ([]*Character, error)
	CreateCharacters(context.Context, []*Character) error

	CreateMedias(context.Context, []*Media) error
	GetMediasById(context.Context, []string) ([]*Media, error)
	GetMedias(context.Context) ([]*Media, error)

	GetCategoriesById(context.Context, []string) ([]*Category, error)
	GetCategories(context.Context) ([]*Category, error)
	CreateCategories(context.Context, []*Category) error
}

type IndexRepository interface {
	BulkIndexPosts(context.Context, []*Post) error
	IndexPendingPost(context.Context, *PostPending) error
	BulkIndexPendingPosts(context.Context, []*PostPending) error

	DeletePostIndex(context.Context) error
	IndexPost(context.Context, *Post) error
	DeletePendingPostIndex(context.Context) error

	DeleteArtistIndex(context.Context) error
	BulkIndexArtists(context.Context, []*Artist) error
	SearchArtists(context.Context, string) ([]*Artist, error)

	BulkIndexCharacters(context.Context, []*Character) error
	DeleteCharacterIndex(context.Context) error
	SearchCharacters(context.Context, string) ([]*Character, error)

	BulkIndexMedia(context.Context, []*Media) error
	DeleteMediaIndex(context.Context) error
	SearchMedias(context.Context, string) ([]*Media, error)

	BulkIndexCategories(context.Context, []*Category) error
	DeleteCategoryIndex(context.Context) error
	SearchCategories(context.Context, string) ([]*Category, error)
}

type EventRepository interface {
	CreatePostEvent(context.Context, *PostPending) error
	ReviewPostEvent(context.Context, *PostPending) error
}
