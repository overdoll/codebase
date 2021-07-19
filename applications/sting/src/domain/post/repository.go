package post

import (
	"context"

	"overdoll/libraries/paging"
)

type Repository interface {
	GetPost(context.Context, string) (*Post, error)
	GetPosts(context.Context) ([]*Post, error)
	CreatePost(context.Context, *Post) error
	UpdatePost(context.Context, string, func(*Post) error) (*Post, error)
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
	IndexPost(context.Context, *Post) error
	BulkIndexPosts(context.Context, []*Post) error
	DeletePostIndex(context.Context) error
	SearchPosts(context.Context, *paging.Cursor) ([]*Post, *paging.Info, error)
	DeletePostDocument(context.Context, string) error

	DeleteArtistIndex(context.Context) error
	BulkIndexArtists(context.Context, []*Artist) error
	SearchArtists(context.Context, *paging.Cursor, string) ([]*Artist, *paging.Info, error)

	BulkIndexCharacters(context.Context, []*Character) error
	DeleteCharacterIndex(context.Context) error
	SearchCharacters(context.Context, *paging.Cursor, string) ([]*Character, *paging.Info, error)

	BulkIndexMedia(context.Context, []*Media) error
	DeleteMediaIndex(context.Context) error
	SearchMedias(context.Context, *paging.Cursor, string) ([]*Media, *paging.Info, error)

	BulkIndexCategories(context.Context, []*Category) error
	DeleteCategoryIndex(context.Context) error
	SearchCategories(context.Context, *paging.Cursor, string) ([]*Category, *paging.Info, error)
}
