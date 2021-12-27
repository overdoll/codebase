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
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/scan"
)

type clubDocument struct {
	Id             string            `json:"id"`
	Slug           string            `json:"slug"`
	Thumbnail      string            `json:"thumbnail"`
	Name           map[string]string `json:"name"`
	CreatedAt      string            `json:"created_at"`
	MembersCount   int               `json:"members_count"`
	OwnerAccountId string            `json:"owner_account_id"`
}

const clubsIndexProperties = `
{
	"id": {
		"type": "keyword"
	},
	"slug": {
		"type": "keyword"
	},
	"thumbnail": {
		"type": "keyword"
	},
	"name": ` + localization.ESIndex + `,
    "members_count": {
		"type": "int"
	},
    "owner_account_id": {
		"type": "keyword"
	},
	"created_at": {
		"type": "date"
	}
}
`

const clubsIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties":` + clubsIndexProperties + `
	}
}`

const clubsIndexName = "clubs"

func marshalClubToDocument(cat *post.Club) (*clubDocument, error) {

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

	return &clubDocument{
		Id:             cat.ID(),
		Slug:           cat.Slug(),
		Thumbnail:      thumbnail,
		Name:           localization.MarshalTranslationToDatabase(cat.Name()),
		CreatedAt:      strconv.FormatInt(parse.Time().Unix(), 10),
		MembersCount:   cat.MembersCount(),
		OwnerAccountId: cat.OwnerAccountId(),
	}, nil
}

func (r PostsIndexElasticSearchRepository) IndexClub(ctx context.Context, club *post.Club) error {

	clb, err := marshalClubToDocument(club)

	if err != nil {
		return err
	}

	_, err = r.client.
		Index().
		Index(clubsIndexName).
		Id(clb.Id).
		BodyJson(*clb).
		Do(ctx)

	if err != nil {
		return fmt.Errorf("failed to index club: %v", err)
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) SearchClubs(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post.ObjectFilters) ([]*post.Club, error) {

	builder := r.client.Search().
		Index(clubsIndexName)

	if cursor == nil {
		return nil, errors.New("cursor required")
	}

	query := cursor.BuildElasticsearch(builder, "created_at")

	if filter.Search() != nil {
		query.Must(
			elastic.
				NewMultiMatchQuery(*filter.Search(), localization.GetESSearchFields("name")...).
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
		return nil, fmt.Errorf("failed search brands: %v", err)
	}

	var brands []*post.Club

	for _, hit := range response.Hits.Hits {

		var bd clubDocument

		err := json.Unmarshal(hit.Source, &bd)

		if err != nil {
			return nil, fmt.Errorf("failed search medias - unmarshal: %v", err)
		}

		newBrand := post.UnmarshalClubFromDatabase(bd.Id, bd.Slug, bd.Name, bd.Thumbnail, bd.MembersCount, bd.OwnerAccountId)
		newBrand.Node = paging.NewNode(bd.CreatedAt)

		brands = append(brands, newBrand)
	}

	return brands, nil
}

func (r PostsIndexElasticSearchRepository) IndexAllClubs(ctx context.Context) error {

	scanner := scan.New(r.session,
		scan.Config{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, clubTable, func(iter *gocqlx.Iterx) error {

		var m club

		for iter.StructScan(&m) {

			parse, err := ksuid.Parse(m.Id)

			if err != nil {
				return err
			}

			doc := clubDocument{
				Id:        m.Id,
				Slug:      m.Slug,
				Thumbnail: m.Thumbnail,
				Name:      m.Name,
				CreatedAt: strconv.FormatInt(parse.Time().Unix(), 10),
			}

			_, err = r.client.
				Index().
				Index(clubsIndexName).
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

func (r PostsIndexElasticSearchRepository) DeleteClubsIndex(ctx context.Context) error {

	exists, err := r.client.IndexExists(clubsIndexName).Do(ctx)

	if err != nil {
		return err
	}

	if exists {
		if _, err := r.client.DeleteIndex(clubsIndexName).Do(ctx); err != nil {
			// Handle error
			return err
		}
	}

	if _, err := r.client.CreateIndex(clubsIndexName).BodyString(clubsIndex).Do(ctx); err != nil {
		return err
	}

	return nil
}
