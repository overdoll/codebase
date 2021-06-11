package post

import (
	"context"
)

type Repository interface {
	GetPendingPost(context.Context, string) (*PostPending, error)
	GetPendingPosts(context.Context) ([]*PostPending, error)
	CreatePendingPost(context.Context, *PostPending) error
	UpdatePendingPost(context.Context, string, func(*PostPending) error) (*PostPending, error)
	DeletePendingPost(context.Context, string) error

	CreatePost(context.Context, *Post) error
	GetPost(context.Context, string) (*Post, error)
	DeletePost(context.Context, string) error

	GetArtistById(context.Context, string) (*Artist, error)
	GetArtists(context.Context) ([]*Artist, error)
	CreateArtist(context.Context, *Artist) error

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
	IndexPendingPost(context.Context, *PostPending) error
	BulkIndexPendingPosts(context.Context, []*PostPending) error
	DeletePendingPostIndex(context.Context) error
	SearchPendingPosts(context.Context, string) ([]*PostPending, error)

	BulkIndexPosts(context.Context, []*Post) error
	DeletePostIndex(context.Context) error
	DeletePostDocument(context.Context, string) error
	IndexPost(context.Context, *Post) error
	DeletePendingPostDocument(context.Context, string) error

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
