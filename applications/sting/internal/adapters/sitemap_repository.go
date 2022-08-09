package adapters

import (
	"bytes"
	"context"
	"encoding/json"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/ikeikeikeike/go-sitemap-generator/v2/stm"
	"github.com/olivere/elastic/v7"
	"io"
	"io/ioutil"
	"log"
	"os"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/errors"
	"overdoll/libraries/support"
)

func init() {
	// disable useless logging
	log.SetOutput(ioutil.Discard)
}

const (
	pagingLimit = 100
)

func (r PostsCassandraElasticsearchRepository) addPosts(ctx context.Context, sm *stm.Sitemap) error {

	pointInTime, err := r.createPointInTime(ctx, PostReaderIndex)

	if err != nil {
		return err
	}

	suspendedClubIds, err := r.getTerminatedClubIds(ctx)

	if err != nil {
		return err
	}

	query := elastic.NewBoolQuery()

	var filterQueries []elastic.Query
	filterQueries = append(filterQueries, elastic.NewBoolQuery().MustNot(elastic.NewTermsQueryFromStrings("club_id", suspendedClubIds...)))
	filterQueries = append(filterQueries, elastic.NewTermQuery("state", post.Published.String()))

	query.Filter(filterQueries...)

	var searchAfter []interface{}

	// first, go through all posts and get all clubs associated with posts to generate the sitemap
	for {
		builder := r.client.Search()

		builder.Size(pagingLimit)
		builder.Sort("id", false)

		if len(searchAfter) > 0 {
			builder.SearchAfter(searchAfter...)
		}

		builder.PointInTime(elastic.NewPointInTime(pointInTime))
		builder.Query(query)

		response, err := builder.Do(ctx)

		if err != nil {
			return err
		}

		if len(response.Hits.Hits) == 0 {
			break
		}

		var clubIds []string

		for index, result := range response.Hits.Hits {
			if index == len(response.Hits.Hits)-1 {
				// reached end - take sort
				searchAfter = result.Sort
			}

			var pst postDocument

			if err := json.Unmarshal(result.Source, &pst); err != nil {
				return err
			}

			clubIds = append(clubIds, pst.ClubId)
		}

		clubBuilder := r.client.MultiGet().Realtime(false)

		for _, clubId := range clubIds {
			clubBuilder.Add(elastic.NewMultiGetItem().Id(clubId).Index(ClubsReaderIndex))
		}

		clubResponse, err := clubBuilder.Do(ctx)

		if err != nil {
			return errors.Wrap(support.ParseElasticError(err), "failed to get clubs")
		}

		clubMap := make(map[string]clubDocument)

		for _, clubs := range clubResponse.Docs {
			var bd clubDocument

			if err := json.Unmarshal(clubs.Source, &bd); err != nil {
				return err
			}

			clubMap[bd.Id] = bd
		}

		for _, result := range response.Hits.Hits {

			var pst postDocument

			if err := json.Unmarshal(result.Source, &pst); err != nil {
				return err
			}

			club := clubMap[pst.ClubId]

			clubUrl := "/" + club.Slug + "/post/" + pst.Id

			// add the post URL to the sitemap
			sm.Add(stm.URL{{"loc", clubUrl}, {"changefreq", nil}, {"priority", nil}, {"lastmod", nil}})
		}
	}

	if err := r.closePointInTime(ctx, pointInTime); err != nil {
		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) addClubs(ctx context.Context, sm *stm.Sitemap) error {

	pointInTime, err := r.createPointInTime(ctx, ClubsReaderIndex)

	if err != nil {
		return err
	}

	var searchAfter []interface{}

	// go through all the clubs
	for {
		builder := r.client.Search()

		builder.Size(pagingLimit)
		builder.Sort("id", false)

		if len(searchAfter) > 0 {
			builder.SearchAfter(searchAfter...)
		}

		query := elastic.NewBoolQuery()

		var filterQueries []elastic.Query
		filterQueries = append(filterQueries, elastic.NewTermQuery("terminated", "false"))

		query.Filter(filterQueries...)

		builder.PointInTime(elastic.NewPointInTime(pointInTime))
		builder.Query(query)

		response, err := builder.Do(ctx)

		if err != nil {
			return err
		}

		if len(response.Hits.Hits) == 0 {
			break
		}

		for index, result := range response.Hits.Hits {
			if index == len(response.Hits.Hits)-1 {
				// reached end - take sort
				searchAfter = result.Sort
			}

			var clb clubDocument

			if err := json.Unmarshal(result.Source, &clb); err != nil {
				return err
			}

			clubUrl := "/" + clb.Slug

			sm.Add(stm.URL{{"loc", clubUrl}, {"changefreq", nil}, {"priority", nil}, {"lastmod", nil}})
		}
	}

	if err := r.closePointInTime(ctx, pointInTime); err != nil {
		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) addCategories(ctx context.Context, sm *stm.Sitemap) error {

	pointInTime, err := r.createPointInTime(ctx, CategoryReaderIndex)

	if err != nil {
		return err
	}

	var searchAfter []interface{}

	// go through all categories
	for {
		builder := r.client.Search().Query(elastic.NewRangeQuery("total_posts").Gt(0))

		builder.Size(pagingLimit)
		builder.Sort("id", false)

		if len(searchAfter) > 0 {
			builder.SearchAfter(searchAfter...)
		}

		builder.PointInTime(elastic.NewPointInTime(pointInTime))

		response, err := builder.Do(ctx)

		if err != nil {
			return err
		}

		if len(response.Hits.Hits) == 0 {
			break
		}

		for index, result := range response.Hits.Hits {
			if index == len(response.Hits.Hits)-1 {
				// reached end - take sort
				searchAfter = result.Sort
			}

			var category categoryDocument

			if err := json.Unmarshal(result.Source, &category); err != nil {
				return err
			}

			categoryUrl := "/search/category/" + category.Slug
			sm.Add(stm.URL{{"loc", categoryUrl}, {"changefreq", nil}, {"priority", nil}, {"lastmod", nil}})
		}
	}

	if err := r.closePointInTime(ctx, pointInTime); err != nil {
		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) addCharacters(ctx context.Context, sm *stm.Sitemap) error {

	pointInTime, err := r.createPointInTime(ctx, CharacterReaderIndex)

	if err != nil {
		return err
	}

	var searchAfter []interface{}

	// go through all characters
	for {
		builder := r.client.Search().Query(elastic.NewRangeQuery("total_posts").Gt(0))

		builder.Size(pagingLimit)
		builder.Sort("id", false)

		if len(searchAfter) > 0 {
			builder.SearchAfter(searchAfter...)
		}

		builder.PointInTime(elastic.NewPointInTime(pointInTime))

		response, err := builder.Do(ctx)

		if err != nil {
			return err
		}

		if len(response.Hits.Hits) == 0 {
			break
		}

		var clubIds []string

		for index, result := range response.Hits.Hits {
			if index == len(response.Hits.Hits)-1 {
				// reached end - take sort
				searchAfter = result.Sort
			}

			var character characterDocument

			if err := json.Unmarshal(result.Source, &character); err != nil {
				return err
			}

			if character.ClubId != nil {
				clubIds = append(clubIds, *character.ClubId)
			}
		}

		clubMap := make(map[string]clubDocument)

		if len(clubIds) > 0 {
			clubBuilder := r.client.MultiGet().Realtime(false)

			for _, clubId := range clubIds {
				clubBuilder.Add(elastic.NewMultiGetItem().Id(clubId).Index(ClubsReaderIndex))
			}

			clubResponse, err := clubBuilder.Do(ctx)

			if err != nil {
				return errors.Wrap(support.ParseElasticError(err), "failed to get clubs")
			}

			for _, clubs := range clubResponse.Docs {
				var bd clubDocument

				if err := json.Unmarshal(clubs.Source, &bd); err != nil {
					return err
				}

				clubMap[bd.Id] = bd
			}
		}

		for _, result := range response.Hits.Hits {

			var pst characterDocument

			if err := json.Unmarshal(result.Source, &pst); err != nil {
				return err
			}

			if pst.ClubId != nil {
				club := clubMap[*pst.ClubId]
				clubUrl := "/" + club.Slug + "/characters/" + pst.Slug
				// add the post URL to the sitemap
				sm.Add(stm.URL{{"loc", clubUrl}, {"changefreq", nil}, {"priority", nil}, {"lastmod", nil}})
			} else {
				clubUrl := "/search/series/" + pst.Series.Slug + "/" + pst.Slug
				// add the post URL to the sitemap
				sm.Add(stm.URL{{"loc", clubUrl}, {"changefreq", nil}, {"priority", nil}, {"lastmod", nil}})
			}

		}
	}

	if err := r.closePointInTime(ctx, pointInTime); err != nil {
		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) addSeries(ctx context.Context, sm *stm.Sitemap) error {

	pointInTime, err := r.createPointInTime(ctx, SeriesReaderIndex)

	if err != nil {
		return err
	}

	var searchAfter []interface{}

	// go through all series
	for {
		builder := r.client.Search().Query(elastic.NewRangeQuery("total_posts").Gt(0))

		builder.Size(pagingLimit)
		builder.Sort("id", false)

		if len(searchAfter) > 0 {
			builder.SearchAfter(searchAfter...)
		}

		builder.PointInTime(elastic.NewPointInTime(pointInTime))

		response, err := builder.Do(ctx)

		if err != nil {
			return err
		}

		if len(response.Hits.Hits) == 0 {
			break
		}

		for index, result := range response.Hits.Hits {
			if index == len(response.Hits.Hits)-1 {
				// reached end - take sort
				searchAfter = result.Sort
			}

			var series seriesDocument

			if err := json.Unmarshal(result.Source, &series); err != nil {
				return err
			}

			seriesUrl := "/search/series/" + series.Slug
			sm.Add(stm.URL{{"loc", seriesUrl}, {"changefreq", nil}, {"priority", nil}, {"lastmod", nil}})
		}
	}

	if err := r.closePointInTime(ctx, pointInTime); err != nil {
		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) GenerateSitemap(ctx context.Context) error {

	sm := stm.NewSitemap(1)
	sm.SetDefaultHost(os.Getenv("APP_URL"))
	sm.SetSitemapsHost(os.Getenv("APP_URL"))
	//	sm.SetSitemapsHost(os.Getenv("STATIC_RESOURCES_URL"))
	sm.SetSitemapsPath("/sitemaps")
	sm.SetFilename("sitemap")
	sm.SetCompress(false)
	sm.SetVerbose(false)
	sm.SetAdapter(&s3Adapter{
		Bucket:  os.Getenv("STATIC_RESOURCES_BUCKET"),
		Session: r.aws,
	})

	// add the home page
	sm.Add(stm.URL{{"loc", "/"}, {"changefreq", nil}, {"priority", nil}, {"lastmod", nil}})
	// add the help page
	sm.Add(stm.URL{{"loc", "/help"}, {"changefreq", nil}, {"priority", nil}, {"lastmod", nil}})
	// add the join page
	sm.Add(stm.URL{{"loc", "/join"}, {"changefreq", nil}, {"priority", nil}, {"lastmod", nil}})

	sm.Create()

	if err := r.addPosts(ctx, sm); err != nil {
		return err
	}

	if err := r.addClubs(ctx, sm); err != nil {
		return err
	}

	if err := r.addCategories(ctx, sm); err != nil {
		return err
	}

	if err := r.addSeries(ctx, sm); err != nil {
		return err
	}

	if err := r.addCharacters(ctx, sm); err != nil {
		return err
	}

	sm.Finalize().PingSearchEngines()

	return nil
}

func (r PostsCassandraElasticsearchRepository) createPointInTime(ctx context.Context, index string) (string, error) {

	pointInTime := elastic.NewOpenPointInTimeService(r.client)
	pointInTime.KeepAlive("1m")
	pointInTime.Index(index)

	pitResponse, err := pointInTime.Do(ctx)

	if err != nil {
		return "", errors.Wrap(support.ParseElasticError(err), "failed to create PIT for categories")
	}

	return pitResponse.Id, nil
}

func (r PostsCassandraElasticsearchRepository) closePointInTime(ctx context.Context, id string) error {

	_, err := elastic.NewClosePointInTimeService(r.client).ID(id).Do(ctx)

	if err != nil {
		return errors.Wrap(support.ParseElasticError(err), "failed to close PIT for clubs")
	}

	return nil
}

type s3Adapter struct {
	Bucket  string
	Session *session.Session
}

// Bytes gets written content.
func (adp *s3Adapter) Bytes() [][]byte {
	return nil
}

// Write will create sitemap xml file into the s3.
func (adp *s3Adapter) Write(loc *stm.Location, data []byte) {
	var reader io.Reader = bytes.NewReader(data)

	uploader := s3manager.NewUploader(adp.Session)
	_, _ = uploader.Upload(&s3manager.UploadInput{
		Bucket:       aws.String(adp.Bucket),
		Key:          aws.String(loc.PathInPublic()),
		ContentType:  aws.String("application/xml"),
		Body:         reader,
		CacheControl: aws.String("max-age=0,no-cache,no-store"),
	})
}
