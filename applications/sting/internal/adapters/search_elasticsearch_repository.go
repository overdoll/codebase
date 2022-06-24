package adapters

import (
	"context"
	"fmt"
	"github.com/olivere/elastic/v7"
	"go.uber.org/zap"
	"overdoll/libraries/errors"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
	"overdoll/libraries/sentry_support"
	"overdoll/libraries/support"
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

const SearchHistoryIndexName = "sting.search_history"

func (r PostsCassandraElasticsearchRepository) Search(ctx context.Context, passport *passport.Passport, requester *principal.Principal, cursor *paging.Cursor, qs string) ([]interface{}, error) {

	builder := elastic.NewSearchSource().
		IndexBoosts(
			elastic.IndexBoost{
				Index: CategoryIndexName,
				Boost: 5,
			},
		).
		IndexBoosts(
			elastic.IndexBoost{
				Index: CharacterIndexName,
				Boost: 4,
			},
		).
		IndexBoosts(
			elastic.IndexBoost{
				Index: SeriesIndexName,
				Boost: 3,
			},
		).
		IndexBoosts(
			elastic.IndexBoost{
				Index: ClubsIndexName,
				Boost: 0.5,
			},
		)

	if cursor != nil && cursor.GetLimit() > 0 {
		builder.Size(cursor.GetLimit())
	}

	query := elastic.NewBoolQuery()

	query.Should(elastic.NewBoolQuery().Must(
		elastic.
			NewMultiMatchQuery(qs, localization.GetESSearchFields("title")...).
			Type("best_fields"),
	).
		Must(elastic.NewTermQuery("_index", CategoryIndexName)))

	query.Should(elastic.NewBoolQuery().Must(
		elastic.
			NewMultiMatchQuery(qs, localization.GetESSearchFields("name")...).
			Type("best_fields"),
	).
		Must(elastic.NewTermQuery("_index", CharacterIndexName)))

	query.Should(elastic.NewBoolQuery().Must(
		elastic.
			NewMultiMatchQuery(qs, localization.GetESSearchFields("title")...).
			Type("best_fields"),
	).
		Must(elastic.NewTermQuery("_index", SeriesIndexName)))

	query.Should(elastic.NewBoolQuery().Must(
		elastic.
			NewMultiMatchQuery(qs, localization.GetESSearchFields("name")...).
			Type("best_fields"),
	).
		Must(elastic.NewTermQuery("_index", ClubsIndexName)))

	builder.Query(query)

	response, err := r.client.Search().SearchSource(builder).Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), fmt.Sprintf("failed to search query '%s'", qs))
	}

	var results []interface{}

	var clubResults []SearchResultHistory
	var seriesResults []SearchResultHistory
	var characterResults []SearchResultHistory
	var categoryResults []SearchResultHistory

	for _, hit := range response.Hits.Hits {

		switch hit.Index {
		case SeriesIndexName:

			result, err := r.unmarshalSeriesDocument(ctx, hit)

			if err != nil {
				return nil, err
			}

			seriesResults = append(seriesResults, SearchResultHistory{
				Score: hit.Score,
				Key:   result.Title().TranslateDefault(""),
				Id:    result.ID(),
			})

			results = append(results, result)

			break
		case ClubsIndexName:

			result, err := unmarshalClubDocument(ctx, hit, r.resourceSerializer)

			if err != nil {
				return nil, err
			}

			clubResults = append(clubResults, SearchResultHistory{
				Score: hit.Score,
				Key:   result.Name().TranslateDefault(""),
				Id:    result.ID(),
			})

			results = append(results, result)

			break
		case CharacterIndexName:

			result, err := r.unmarshalCharacterDocument(ctx, hit)

			if err != nil {
				return nil, err
			}

			characterResults = append(characterResults, SearchResultHistory{
				Score: hit.Score,
				Key:   result.Name().TranslateDefault(""),
				Id:    result.ID(),
			})

			results = append(results, result)

			break
		case CategoryIndexName:

			result, err := r.unmarshalCategoryDocument(ctx, hit)

			if err != nil {
				return nil, err
			}

			categoryResults = append(categoryResults, SearchResultHistory{
				Score: hit.Score,
				Key:   result.Title().TranslateDefault(""),
				Id:    result.ID(),
			})

			results = append(results, result)

			break
		default:
			continue
		}
	}

	_, err = r.client.
		Index().
		Index(SearchHistoryIndexName).
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
