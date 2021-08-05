package post

import (
	"context"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetPost(ctx context.Context, postId string) (*Post, error)
	GetPostRequest(ctx context.Context, requester *principal.Principal, postId string) (*Post, error)
	CreatePost(ctx context.Context, post *Post) error

	// all of these are separated into different repositories because 1. we want to do permission checks and 2. we use separated commands and 3. we dont get issues with cassandra updates
	UpdatePostContent(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostCategories(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostCharacters(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostBrand(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostAudience(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *Post) error) (*Post, error)

	UpdatePost(ctx context.Context, postId string, updateFn func(post *Post) error) (*Post, error)
	DeletePost(ctx context.Context, postId string) error

	GetCharacterById(ctx context.Context, characterId string) (*Character, error)
	GetCharactersById(ctx context.Context, characterIds []string) ([]*Character, error)

	GetBrandById(ctx context.Context, brandId string) (*Brand, error)

	GetAudienceById(ctx context.Context, audienceId string) (*Audience, error)

	GetSeriesById(ctx context.Context, seriesIds []string) ([]*Series, error)
	GetSingleSeriesById(ctx context.Context, serialId string) (*Series, error)

	GetCategoryById(ctx context.Context, categoryId string) (*Category, error)
	GetCategoriesById(ctx context.Context, categoryIds []string) ([]*Category, error)
	CreateCategories(ctx context.Context, categories []*Category) error

	// processing and creating resources
	CreateResourcesFromUpload(ctx context.Context, ids []string) ([]*Resource, error)
	ProcessResources(ctx context.Context, resources []*Resource) ([]*Resource, error)
	DeleteResources(ctx context.Context, resources []*Resource) error
}

type IndexRepository interface {
	IndexPost(ctx context.Context, postId *Post) error
	IndexAllPosts(ctx context.Context) error
	SearchPosts(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *PostFilters) ([]*Post, error)
	DeletePostIndex(ctx context.Context) error
	DeletePost(ctx context.Context, postId string) error

	IndexAllCharacters(ctx context.Context) error
	DeleteCharacterIndex(ctx context.Context) error
	SearchCharacters(ctx context.Context, cursor *paging.Cursor, name *string) ([]*Character, error)
	IndexCharacters(ctx context.Context, characters []*Character) error

	IndexAllBrands(ctx context.Context) error
	DeleteBrandsIndex(ctx context.Context) error
	SearchBrands(ctx context.Context, cursor *paging.Cursor, title *string) ([]*Brand, error)

	IndexAllAudience(ctx context.Context) error
	DeleteAudienceIndex(ctx context.Context) error
	SearchAudience(ctx context.Context, cursor *paging.Cursor, title *string) ([]*Audience, error)

	IndexAllSeries(ctx context.Context) error
	DeleteSeriesIndex(ctx context.Context) error
	SearchSeries(ctx context.Context, cursor *paging.Cursor, title *string) ([]*Series, error)

	IndexAllCategories(ctx context.Context) error
	IndexCategories(ctx context.Context, categories []*Category) error
	DeleteCategoryIndex(ctx context.Context) error
	SearchCategories(ctx context.Context, paging *paging.Cursor, title *string) ([]*Category, error)
}
