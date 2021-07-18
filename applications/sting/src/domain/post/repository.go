package post

import (
	"context"

	"overdoll/libraries/graphql/relay"
)

type Repository interface {
	GetPendingPost(context.Context, string) (*PendingPost, error)
	GetPendingPosts(context.Context) ([]*PendingPost, error)
	CreatePendingPost(context.Context, *PendingPost) error
	UpdatePendingPost(context.Context, string, func(*PendingPost) error) (*PendingPost, error)
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
	IndexPendingPost(context.Context, *PendingPost) error
	BulkIndexPendingPosts(context.Context, []*PendingPost) error
	DeletePendingPostIndex(context.Context) error
	SearchPendingPosts(context.Context, *relay.Cursor, *PendingPostFilters) ([]*PendingPost, *relay.Paging, error)

	BulkIndexPosts(context.Context, []*Post) error
	DeletePostIndex(context.Context) error
	DeletePostDocument(context.Context, string) error
	IndexPost(context.Context, *Post) error
	DeletePendingPostDocument(context.Context, string) error

	DeleteArtistIndex(context.Context) error
	BulkIndexArtists(context.Context, []*Artist) error
	SearchArtists(context.Context, *relay.Cursor, string) ([]*Artist, *relay.Paging, error)

	BulkIndexCharacters(context.Context, []*Character) error
	DeleteCharacterIndex(context.Context) error
	SearchCharacters(context.Context, *relay.Cursor, string) ([]*Character, *relay.Paging, error)

	BulkIndexMedia(context.Context, []*Media) error
	DeleteMediaIndex(context.Context) error
	SearchMedias(context.Context, *relay.Cursor, string) ([]*Media, *relay.Paging, error)

	BulkIndexCategories(context.Context, []*Category) error
	DeleteCategoryIndex(context.Context) error
	SearchCategories(context.Context, *relay.Cursor, string) ([]*Category, *relay.Paging, error)
}
