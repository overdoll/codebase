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

	// Go through each requested resource, and add it to our list of Ids so that they can be passed later on consumption
	var ids []string

	for _, char := range pending.CharacterRequests() {
		ids = append(ids, char.Id)
	}

	for _, med := range pending.MediaRequests() {
		ids = append(ids, med.Id)
	}

	for _, cat := range pending.CategoryRequests() {
		ids = append(ids, cat.Id)
	}

	if err := r.eventBus.Publish(ctx, &sting.PostCompleted{PostId: pending.ID(), GeneratedIds: ids}); err != nil {
		return err
	}

	return nil
}

func (r PostEventRepository) PostCreated(ctx context.Context, pendingPost *post.PostPending) error {

	if err := r.eventBus.Publish(ctx, &sting.PostCreated{Post: &sting.Post{
		Id:            ksuid.New().String(),
		ArtistId:      pendingPost.Artist().ID(),
		ContributorId: pendingPost.Contributor().ID(),
		Content:       pendingPost.RawContent(),
		CategoryIds:   pendingPost.CategoryIds(),
		CharacterIds:  pendingPost.CharacterIds(),
	}}); err != nil {
		return err
	}

	return nil
}

func (r PostEventRepository) CategoriesCreated(ctx context.Context, cats []*post.Category) error {

	var categories []*sting.Category

	for _, cat := range cats {
		categories = append(categories, &sting.Category{Id: cat.ID(), Title: cat.Title(), Thumbnail: cat.RawThumbnail()})
	}

	if err := r.commandBus.Send(ctx, &sting.CategoryCreated{Categories: categories}); err != nil {
		return err
	}

	return nil
}

func (r PostEventRepository) CharactersCreated(ctx context.Context, chars []*post.Character) error {

	var characters []*sting.Character

	for _, char := range chars {

		m := char.Media()

		characters = append(characters, &sting.Character{Id: char.ID(), Name: char.Name(), Thumbnail: char.RawThumbnail(), Media: &sting.Media{
			Id:        m.ID(),
			Title:     m.Title(),
			Thumbnail: m.RawThumbnail(),
		}})
	}

	if err := r.commandBus.Send(ctx, &sting.CharacterCreated{Characters: characters}); err != nil {
		return err
	}

	return nil
}

func (r PostEventRepository) MediaCreated(ctx context.Context, medi []*post.Media) error {

	var media []*sting.Media

	for _, med := range medi {
		media = append(media, &sting.Media{Id: med.ID(), Title: med.Title(), Thumbnail: med.RawThumbnail()})
	}

	if err := r.commandBus.Send(ctx, &sting.MediaCreated{Media: media}); err != nil {
		return err
	}

	return nil
}
