package adapters

import (
	"context"
	"encoding/json"
	"go.uber.org/zap"
	"overdoll/libraries/cache"
	"overdoll/libraries/database"
	"overdoll/libraries/errors"
	"overdoll/libraries/resource"
	"overdoll/libraries/support"
	"time"

	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type topicDocument struct {
	Id             string            `json:"id"`
	Slug           string            `json:"slug"`
	BannerResource string            `json:"banner_resource"`
	Title          map[string]string `json:"title"`
	Description    map[string]string `json:"description"`
	CreatedAt      time.Time         `json:"created_at"`
	UpdatedAt      time.Time         `json:"updated_at"`
	Weight         int               `json:"weight"`
}

const TopicIndexName = "topics"

var TopicReaderIndex = cache.ReadAlias(CachePrefix, TopicIndexName)
var topicWriterIndex = cache.WriteAlias(CachePrefix, TopicIndexName)

func marshalTopicToDocument(topic *post.Topic) (*topicDocument, error) {

	marshalledBanner, err := resource.MarshalResourceToDatabase(topic.BannerResource())

	if err != nil {
		return nil, err
	}

	return &topicDocument{
		Id:             topic.ID(),
		Slug:           topic.Slug(),
		BannerResource: marshalledBanner,
		Title:          localization.MarshalTranslationToDatabase(topic.Title()),
		Description:    localization.MarshalTranslationToDatabase(topic.Description()),
		CreatedAt:      topic.CreatedAt(),
		UpdatedAt:      topic.UpdatedAt(),
		Weight:         topic.Weight(),
	}, nil
}

func (r PostsCassandraElasticsearchRepository) unmarshalTopicDocument(ctx context.Context, hit *elastic.SearchHit) (*post.Topic, error) {

	var topic topicDocument

	err := json.Unmarshal(hit.Source, &topic)

	if err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal topic document")
	}

	unmarshalledBanner, err := r.resourceSerializer.UnmarshalResourceFromDatabase(ctx, topic.BannerResource)

	if err != nil {
		return nil, err
	}

	newTopic := post.UnmarshalTopicFromDatabase(
		topic.Id,
		topic.Slug,
		topic.Title,
		topic.Description,
		unmarshalledBanner,
		topic.Weight,
		topic.CreatedAt,
		topic.UpdatedAt,
	)
	newTopic.Node = paging.NewNode(hit.Sort)

	return newTopic, nil
}

func (r PostsCassandraElasticsearchRepository) indexTopic(ctx context.Context, topic *post.Topic) error {

	cat, err := marshalTopicToDocument(topic)

	if err != nil {
		return err
	}

	_, err = r.client.
		Index().
		Index(topicWriterIndex).
		Id(topic.ID()).
		BodyJson(cat).
		Do(ctx)

	if err != nil {
		return errors.Wrap(support.ParseElasticError(err), "failed to index topic")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) GetTopicsByIds(ctx context.Context, topicIds []string) ([]*post.Topic, error) {

	var topics []*post.Topic

	if len(topicIds) == 0 {
		return topics, nil
	}

	response, err := r.client.Search().
		Index(TopicReaderIndex).
		Query(elastic.NewBoolQuery().Filter(elastic.NewTermsQueryFromStrings("id", topicIds...))).
		Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed search topics")
	}

	for _, hit := range response.Hits.Hits {

		result, err := r.unmarshalTopicDocument(ctx, hit)

		if err != nil {
			return nil, err
		}

		topics = append(topics, result)
	}

	return topics, nil
}

func (r PostsCassandraElasticsearchRepository) SearchTopics(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor) ([]*post.Topic, error) {

	builder := r.client.Search().
		Index(TopicReaderIndex).ErrorTrace(true)

	if cursor == nil {
		return nil, paging.ErrCursorNotPresent
	}

	if err := cursor.BuildElasticsearch(builder, "weight", "id", false); err != nil {
		return nil, err
	}

	query := elastic.NewBoolQuery()

	builder.Query(query)

	response, err := builder.Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to search topics")
	}

	var topics []*post.Topic

	for _, hit := range response.Hits.Hits {

		newCategory, err := r.unmarshalTopicDocument(ctx, hit)

		if err != nil {
			return nil, err
		}

		topics = append(topics, newCategory)
	}

	return topics, nil
}

func (r PostsCassandraElasticsearchRepository) IndexAllTopics(ctx context.Context) error {

	scanner := database.NewScan(r.session,
		database.ScanConfig{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, categoryTable, func(iter *gocqlx.Iterx) error {

		var c topics

		for iter.StructScan(&c) {

			unmarshalled, err := r.unmarshalTopicFromDatabase(ctx, &c)

			if err != nil {
				return err
			}

			marshalled, err := marshalTopicToDocument(unmarshalled)

			if err != nil {
				return err
			}

			_, err = r.client.
				Index().
				Index(topicWriterIndex).
				Id(marshalled.Id).
				OpType("create").
				BodyJson(marshalled).
				Do(ctx)

			if err != nil {
				e, ok := err.(*elastic.Error)
				if ok && e.Details.Type == "version_conflict_engine_exception" {
					zap.S().Infof("skipping document [%s] due to conflict", marshalled.Id)
				} else {
					return errors.Wrap(support.ParseElasticError(err), "failed to index topics")
				}
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}
