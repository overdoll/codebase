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

	CreatePostLike(ctx context.Context, requester *principal.Principal, like *Like) error
	DeletePostLike(ctx context.Context, requester *principal.Principal, like *Like) error
	GetPostLikeById(ctx context.Context, requester *principal.Principal, postId, accountId string) (*Like, error)

	UpdatePostContent(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostCategories(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostCharacters(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostAudience(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *Post) error) (*Post, error)

	UpdatePostLikesOperator(ctx context.Context, id string, updateFn func(pending *Post) error) (*Post, error)

	UpdatePost(ctx context.Context, postId string, updateFn func(post *Post) error) (*Post, error)
	DeletePost(ctx context.Context, postId string) error

	GetCharacterById(ctx context.Context, requester *principal.Principal, characterId string) (*Character, error)
	GetCharactersById(ctx context.Context, characterIds []string) ([]*Character, error)
	GetCharacterBySlug(ctx context.Context, requester *principal.Principal, slug, seriesSlug string) (*Character, error)

	UpdateCharacterTotalPostsOperator(ctx context.Context, id string, updateFn func(character *Character) error) (*Character, error)
	UpdateCharacterTotalLikesOperator(ctx context.Context, id string, updateFn func(character *Character) error) (*Character, error)

	GetAudiences(ctx context.Context, requester *principal.Principal) ([]*Audience, error)
	GetAudienceById(ctx context.Context, requester *principal.Principal, audienceId string) (*Audience, error)
	GetAudienceBySlug(ctx context.Context, requester *principal.Principal, slug string) (*Audience, error)

	UpdateAudienceTotalPostsOperator(ctx context.Context, id string, updateFn func(audience *Audience) error) (*Audience, error)
	UpdateAudienceTotalLikesOperator(ctx context.Context, id string, updateFn func(audience *Audience) error) (*Audience, error)

	GetSeriesById(ctx context.Context, seriesIds []string) ([]*Series, error)
	GetSingleSeriesById(ctx context.Context, requester *principal.Principal, serialId string) (*Series, error)
	GetSeriesBySlug(ctx context.Context, requester *principal.Principal, slug string) (*Series, error)

	UpdateSeriesTotalPostsOperator(ctx context.Context, id string, updateFn func(series *Series) error) (*Series, error)
	UpdateSeriesTotalLikesOperator(ctx context.Context, id string, updateFn func(series *Series) error) (*Series, error)

	GetCategoryById(ctx context.Context, requester *principal.Principal, categoryId string) (*Category, error)
	GetCategoriesById(ctx context.Context, categoryIds []string) ([]*Category, error)
	GetCategoryBySlug(ctx context.Context, requester *principal.Principal, slug string) (*Category, error)

	UpdateCategoryTotalPostsOperator(ctx context.Context, id string, updateFn func(category *Category) error) (*Category, error)
	UpdateCategoryTotalLikesOperator(ctx context.Context, id string, updateFn func(category *Category) error) (*Category, error)
}

type IndexRepository interface {
	IndexPost(ctx context.Context, postId *Post) error
	IndexAllPosts(ctx context.Context) error

	PostsFeed(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *Feed) ([]*Post, error)

	SearchPosts(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *Filters) ([]*Post, error)
	DeletePostIndex(ctx context.Context) error
	DeletePost(ctx context.Context, postId string) error

	RefreshPostIndex(ctx context.Context) error

	IndexAllCharacters(ctx context.Context) error
	DeleteCharacterIndex(ctx context.Context) error
	SearchCharacters(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *CharacterFilters) ([]*Character, error)
	IndexCharacter(ctx context.Context, character *Character) error

	GetTotalLikesForCharacterOperator(ctx context.Context, character *Character) (int, error)
	GetTotalPostsForCharacterOperator(ctx context.Context, character *Character) (int, error)

	IndexAllAudience(ctx context.Context) error
	DeleteAudienceIndex(ctx context.Context) error
	SearchAudience(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *ObjectFilters) ([]*Audience, error)
	IndexAudience(ctx context.Context, audience *Audience) error

	GetTotalLikesForAudienceOperator(ctx context.Context, audience *Audience) (int, error)
	GetTotalPostsForAudienceOperator(ctx context.Context, audience *Audience) (int, error)

	IndexAllSeries(ctx context.Context) error
	DeleteSeriesIndex(ctx context.Context) error
	SearchSeries(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *ObjectFilters) ([]*Series, error)
	IndexSeries(ctx context.Context, series *Series) error

	GetTotalLikesForSeriesOperator(ctx context.Context, series *Series) (int, error)
	GetTotalPostsForSeriesOperator(ctx context.Context, series *Series) (int, error)

	IndexAllCategories(ctx context.Context) error
	IndexCategory(ctx context.Context, category *Category) error
	DeleteCategoryIndex(ctx context.Context) error
	SearchCategories(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *ObjectFilters) ([]*Category, error)

	GetTotalLikesForCategoryOperator(ctx context.Context, category *Category) (int, error)
	GetTotalPostsForCategoryOperator(ctx context.Context, category *Category) (int, error)
}
