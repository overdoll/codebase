package post

import (
	"context"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetPostByIdOperator(ctx context.Context, postId string) (*Post, error)
	GetPostById(ctx context.Context, requester *principal.Principal, postId string) (*Post, error)
	CreatePost(ctx context.Context, post *Post) error

	// all of these are separated into different repositories because 1. we want to do permission checks and 2. we use separated commands and 3. we dont get issues with cassandra updates
	UpdatePostContent(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostCategories(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostCharacters(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostClub(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostAudience(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *Post) error) (*Post, error)

	UpdatePost(ctx context.Context, postId string, updateFn func(post *Post) error) (*Post, error)
	DeletePost(ctx context.Context, postId string) error

	GetCharacterById(ctx context.Context, requester *principal.Principal, characterId string) (*Character, error)
	GetCharactersById(ctx context.Context, characterIds []string) ([]*Character, error)
	GetCharacterBySlug(ctx context.Context, requester *principal.Principal, slug, seriesSlug string) (*Character, error)

	GetClubById(ctx context.Context, requester *principal.Principal, brandId string) (*Club, error)
	GetClubBySlug(ctx context.Context, requester *principal.Principal, slug string) (*Club, error)

	GetAudienceById(ctx context.Context, requester *principal.Principal, audienceId string) (*Audience, error)
	GetAudienceBySlug(ctx context.Context, requester *principal.Principal, slug string) (*Audience, error)

	GetSeriesById(ctx context.Context, seriesIds []string) ([]*Series, error)
	GetSingleSeriesById(ctx context.Context, requester *principal.Principal, serialId string) (*Series, error)
	GetSeriesBySlug(ctx context.Context, requester *principal.Principal, slug string) (*Series, error)

	GetCategoryById(ctx context.Context, requester *principal.Principal, categoryId string) (*Category, error)
	GetCategoriesById(ctx context.Context, categoryIds []string) ([]*Category, error)
	GetCategoryBySlug(ctx context.Context, requester *principal.Principal, slug string) (*Category, error)
}

type IndexRepository interface {
	IndexPost(ctx context.Context, postId *Post) error
	IndexAllPosts(ctx context.Context) error
	SearchPosts(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *PostFilters) ([]*Post, error)
	DeletePostIndex(ctx context.Context) error
	DeletePost(ctx context.Context, postId string) error

	IndexAllCharacters(ctx context.Context) error
	DeleteCharacterIndex(ctx context.Context) error
	SearchCharacters(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *CharacterFilters) ([]*Character, error)
	IndexCharacters(ctx context.Context, characters []*Character) error

	IndexAllClubs(ctx context.Context) error
	DeleteBrandsIndex(ctx context.Context) error
	SearchClubs(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *ObjectFilters) ([]*Club, error)

	IndexAllAudience(ctx context.Context) error
	DeleteAudienceIndex(ctx context.Context) error
	SearchAudience(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *ObjectFilters) ([]*Audience, error)

	IndexAllSeries(ctx context.Context) error
	DeleteSeriesIndex(ctx context.Context) error
	SearchSeries(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *ObjectFilters) ([]*Series, error)

	IndexAllCategories(ctx context.Context) error
	IndexCategories(ctx context.Context, categories []*Category) error
	DeleteCategoryIndex(ctx context.Context) error
	SearchCategories(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *ObjectFilters) ([]*Category, error)
}
