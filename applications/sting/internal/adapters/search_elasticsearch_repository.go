package adapters

import (
	"context"
	"fmt"
	"github.com/olivere/elastic/v7"
	"go.uber.org/zap"
	"overdoll/libraries/cache"
	"overdoll/libraries/errors"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
	"overdoll/libraries/sentry_support"
	"overdoll/libraries/support"
	"strings"
	"time"
)

type SearchResultHistory struct {
	Score *float64 `json:"score"`
	Id    string   `json:"id"`
	Key   string   `json:"key"`
}

type SearchHistory struct {
	DeviceId   string                `json:"device_id"`
	Query      string                `json:"query"`
	TotalHits  int64                 `json:"total_hits"`
	TotalScore *float64              `json:"total_score"`
	TookMillis int64                 `json:"took_millis"`
	Category   []SearchResultHistory `json:"category_search_result_history"`
	Character  []SearchResultHistory `json:"character_search_result_history"`
	Series     []SearchResultHistory `json:"series_search_result_history"`
	Clubs      []SearchResultHistory `json:"clubs_search_result_history"`
	Timestamp  time.Time             `json:"timestamp"`
}

const SearchHistoryIndexName = "search_history"

var SearchHistoryReaderIndex = cache.ReadAlias(CachePrefix, SearchHistoryIndexName)
var searchHistoryWriterIndex = cache.WriteAlias(CachePrefix, SearchHistoryIndexName)

func (r PostsCassandraElasticsearchRepository) Search(ctx context.Context, passport *passport.Passport, requester *principal.Principal, cursor *paging.Cursor, qs string) ([]interface{}, error) {

	var results []interface{}

	// ignore empty queries
	if qs == "" {
		return results, nil
	}

	builder := elastic.NewSearchSource().
		IndexBoosts(
			elastic.IndexBoost{
				Index: CategoryReaderIndex,
				Boost: 5,
			},
		).
		IndexBoosts(
			elastic.IndexBoost{
				Index: CharacterReaderIndex,
				Boost: 4,
			},
		).
		IndexBoosts(
			elastic.IndexBoost{
				Index: SeriesReaderIndex,
				Boost: 3,
			},
		).
		IndexBoosts(
			elastic.IndexBoost{
				Index: ClubsReaderIndex,
				Boost: 0.5,
			},
		)

	if cursor != nil && cursor.GetLimit() > 0 {
		builder.Size(cursor.GetLimit())
	}

	query := elastic.NewBoolQuery()

	query.Should(elastic.NewBoolQuery().Must(
		elastic.
			NewMultiMatchQuery(qs, "title.en", "alternative_titles.en").
			Type("best_fields"),
	).
		Must(elastic.NewTermQuery("_index", CategoryReaderIndex)))

	charactersQuery := elastic.NewBoolQuery().Must(
		elastic.
			NewMultiMatchQuery(qs, "name.en").
			Type("best_fields"),
	).
		Must(elastic.NewTermQuery("_index", CharacterReaderIndex))

	query.Should(charactersQuery)

	query.Should(elastic.NewBoolQuery().Must(
		elastic.
			NewMultiMatchQuery(qs, "title.en").
			Type("best_fields"),
	).
		Must(elastic.NewTermQuery("_index", SeriesReaderIndex)))

	clubsQuery := elastic.NewBoolQuery().Must(
		elastic.
			NewMultiMatchQuery(qs, "name.en").
			Type("best_fields"),
	).
		Must(elastic.NewRangeQuery("total_posts").Gt(0)).
		Must(elastic.NewTermQuery("_index", ClubsReaderIndex))

	clubsQuery.Filter(elastic.NewTermQuery("terminated", false))

	query.Should(clubsQuery)

	builder.Query(query)

	response, err := r.client.Search().SearchSource(builder).Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), fmt.Sprintf("failed to search query '%s'", qs))
	}

	var clubResults []SearchResultHistory
	var seriesResults []SearchResultHistory
	var characterResults []SearchResultHistory
	var categoryResults []SearchResultHistory

	for _, hit := range response.Hits.Hits {

		if strings.Contains(hit.Index, SeriesIndexName) {
			result, err := r.unmarshalSeriesDocument(ctx, hit.Source, nil)

			if err != nil {
				return nil, err
			}

			seriesResults = append(seriesResults, SearchResultHistory{
				Score: hit.Score,
				Key:   result.Title().TranslateDefault(""),
				Id:    result.ID(),
			})

			results = append(results, result)
		}

		if strings.Contains(hit.Index, ClubsIndexName) {
			result, err := unmarshalClubDocument(ctx, hit.Source, nil, r.resourceSerializer)

			if err != nil {
				return nil, err
			}

			clubResults = append(clubResults, SearchResultHistory{
				Score: hit.Score,
				Key:   result.Name().TranslateDefault(""),
				Id:    result.ID(),
			})

			results = append(results, result)
		}

		if strings.Contains(hit.Index, CharacterIndexName) {
			result, err := r.unmarshalCharacterDocument(ctx, hit.Source, nil)

			if err != nil {
				return nil, err
			}

			characterResults = append(characterResults, SearchResultHistory{
				Score: hit.Score,
				Key:   result.Name().TranslateDefault(""),
				Id:    result.ID(),
			})

			results = append(results, result)
		}

		if strings.Contains(hit.Index, CategoryIndexName) {
			result, err := r.unmarshalCategoryDocument(ctx, hit.Source, nil)

			if err != nil {
				return nil, err
			}

			categoryResults = append(categoryResults, SearchResultHistory{
				Score: hit.Score,
				Key:   result.Title().TranslateDefault(""),
				Id:    result.ID(),
			})

			results = append(results, result)
		}
	}

	// if staff is logged in, don't save search results
	if requester != nil {
		if requester.IsStaff() {
			return results, nil
		}
	}

	_, err = r.client.
		Index().
		Index(searchHistoryWriterIndex).
		BodyJson(&SearchHistory{
			DeviceId:   passport.DeviceID(),
			Query:      qs,
			TotalHits:  response.TotalHits(),
			TotalScore: response.Hits.MaxScore,
			TookMillis: response.TookInMillis,
			Category:   categoryResults,
			Character:  characterResults,
			Series:     seriesResults,
			Clubs:      clubResults,
			Timestamp:  time.Now(),
		}).
		Do(ctx)

	// if there's an error saving search results, ignore error and instead capture the exception for later
	if err != nil {
		sentry_support.CaptureException(ctx, errors.Wrap(support.ParseElasticError(err), "failed to index search history"))
		zap.S().Errorw("failed to index search history", support.ParseElasticError(err))
		return results, nil
	}

	return results, nil

}
