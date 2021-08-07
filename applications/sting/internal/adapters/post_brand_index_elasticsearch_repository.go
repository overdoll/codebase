package adapters

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"strconv"

	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"github.com/segmentio/ksuid"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/scan"
)

type brandDocument struct {
	Id        string `json:"id"`
	Slug      string `json:"slug"`
	Thumbnail string `json:"thumbnail"`
	Name      string `json:"name"`
	CreatedAt string `json:"created_at"`
}

const brandsIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": {
			"id": {
				"type": "keyword"
			},
			"slug": {
				"type": "keyword"
			},
			"thumbnail": {
				"type": "keyword"
			},
			"name": {
				"type": "text",
				"analyzer": "english"
			},
			"created_at": {
				"type": "date"
			}
		}
	}
}`

const brandsIndexName = "brands"

func marshalBrandToDocument(cat *post.Brand) (*brandDocument, error) {

	parse, err := ksuid.Parse(cat.ID())

	if err != nil {
		return nil, err
	}

	var thumbnail string

	if cat.Thumbnail() != nil {

		thumbnail, err = cat.Thumbnail().MarshalResourceToDatabase()

		if err != nil {
			return nil, err
		}
	}

	return &brandDocument{
		Id:        cat.ID(),
		Slug:      cat.Slug(),
		Thumbnail: thumbnail,
		Name:      cat.Name(),
		CreatedAt: strconv.FormatInt(parse.Time().Unix(), 10),
	}, nil
}

func (r PostsIndexElasticSearchRepository) SearchBrands(ctx context.Context, cursor *paging.Cursor, search *string) ([]*post.Brand, error) {

	builder := r.client.Search().
		Index(brandsIndexName)

	if cursor == nil {
		return nil, errors.New("cursor required")
	}

	query := cursor.BuildElasticsearch(builder, "created_at")

	if search != nil {
		query.Must(elastic.NewMultiMatchQuery(*search, "name").Operator("and"))
	}

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, fmt.Errorf("failed search brands: %v", err)
	}

	var brands []*post.Brand

	for _, hit := range response.Hits.Hits {

		var bd brandDocument

		err := json.Unmarshal(hit.Source, &bd)

		if err != nil {
			return nil, fmt.Errorf("failed search medias - unmarshal: %v", err)
		}

		newBrand := post.UnmarshalBrandFromDatabase(bd.Id, bd.Slug, bd.Name, bd.Thumbnail)
		newBrand.Node = paging.NewNode(bd.CreatedAt)

		brands = append(brands, newBrand)
	}

	return brands, nil
}

func (r PostsIndexElasticSearchRepository) IndexAllBrands(ctx context.Context) error {

	scanner := scan.New(r.session,
		scan.Config{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, brandTable, func(iter *gocqlx.Iterx) error {

		var m brand

		for iter.StructScan(&m) {

			parse, err := ksuid.Parse(m.Id)

			if err != nil {
				return err
			}

			doc := brandDocument{
				Id:        m.Id,
				Slug:      m.Slug,
				Thumbnail: m.Thumbnail,
				Name:      m.Name,
				CreatedAt: strconv.FormatInt(parse.Time().Unix(), 10),
			}

			_, err = r.client.
				Index().
				Index(brandsIndexName).
				Id(m.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
				return fmt.Errorf("failed to index brands: %v", err)
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) DeleteBrandsIndex(ctx context.Context) error {

	exists, err := r.client.IndexExists(brandsIndexName).Do(ctx)

	if err != nil {
		return err
	}

	if exists {
		if _, err := r.client.DeleteIndex(brandsIndexName).Do(ctx); err != nil {
			// Handle error
			return err
		}
	}

	if _, err := r.client.CreateIndex(brandsIndexName).BodyString(brandsIndex).Do(ctx); err != nil {
		return err
	}

	return nil
}
