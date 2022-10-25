package adapters

import (
	"context"
	"github.com/olivere/elastic/v7"
	"overdoll/libraries/errors"
	"overdoll/libraries/paging"
	"overdoll/libraries/support"
	"sort"
	"strings"
)

func (r PostsCassandraElasticsearchRepository) ClubTags(ctx context.Context, cursor *paging.Cursor, clubId string) ([]interface{}, error) {

	size := cursor.GetLimit()
	if size == 0 {
		size = 10
	}

	response, err := r.client.
		Search().
		Index(PostReaderIndex).
		Size(0).
		Query(elastic.NewBoolQuery().Must(elastic.NewTermsQuery("club_id", clubId))).
		Aggregation("character_ids", elastic.NewTermsAggregation().Size(size).Field("character_ids").Meta(map[string]interface{}{"type": "character_ids"})).
		Aggregation("series_ids", elastic.NewTermsAggregation().Size(size).Field("series_ids").Meta(map[string]interface{}{"type": "series_ids"})).
		Aggregation("category_ids", elastic.NewTermsAggregation().Size(size).Field("category_ids").Meta(map[string]interface{}{"type": "category_ids"})).
		Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to aggregate tags")
	}

	characters, _ := response.Aggregations.Terms("character_ids")
	series, _ := response.Aggregations.Terms("series_ids")
	categories, _ := response.Aggregations.Terms("category_ids")

	type aggKey struct {
		keyItem *elastic.AggregationBucketKeyItem
		meta    map[string]interface{}
	}

	var aggregations []*aggKey

	for _, bucket := range characters.Buckets {
		aggregations = append(aggregations, &aggKey{
			keyItem: bucket,
			meta:    characters.Meta,
		})
	}

	for _, bucket := range series.Buckets {
		aggregations = append(aggregations, &aggKey{
			keyItem: bucket,
			meta:    series.Meta,
		})
	}

	for _, bucket := range categories.Buckets {
		aggregations = append(aggregations, &aggKey{
			keyItem: bucket,
			meta:    categories.Meta,
		})
	}

	sort.SliceStable(aggregations, func(i, j int) bool {
		return aggregations[i].keyItem.DocCount > aggregations[j].keyItem.DocCount
	})

	var categoryIds []string
	var seriesIds []string
	var characterIds []string

	for i := 0; i < size; i++ {
		if i == len(aggregations)-1 {
			break
		}

		metaType := aggregations[i].meta["type"].(string)
		targetKey := aggregations[i].keyItem.Key.(string)

		if metaType == "character_ids" {
			characterIds = append(characterIds, targetKey)
		}

		if metaType == "series_ids" {
			seriesIds = append(seriesIds, targetKey)
		}

		if metaType == "category_ids" {
			categoryIds = append(categoryIds, targetKey)
		}
	}

	var results []interface{}

	builder := elastic.NewSearchSource().
		IndexBoosts(
			elastic.IndexBoost{
				Index: CategoryReaderIndex,
				Boost: 1,
			},
		).
		IndexBoosts(
			elastic.IndexBoost{
				Index: CharacterReaderIndex,
				Boost: 1,
			},
		).
		IndexBoosts(
			elastic.IndexBoost{
				Index: SeriesReaderIndex,
				Boost: 1,
			},
		)

	builder.Size(size)

	query := elastic.NewBoolQuery()

	query.Should(elastic.NewBoolQuery().Must(
		elastic.
			NewTermsQueryFromStrings("category_ids", categoryIds...),
	).
		Must(elastic.NewTermQuery("_index", CategoryReaderIndex)))

	query.Should(elastic.NewBoolQuery().Must(
		elastic.
			NewTermsQueryFromStrings("character_ids", characterIds...),
	).
		Must(elastic.NewTermQuery("_index", CharacterReaderIndex)))

	query.Should(elastic.NewBoolQuery().Must(
		elastic.
			NewTermsQueryFromStrings("series_ids", seriesIds...),
	).
		Must(elastic.NewTermQuery("_index", SeriesReaderIndex)))

	builder.Query(query)

	data, err := r.client.Search().SearchSource(builder).Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to search tags")
	}

	for _, hit := range data.Hits.Hits {

		if strings.Contains(hit.Index, SeriesIndexName) {
			result, err := r.unmarshalSeriesDocument(ctx, hit.Source, nil)

			if err != nil {
				return nil, err
			}

			results = append(results, result)
		}

		if strings.Contains(hit.Index, CharacterIndexName) {
			result, err := r.unmarshalCharacterDocument(ctx, hit.Source, nil)

			if err != nil {
				return nil, err
			}

			results = append(results, result)
		}

		if strings.Contains(hit.Index, CategoryIndexName) {
			result, err := r.unmarshalCategoryDocument(ctx, hit.Source, nil)

			if err != nil {
				return nil, err
			}

			results = append(results, result)
		}
	}

	return results, nil
}
