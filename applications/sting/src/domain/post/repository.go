package post

import (
	"context"

	"overdoll/libraries/paging"
)

type Repository interface {
	GetPost(ctx context.Context, postId string) (*Post, error)
	GetPosts(ctx context.Context) ([]*Post, error)
	CreatePost(ctx context.Context, post *Post) error
	UpdatePost(ctx context.Context, postId string, updateFn func(post *Post) error) (*Post, error)
	DeletePost(ctx context.Context, postId string) error

	GetArtistById(ctx context.Context, artistId string) (*Artist, error)
	GetArtists(ctx context.Context) ([]*Artist, error)
	CreateArtist(ctx context.Context, artist *Artist) error

	GetCharacterById(ctx context.Context, characterId string) (*Character, error)
	GetCharactersById(ctx context.Context, characterIds []string) ([]*Character, error)
	GetCharacters(ctx context.Context) ([]*Character, error)
	CreateCharacters(ctx context.Context, characters []*Character) error

	CreateMedias(ctx context.Context, medias []*Media) error
	GetMediasById(ctx context.Context, mediaIds []string) ([]*Media, error)
	GetMedias(ctx context.Context) ([]*Media, error)
	GetMediaById(ctx context.Context, mediaId string) (*Media, error)

	GetCategoryById(ctx context.Context, categoryId string) (*Category, error)
	GetCategoriesById(ctx context.Context, categoryIds []string) ([]*Category, error)
	GetCategories(ctx context.Context) ([]*Category, error)
	CreateCategories(ctx context.Context, categories []*Category) error
}

type IndexRepository interface {
	IndexPost(ctx context.Context, postId *Post) error
	BulkIndexPosts(ctx context.Context, posts []*Post) error
	DeletePostIndex(ctx context.Context) error
	SearchPosts(ctx context.Context, cursor *paging.Cursor, filters *PostFilters) ([]*Post, *paging.Info, error)
	DeletePost(ctx context.Context, postId string) error

	BulkIndexCharacters(ctx context.Context, characters []*Character) error
	DeleteCharacterIndex(ctx context.Context) error
	SearchCharacters(ctx context.Context, cursor *paging.Cursor, name string) ([]*Character, *paging.Info, error)

	BulkIndexMedia(ctx context.Context, medias []*Media) error
	DeleteMediaIndex(ctx context.Context) error
	SearchMedias(ctx context.Context, cursor *paging.Cursor, title string) ([]*Media, *paging.Info, error)

	BulkIndexCategories(ctx context.Context, categories []*Category) error
	DeleteCategoryIndex(ctx context.Context) error
	SearchCategories(ctx context.Context, paging *paging.Cursor, title string) ([]*Category, *paging.Info, error)
}
