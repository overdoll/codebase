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
		ContributorId: pendingPost.Contributor().Id.String(),
		Content:       pendingPost.Content(),
		Categories:    ksuid.ToStringArray(pendingPost.CategoryIds()),
		Characters:    ksuid.ToStringArray(pendingPost.CharacterIds()),
	}}); err != nil {
		return err
	}

	return nil
}

func (r PostEventRepository) PostPendingUpdated(ctx context.Context, pendingPost *post.PostPending) error {

	characterRequests := make(map[string]string)

	for _, cr := range pendingPost.CharacterRequests() {
		characterRequests[cr.Name] = cr.Media
	}

	var categoryRequests []string

	for _, cr := range pendingPost.CategoryRequests() {
		categoryRequests = append(categoryRequests, cr.Title)
	}

	var mediaRequests []string

	for _, cr := range pendingPost.MediaRequests() {
		mediaRequests = append(mediaRequests, cr.Title)
	}

	if err := r.eventBus.Publish(ctx, &sting.PostPendingUpdated{Post: &sting.PendingPost{
		Id:                 pendingPost.ID().String(),
		ArtistId:           pendingPost.ArtistId(),
		ArtistUsername:     pendingPost.ArtistUsername(),
		ContributorId:      pendingPost.Contributor().Id.String(),
		Content:            pendingPost.Content(),
		Categories:         ksuid.ToStringArray(pendingPost.CategoryIds()),
		Characters:         ksuid.ToStringArray(pendingPost.CharacterIds()),
		CharacterRequests:  characterRequests,
		CategoriesRequests: categoryRequests,
		MediaRequests:      mediaRequests,
	}}); err != nil {
		return err
	}

	return nil
}

func (r PostEventRepository) CategoriesCreated(ctx context.Context, cats []*post.Category) error {

	var categories []*sting.Category

	for _, cat := range cats {
		categories = append(categories, &sting.Category{Id: cat.ID().String(), Title: cat.Title(), Thumbnail: cat.RawThumbnail()})
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

		characters = append(characters, &sting.Character{Id: char.ID().String(), Name: char.Name(), Thumbnail: char.Thumbnail(), Media: &sting.Media{
			Id:        m.ID().String(),
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
		media = append(media, &sting.Media{Id: med.ID().String(), Title: med.Title(), Thumbnail: med.RawThumbnail()})
	}

	if err := r.commandBus.Send(ctx, &sting.MediaCreated{Media: media}); err != nil {
		return err
	}

	return nil
}
