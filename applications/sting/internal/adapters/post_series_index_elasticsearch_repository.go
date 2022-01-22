package adapters

import (
	"context"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"github.com/segmentio/ksuid"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/scan"
)

type seriesDocument struct {
	Id                  string            `json:"id"`
	Slug                string            `json:"slug"`
	ThumbnailResourceId string            `json:"thumbnail_resource_id"`
	Title               map[string]string `json:"title"`
	CreatedAt           string            `json:"created_at"`
	TotalLikes          int               `json:"total_likes"`
	TotalPosts          int               `json:"total_posts"`
}

const seriesIndexProperties = `
{
	"id": {
		"type": "keyword"
	},
	"slug": {
		"type": "keyword"
	},
	"thumbnail_resource_id": {
		"type": "keyword"
	},
	"total_likes": {
		"type": "integer"
	},
	"total_posts": {
		"type": "integer"
	},
	"title":  ` + localization.ESIndex + `
	"created_at": {
		"type": "date"
	}
}
`

const seriesIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": ` + seriesIndexProperties + `
	}
}`

const SeriesIndexName = "series"

func marshalSeriesToDocument(s *post.Series) (*seriesDocument, error) {

	parse, err := ksuid.Parse(s.ID())

	if err != nil {
		return nil, err
	}

	return &seriesDocument{
		Id:                  s.ID(),
		Slug:                s.Slug(),
		ThumbnailResourceId: s.ThumbnailResourceId(),
		Title:               localization.MarshalTranslationToDatabase(s.Title()),
		CreatedAt:           strconv.FormatInt(parse.Time().Unix(), 10),
		TotalLikes:          s.TotalLikes(),
		TotalPosts:          s.TotalPosts(),
	}, nil
}

func (r PostsIndexElasticSearchRepository) SearchSeries(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post.ObjectFilters) ([]*post.Series, error) {

	builder := r.client.Search().
		Index(SeriesIndexName)

	if cursor == nil {
		return nil, fmt.Errorf("cursor must be present")
	}

	var sortingColumn string
	var sortingAscending bool

	if filter.SortBy() == post.NewSort {
		sortingColumn = "created_at"
		sortingAscending = false
	} else if filter.SortBy() == post.TopSort {
		sortingColumn = "total_likes"
		sortingAscending = false
	} else if filter.SortBy() == post.PopularSort {
		sortingColumn = "total_posts"
		sortingAscending = false
	}

	if err := cursor.BuildElasticsearch(builder, sortingColumn, "id", sortingAscending); err != nil {
		return nil, err
	}

	query := elastic.NewBoolQuery()

	if filter.Search() != nil {
		query.Must(
			elastic.
				NewMultiMatchQuery(*filter.Search(), localization.GetESSearchFields("title")...).
				Type("best_fields"),
		)
	}

	if len(filter.Slugs()) > 0 {
		for _, id := range filter.Slugs() {
			query.Filter(elastic.NewTermQuery("slug", id))
		}
	}

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, fmt.Errorf("failed search medias: %v", err)
	}

	var meds []*post.Series

	for _, hit := range response.Hits.Hits {

		var md seriesDocument

		err := json.Unmarshal(hit.Source, &md)

		if err != nil {
			return nil, fmt.Errorf("failed search medias - unmarshal: %v", err)
		}

		newMedia := post.UnmarshalSeriesFromDatabase(
			md.Id,
			md.Slug,
			md.Title,
			md.ThumbnailResourceId,
			md.TotalLikes,
			md.TotalPosts,
		)
		newMedia.Node = paging.NewNode(hit.Sort)

		meds = append(meds, newMedia)
	}

	return meds, nil
}

func (r PostsIndexElasticSearchRepository) IndexSeries(ctx context.Context, series *post.Series) error {

	ss, err := marshalSeriesToDocument(series)

	if err != nil {
		return err
	}

	_, err = r.client.
		Index().
		Index(SeriesIndexName).
		Id(series.ID()).
		BodyJson(ss).
		Do(ctx)

	if err != nil {
		return fmt.Errorf("failed to index series: %v", err)
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) IndexAllSeries(ctx context.Context) error {

	scanner := scan.New(r.session,
		scan.Config{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, seriesTable, func(iter *gocqlx.Iterx) error {

		var m series

		for iter.StructScan(&m) {

			parse, err := ksuid.Parse(m.Id)

			if err != nil {
				return err
			}

			doc := seriesDocument{
				Id:                  m.Id,
				Slug:                m.Slug,
				ThumbnailResourceId: m.ThumbnailResourceId,
				Title:               m.Title,
				CreatedAt:           strconv.FormatInt(parse.Time().Unix(), 10),
				TotalLikes:          m.TotalLikes,
			}

			_, err = r.client.
				Index().
				Index(SeriesIndexName).
				Id(m.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
				return fmt.Errorf("failed to index series: %v", err)
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) DeleteSeriesIndex(ctx context.Context) error {

	exists, err := r.client.IndexExists(SeriesIndexName).Do(ctx)

	if err != nil {
		return err
	}

	if exists {
		if _, err := r.client.DeleteIndex(SeriesIndexName).Do(ctx); err != nil {
			// Handle error
			return err
		}
	}

	if _, err := r.client.CreateIndex(SeriesIndexName).BodyString(seriesIndex).Do(ctx); err != nil {
		return err
	}

	return nil
}
