package post

import (
	"context"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
	"overdoll/libraries/resource"
)

type Repository interface {
	GetPostByIdOperator(ctx context.Context, postId string) (*Post, error)
	GetPostById(ctx context.Context, requester *principal.Principal, id string) (*Post, error)
	GetPostsByIds(ctx context.Context, requester *principal.Principal, postIds []string) ([]*Post, error)
	CreatePost(ctx context.Context, post *Post) error

	GetTopCharacterNames(ctx context.Context) ([]string, error)

	GetPostWithRandomSeed(ctx context.Context, passport *passport.Passport, seed int64, audienceIds []string) (*Post, error)

	GetFirstTopPostWithoutOccupiedResources(ctx context.Context, characterId, categoryId, seriesId, audienceId *string) (*Post, error)
	AddPostOccupiedResource(ctx context.Context, post *Post, resource *resource.Resource) error

	CreatePostLike(ctx context.Context, like *Like) error
	DeletePostLike(ctx context.Context, postId string, accountId string) error
	GetPostLikeById(ctx context.Context, requester *principal.Principal, postId, accountId string) (*Like, error)
	GetPostLikeByIdOperator(ctx context.Context, postId, accountId string) (*Like, error)

	AccountPostLikes(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*LikedPost, error)

	UpdatePost(ctx context.Context, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostContent(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostCategories(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostCharacters(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostAudience(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostDescription(ctx context.Context, requester *principal.Principal, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostContentAndState(ctx context.Context, id string, updateFn func(pending *Post) error) error
	UpdatePostContentOperator(ctx context.Context, id string, updateFn func(pending *Post) error) (*Post, error)
	UpdatePostContentOperatorResource(ctx context.Context, id string, resources []*resource.Resource) (*Post, error)
	UpdatePostLikesOperator(ctx context.Context, id string, updateFn func(pending *Post) error) (*Post, error)

	DeletePost(ctx context.Context, postId string) error

	CreateCharacter(ctx context.Context, character *Character) error
	GetCharacterById(ctx context.Context, characterId string) (*Character, error)
	GetCharactersByIds(ctx context.Context, characterIds []string) ([]*Character, error)
	GetCharacterBySlug(ctx context.Context, slug string, seriesSlug, clubSlug *string) (*Character, error)
	GetCharacterIdsFromSlugs(ctx context.Context, characterSlugs, seriesIds []string) ([]string, error)

	UpdateCharacterBannerOperator(ctx context.Context, id string, updateFn func(character *Character) error) (*Character, error)
	UpdateCharacterThumbnailOperator(ctx context.Context, id string, updateFn func(character *Character) error) (*Character, error)
	UpdateCharacterThumbnail(ctx context.Context, requester *principal.Principal, id string, updateFn func(character *Character) error) (*Character, error)
	UpdateCharacterName(ctx context.Context, requester *principal.Principal, id string, updateFn func(character *Character) error) (*Character, error)
	UpdateCharacterSlug(ctx context.Context, id, slug string, keepOld bool) error

	UpdateCharacterTotalPostsOperator(ctx context.Context, id string, updateFn func(character *Character) error) (*Character, error)
	UpdateCharacterTotalLikesOperator(ctx context.Context, id string, updateFn func(character *Character) error) (*Character, error)

	CreateAudience(ctx context.Context, requester *principal.Principal, audience *Audience) error
	GetAudienceById(ctx context.Context, audienceId string) (*Audience, error)
	GetAudiencesByIds(ctx context.Context, audienceIds []string) ([]*Audience, error)
	GetAudienceBySlug(ctx context.Context, slug string) (*Audience, error)
	GetAudienceIdsFromSlugs(ctx context.Context, audienceSlugs []string) ([]string, error)

	UpdateAudienceBannerOperator(ctx context.Context, id string, updateFn func(audience *Audience) error) (*Audience, error)
	UpdateAudienceThumbnailOperator(ctx context.Context, id string, updateFn func(audience *Audience) error) (*Audience, error)
	UpdateAudienceThumbnail(ctx context.Context, requester *principal.Principal, id string, updateFn func(audience *Audience) error) (*Audience, error)
	UpdateAudienceBanner(ctx context.Context, requester *principal.Principal, id string, updateFn func(audience *Audience) error) (*Audience, error)
	UpdateAudienceTitle(ctx context.Context, requester *principal.Principal, id string, updateFn func(audience *Audience) error) (*Audience, error)
	UpdateAudienceIsStandard(ctx context.Context, requester *principal.Principal, id string, updateFn func(audience *Audience) error) (*Audience, error)
	UpdateAudienceSlug(ctx context.Context, id, slug string, keepOld bool) error

	UpdateAudienceTotalPostsOperator(ctx context.Context, id string, updateFn func(audience *Audience) error) (*Audience, error)
	UpdateAudienceTotalLikesOperator(ctx context.Context, id string, updateFn func(audience *Audience) error) (*Audience, error)

	CreateSeries(ctx context.Context, series *Series) error
	GetSeriesByIds(ctx context.Context, seriesIds []string) ([]*Series, error)
	GetSingleSeriesById(ctx context.Context, serialId string) (*Series, error)
	GetSeriesBySlug(ctx context.Context, slug string) (*Series, error)
	GetSeriesIdsFromSlugs(ctx context.Context, seriesIds []string) ([]string, error)

	UpdateSeriesBannerOperator(ctx context.Context, id string, updateFn func(series *Series) error) (*Series, error)
	UpdateSeriesThumbnailOperator(ctx context.Context, id string, updateFn func(series *Series) error) (*Series, error)
	UpdateSeriesThumbnail(ctx context.Context, requester *principal.Principal, id string, updateFn func(series *Series) error) (*Series, error)
	UpdateSeriesTitle(ctx context.Context, requester *principal.Principal, id string, updateFn func(series *Series) error) (*Series, error)
	UpdateSeriesSlug(ctx context.Context, id, slug string, keepOld bool) error

	UpdateSeriesTotalPostsOperator(ctx context.Context, id string, updateFn func(series *Series) error) (*Series, error)
	UpdateSeriesTotalLikesOperator(ctx context.Context, id string, updateFn func(series *Series) error) (*Series, error)

	GetTopicById(ctx context.Context, topicId string) (*Topic, error)
	GetTopicsByIds(ctx context.Context, topicIds []string) ([]*Topic, error)
	GetTopicBySlug(ctx context.Context, slug string) (*Topic, error)
	CreateTopic(ctx context.Context, requester *principal.Principal, topic *Topic) error
	UpdateTopicBanner(ctx context.Context, requester *principal.Principal, id string, updateFn func(topic *Topic) error) (*Topic, error)
	UpdateTopicBannerOperator(ctx context.Context, id string, updateFn func(topic *Topic) error) (*Topic, error)
	UpdateTopicTitle(ctx context.Context, requester *principal.Principal, id string, updateFn func(topic *Topic) error) (*Topic, error)
	UpdateTopicDescription(ctx context.Context, requester *principal.Principal, id string, updateFn func(topic *Topic) error) (*Topic, error)
	UpdateTopicWeight(ctx context.Context, requester *principal.Principal, id string, updateFn func(topic *Topic) error) (*Topic, error)
	UpdateTopicSlug(ctx context.Context, id, slug string, keepOld bool) error

	GetCategoryById(ctx context.Context, categoryId string) (*Category, error)
	GetCategoriesByIds(ctx context.Context, categoryIds []string) ([]*Category, error)
	GetCategoryBySlug(ctx context.Context, slug string) (*Category, error)
	GetCategoryIdsFromSlugs(ctx context.Context, categoryIds []string) ([]string, error)

	CreateCategory(ctx context.Context, requester *principal.Principal, category *Category) error
	UpdateCategoryBannerOperator(ctx context.Context, id string, updateFn func(category *Category) error) (*Category, error)
	UpdateCategoryThumbnailOperator(ctx context.Context, id string, updateFn func(category *Category) error) (*Category, error)
	UpdateCategoryThumbnail(ctx context.Context, requester *principal.Principal, id string, updateFn func(category *Category) error) (*Category, error)
	UpdateCategoryTitle(ctx context.Context, requester *principal.Principal, id string, updateFn func(category *Category) error) (*Category, error)
	UpdateCategoryTopic(ctx context.Context, requester *principal.Principal, id string, updateFn func(category *Category) error) (*Category, error)
	UpdateCategoryAlternativeTitles(ctx context.Context, requester *principal.Principal, id string, updateFn func(category *Category) error) (*Category, error)
	UpdateCategorySlug(ctx context.Context, id, slug string, keepOld bool) error

	UpdateCategoryTotalPostsOperator(ctx context.Context, id string, updateFn func(category *Category) error) (*Category, error)
	UpdateCategoryTotalLikesOperator(ctx context.Context, id string, updateFn func(category *Category) error) (*Category, error)

	PostsFeed(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *Feed) ([]*Post, error)
	ClubMembersPostsFeed(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor) ([]*Post, error)
	SuggestedPostsByPost(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, post *Post, filters *Feed) ([]*Post, error)
	Search(ctx context.Context, passport *passport.Passport, requester *principal.Principal, cursor *paging.Cursor, query string) ([]interface{}, error)
	SearchPosts(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *Filters) ([]*Post, error)

	RefreshPostIndex(ctx context.Context) error

	SearchCharacters(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *CharacterFilters) ([]*Character, error)
	GetTotalLikesForCharacterOperator(ctx context.Context, character *Character) (int, error)
	GetTotalPostsForCharacterOperator(ctx context.Context, character *Character) (int, error)

	SearchAudience(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *ObjectFilters) ([]*Audience, error)
	GetTotalLikesForAudienceOperator(ctx context.Context, audience *Audience) (int, error)
	GetTotalPostsForAudienceOperator(ctx context.Context, audience *Audience) (int, error)

	SearchTopics(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor) ([]*Topic, error)

	SearchSeries(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *SeriesFilters) ([]*Series, error)
	GetTotalLikesForSeriesOperator(ctx context.Context, series *Series) (int, error)
	GetTotalPostsForSeriesOperator(ctx context.Context, series *Series) (int, error)

	GetTotalLikesForClubOperator(ctx context.Context, clubId string) (int, error)
	GetTotalPostsForClubOperator(ctx context.Context, clubId string) (int, error)

	SearchCategories(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *CategoryFilters) ([]*Category, error)
	GetTotalLikesForCategoryOperator(ctx context.Context, category *Category) (int, error)
	GetTotalPostsForCategoryOperator(ctx context.Context, category *Category) (int, error)

	AddTerminatedClub(ctx context.Context, clubId string) error
	RemoveTerminatedClub(ctx context.Context, clubId string) error

	GetAccountPostLikes(ctx context.Context, accountId string) ([]string, error)

	GenerateSitemap(ctx context.Context) error
}
