package adapters

import (
	"context"

	"github.com/ThreeDotsLabs/watermill/components/cqrs"
	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/ksuid"
)

type PostEventRepository struct {
	commandBus *cqrs.CommandBus
	eventBus   *cqrs.EventBus
}

func NewPostEventRepository(commandBus *cqrs.CommandBus, eventBus *cqrs.EventBus) PostEventRepository {
	return PostEventRepository{commandBus: commandBus, eventBus: eventBus}
}

func (r PostEventRepository) PostCompleted(ctx context.Context, pending *post.PostPending) error {

	if err := r.eventBus.Publish(ctx, &sting.PostCompleted{Id: pending.ID().String()}); err != nil {
		return err
	}

	return nil
}

func (r PostEventRepository) PostCreated(ctx context.Context, pendingPost *post.PostPending) error {

	if err := r.eventBus.Publish(ctx, &sting.PostCreated{Post: &sting.Post{
		Id:            ksuid.New().String(),
		ArtistId:      pendingPost.ArtistId(),
		ContributorId: pendingPost.ContributorId().String(),
		Content:       pendingPost.Content(),
		Categories:    ksuid.ToStringArray(pendingPost.Categories()),
		Characters:    ksuid.ToStringArray(pendingPost.Characters()),
	}}); err != nil {
		return err
	}

	return nil
}
