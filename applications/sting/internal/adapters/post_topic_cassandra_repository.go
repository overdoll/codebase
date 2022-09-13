package adapters

import (
	"context"
	"go.uber.org/zap"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/localization"
	"overdoll/libraries/media"
	"overdoll/libraries/support"
	"strings"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

var topicsTable = table.New(table.Metadata{
	Name: "topics",
	Columns: []string{
		"id",
		"slug",
		"title",
		"description",
		"banner_resource",
		"banner_media",
		"weight",
		"created_at",
		"updated_at",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type topics struct {
	Id             string            `db:"id"`
	Slug           string            `db:"slug"`
	Title          map[string]string `db:"title"`
	Description    map[string]string `db:"description"`
	BannerResource string            `db:"banner_resource"`
	BannerMedia    []byte            `db:"banner_media"`
	Weight         int               `db:"weight"`
	CreatedAt      time.Time         `db:"created_at"`
	UpdatedAt      time.Time         `db:"updated_at"`
}

var topicSlugTable = table.New(table.Metadata{
	Name: "topics_slugs",
	Columns: []string{
		"topic_id",
		"slug",
	},
	PartKey: []string{"slug"},
	SortKey: []string{},
})

type topicSlugs struct {
	TopicId string `db:"topic_id"`
	Slug    string `db:"slug"`
}

func marshalTopicToDatabase(pending *post.Topic) (*topics, error) {

	marshalledBanner, err := media.MarshalMediaToDatabase(pending.BannerMedia())

	if err != nil {
		return nil, err
	}

	var bannerResource string

	if pending.BannerMedia() != nil {
		bannerResource = pending.BannerMedia().LegacyResource()
	}

	return &topics{
		Id:             pending.ID(),
		Slug:           pending.Slug(),
		Title:          localization.MarshalTranslationToDatabase(pending.Title()),
		Description:    localization.MarshalTranslationToDatabase(pending.Description()),
		BannerMedia:    marshalledBanner,
		BannerResource: bannerResource,
		Weight:         pending.Weight(),
		CreatedAt:      pending.CreatedAt(),
		UpdatedAt:      pending.UpdatedAt(),
	}, nil
}

func (r PostsCassandraElasticsearchRepository) unmarshalTopicFromDatabase(ctx context.Context, cat *topics) (*post.Topic, error) {

	unmarshalledBanner, err := media.UnmarshalMediaWithLegacyResourceFromDatabase(ctx, cat.BannerResource, cat.BannerMedia)

	if err != nil {
		return nil, err
	}

	return post.UnmarshalTopicFromDatabase(
		cat.Id,
		cat.Slug,
		cat.Title,
		cat.Description,
		unmarshalledBanner,
		cat.Weight,
		cat.CreatedAt,
		cat.UpdatedAt,
	), nil
}

func (r PostsCassandraElasticsearchRepository) GetTopicBySlug(ctx context.Context, slug string) (*post.Topic, error) {

	var b topicSlugs

	if err := r.session.
		Query(topicSlugTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(topicSlugs{Slug: strings.ToLower(slug)}).
		GetRelease(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("topic", slug)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get topic by slug")
	}

	return r.GetTopicById(ctx, b.TopicId)
}

func (r PostsCassandraElasticsearchRepository) GetTopicById(ctx context.Context, topicId string) (*post.Topic, error) {
	return r.getTopicById(ctx, topicId)
}

func (r PostsCassandraElasticsearchRepository) deleteUniqueTopicSlug(ctx context.Context, topicId, slug string) error {

	if err := r.session.
		Query(topicSlugTable.DeleteBuilder().Existing().ToCql()).
		WithContext(ctx).
		Idempotent(true).
		BindStruct(topicSlugs{Slug: strings.ToLower(slug), TopicId: topicId}).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to release topic slug")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) CreateTopic(ctx context.Context, requester *principal.Principal, topic *post.Topic) error {

	marshalledTopic, err := marshalTopicToDatabase(topic)

	if err != nil {
		return err
	}

	// first, do a unique insert of club to ensure we reserve a unique slug
	applied, err := topicSlugTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		WithContext(ctx).
		SerialConsistency(gocql.Serial).
		BindStruct(topicSlugs{Slug: strings.ToLower(marshalledTopic.Slug), TopicId: marshalledTopic.Id}).
		ExecCASRelease()

	if err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to create unique topic slug")
	}

	if !applied {
		return post.ErrTopicSlugNotUnique
	}

	if err := r.session.
		Query(topicsTable.Insert()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalledTopic).
		ExecRelease(); err != nil {

		// release the slug
		if err := r.deleteUniqueTopicSlug(ctx, marshalledTopic.Id, marshalledTopic.Slug); err != nil {
			return err
		}

		return errors.Wrap(err, "failed to insert topic")
	}

	if err := r.indexTopic(ctx, topic); err != nil {

		// release the slug
		if err := r.deleteUniqueTopicSlug(ctx, marshalledTopic.Id, marshalledTopic.Slug); err != nil {
			return err
		}

		// failed to index topic - delete topic record
		if err := r.session.
			Query(topicsTable.Delete()).
			WithContext(ctx).
			Idempotent(true).
			Consistency(gocql.LocalQuorum).
			BindStruct(marshalledTopic).
			ExecRelease(); err != nil {
			return errors.Wrap(support.NewGocqlError(err), "failed to delete topic")
		}

		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) UpdateTopicSlug(ctx context.Context, id, slug string, keepOld bool) error {

	topic, err := r.getRawTopicById(ctx, id)

	if err != nil {
		return err
	}

	// first, do a unique insert of slug to ensure we reserve a unique slug
	applied, err := topicSlugTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		WithContext(ctx).
		SerialConsistency(gocql.Serial).
		BindStruct(topicSlugs{Slug: strings.ToLower(slug), TopicId: id}).
		ExecCASRelease()

	if err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to create unique topic slug")
	}

	if !applied {
		zap.S().Infow("slug already exists, will perform local update", zap.String("slug", slug))
	}

	if applied && !keepOld {
		if err := r.deleteUniqueTopicSlug(ctx, id, topic.Slug); err != nil {
			return err
		}
	}

	topic.Slug = slug

	if err := r.session.
		Query(topicsTable.Update("slug")).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(topic).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to update topic slug")
	}

	unmarshalled, err := r.unmarshalTopicFromDatabase(ctx, topic)

	if err != nil {
		return err
	}

	if err := r.indexTopic(ctx, unmarshalled); err != nil {
		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) updateTopic(ctx context.Context, id string, updateFn func(category *post.Topic) error, columns []string) (*post.Topic, error) {

	topic, err := r.getTopicById(ctx, id)

	if err != nil {
		return nil, err
	}

	if err = updateFn(topic); err != nil {
		return nil, err
	}

	pst, err := marshalTopicToDatabase(topic)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(topicsTable.Update(
			append(columns, "updated_at")...,
		)).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(pst).
		ExecRelease(); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to update topic")
	}

	if err := r.indexTopic(ctx, topic); err != nil {
		return nil, err
	}

	return topic, nil
}

func (r PostsCassandraElasticsearchRepository) UpdateTopicBanner(ctx context.Context, requester *principal.Principal, id string, updateFn func(topic *post.Topic) error) (*post.Topic, error) {
	return r.updateTopic(ctx, id, updateFn, []string{"banner_media"})
}

func (r PostsCassandraElasticsearchRepository) UpdateTopicBannerOperator(ctx context.Context, id string, updateFn func(topic *post.Topic) error) (*post.Topic, error) {
	return r.updateTopic(ctx, id, updateFn, []string{"banner_media"})
}

func (r PostsCassandraElasticsearchRepository) UpdateTopicTitle(ctx context.Context, requester *principal.Principal, id string, updateFn func(topic *post.Topic) error) (*post.Topic, error) {
	return r.updateTopic(ctx, id, updateFn, []string{"title"})
}

func (r PostsCassandraElasticsearchRepository) UpdateTopicDescription(ctx context.Context, requester *principal.Principal, id string, updateFn func(topic *post.Topic) error) (*post.Topic, error) {
	return r.updateTopic(ctx, id, updateFn, []string{"description"})
}

func (r PostsCassandraElasticsearchRepository) UpdateTopicWeight(ctx context.Context, requester *principal.Principal, id string, updateFn func(topic *post.Topic) error) (*post.Topic, error) {
	return r.updateTopic(ctx, id, updateFn, []string{"weight"})
}

func (r PostsCassandraElasticsearchRepository) getRawTopicById(ctx context.Context, topicId string) (*topics, error) {

	var topic topics

	if err := r.session.
		Query(topicsTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(topics{Id: topicId}).
		GetRelease(&topic); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("topic", topicId)
		}

		return nil, errors.Wrap(err, "failed to get topic by id")
	}

	return &topic, nil
}

func (r PostsCassandraElasticsearchRepository) getTopicById(ctx context.Context, topicId string) (*post.Topic, error) {

	topic, err := r.getRawTopicById(ctx, topicId)

	if err != nil {
		return nil, err
	}

	return r.unmarshalTopicFromDatabase(ctx, topic)
}
