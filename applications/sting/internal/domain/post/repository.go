package post

import (
	"context"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetPostByIdOperator(ctx context.Context, postId string) (*Post, error)
	GetPostById(ctx context.Context, requester *principal.Principal, id string) (*Post, error)
	GetPostsByIds(ctx context.Context, requester *principal.Principal, postIds []string) ([]*Post, error)
	CreatePost(ctx context.Context, post *Post) error

	CreatePostLike(ctx context.Context, like *Like) error
	DeletePostLike(ctx context.Context, like *Like) error
	GetPostLikeById(ctx context.Context, requester *principal.Principal, postId, accountId string) (*Like, error)
	GetPostLikeByIdOperator(ctx context.Context, postId, accountId string) (*Like, error)

	UpdatePost(ctx context.Context, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostContent(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostCategories(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostCharacters(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostAudience(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostContentAndState(ctx context.Context, id string, updateFn func(pending *Post) error) error
	UpdatePostContentOperator(ctx context.Context, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostLikesOperator(ctx context.Context, id string, updateFn func(pending *Post) error) (*Post, error)

	DeletePost(ctx context.Context, postId string) error

	CreateCharacter(ctx context.Context, requester *principal.Principal, character *Character) error
	GetCharacterById(ctx context.Context, requester *principal.Principal, characterId string) (*Character, error)
	GetCharactersByIds(ctx context.Context, requester *principal.Principal, characterIds []string) ([]*Character, error)
	GetCharacterBySlug(ctx context.Context, requester *principal.Principal, slug, seriesSlug string) (*Character, error)
	GetCharacterIdsFromSlugs(ctx context.Context, characterSlugs, seriesIds []string) ([]string, error)

	UpdateCharacterThumbnailOperator(ctx context.Context, id string, updateFn func(character *Character) error) (*Character, error)
	UpdateCharacterThumbnail(ctx context.Context, requester *principal.Principal, id string, updateFn func(character *Character) error) (*Character, error)
	UpdateCharacterName(ctx context.Context, requester *principal.Principal, id string, updateFn func(character *Character) error) (*Character, error)

	UpdateCharacterTotalPostsOperator(ctx context.Context, id string, updateFn func(character *Character) error) (*Character, error)
	UpdateCharacterTotalLikesOperator(ctx context.Context, id string, updateFn func(character *Character) error) (*Character, error)

	CreateAudience(ctx context.Context, requester *principal.Principal, audience *Audience) error
	GetAudiences(ctx context.Context, requester *principal.Principal) ([]*Audience, error)
	GetAudienceById(ctx context.Context, requester *principal.Principal, audienceId string) (*Audience, error)
	GetAudiencesByIds(ctx context.Context, requester *principal.Principal, audienceIds []string) ([]*Audience, error)
	GetAudienceBySlug(ctx context.Context, requester *principal.Principal, slug string) (*Audience, error)
	GetAudienceIdsFromSlugs(ctx context.Context, audienceSlugs []string) ([]string, error)

	UpdateAudienceThumbnailOperator(ctx context.Context, id string, updateFn func(audience *Audience) error) (*Audience, error)
	UpdateAudienceThumbnail(ctx context.Context, requester *principal.Principal, id string, updateFn func(audience *Audience) error) (*Audience, error)
	UpdateAudienceTitle(ctx context.Context, requester *principal.Principal, id string, updateFn func(audience *Audience) error) (*Audience, error)
	UpdateAudienceIsStandard(ctx context.Context, requester *principal.Principal, id string, updateFn func(audience *Audience) error) (*Audience, error)

	UpdateAudienceTotalPostsOperator(ctx context.Context, id string, updateFn func(audience *Audience) error) (*Audience, error)
	UpdateAudienceTotalLikesOperator(ctx context.Context, id string, updateFn func(audience *Audience) error) (*Audience, error)

	CreateSeries(ctx context.Context, requester *principal.Principal, series *Series) error
	GetSeriesByIds(ctx context.Context, requester *principal.Principal, seriesIds []string) ([]*Series, error)
	GetSingleSeriesById(ctx context.Context, requester *principal.Principal, serialId string) (*Series, error)
	GetSeriesBySlug(ctx context.Context, requester *principal.Principal, slug string) (*Series, error)
	GetSeriesIdsFromSlugs(ctx context.Context, seriesIds []string) ([]string, error)

	UpdateSeriesThumbnailOperator(ctx context.Context, id string, updateFn func(series *Series) error) (*Series, error)
	UpdateSeriesThumbnail(ctx context.Context, requester *principal.Principal, id string, updateFn func(series *Series) error) (*Series, error)
	UpdateSeriesTitle(ctx context.Context, requester *principal.Principal, id string, updateFn func(series *Series) error) (*Series, error)

	UpdateSeriesTotalPostsOperator(ctx context.Context, id string, updateFn func(series *Series) error) (*Series, error)
	UpdateSeriesTotalLikesOperator(ctx context.Context, id string, updateFn func(series *Series) error) (*Series, error)

	GetCategoryById(ctx context.Context, requester *principal.Principal, categoryId string) (*Category, error)
	GetCategoriesByIds(ctx context.Context, requester *principal.Principal, categoryIds []string) ([]*Category, error)
	GetCategoryBySlug(ctx context.Context, requester *principal.Principal, slug string) (*Category, error)
	GetCategoryIdsFromSlugs(ctx context.Context, categoryIds []string) ([]string, error)

	CreateCategory(ctx context.Context, requester *principal.Principal, category *Category) error
	UpdateCategoryThumbnailOperator(ctx context.Context, id string, updateFn func(category *Category) error) (*Category, error)
	UpdateCategoryThumbnail(ctx context.Context, requester *principal.Principal, id string, updateFn func(category *Category) error) (*Category, error)
	UpdateCategoryTitle(ctx context.Context, requester *principal.Principal, id string, updateFn func(category *Category) error) (*Category, error)

	UpdateCategoryTotalPostsOperator(ctx context.Context, id string, updateFn func(category *Category) error) (*Category, error)
	UpdateCategoryTotalLikesOperator(ctx context.Context, id string, updateFn func(category *Category) error) (*Category, error)

	PostsFeed(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *Feed) ([]*Post, error)
	ClubMembersPostsFeed(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor) ([]*Post, error)
	SuggestedPostsByPost(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, post *Post) ([]*Post, error)
	Search(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, query string) ([]interface{}, error)
	SearchPosts(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *Filters) ([]*Post, error)
	RefreshPostIndex(ctx context.Context) error

	SearchCharacters(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *CharacterFilters) ([]*Character, error)
	GetTotalLikesForCharacterOperator(ctx context.Context, character *Character) (int, error)
	GetTotalPostsForCharacterOperator(ctx context.Context, character *Character) (int, error)

	SearchAudience(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *ObjectFilters) ([]*Audience, error)
	GetTotalLikesForAudienceOperator(ctx context.Context, audience *Audience) (int, error)
	GetTotalPostsForAudienceOperator(ctx context.Context, audience *Audience) (int, error)

	SearchSeries(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *ObjectFilters) ([]*Series, error)
	GetTotalLikesForSeriesOperator(ctx context.Context, series *Series) (int, error)
	GetTotalPostsForSeriesOperator(ctx context.Context, series *Series) (int, error)

	SearchCategories(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *ObjectFilters) ([]*Category, error)
	GetTotalLikesForCategoryOperator(ctx context.Context, category *Category) (int, error)
	GetTotalPostsForCategoryOperator(ctx context.Context, category *Category) (int, error)

	AddTerminatedClub(ctx context.Context, clubId string) error
	RemoveTerminatedClub(ctx context.Context, clubId string) error

	GetAccountPostLikes(ctx context.Context, accountId string) ([]string, error)
}
