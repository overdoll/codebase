package adapters

import (
	"context"

	"github.com/ThreeDotsLabs/watermill/components/cqrs"
	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/domain/character"
)

type CharacterEventRepository struct {
	commandBus *cqrs.CommandBus
	eventBus   *cqrs.EventBus
}

func NewCharacterEventRepository(commandBus *cqrs.CommandBus, eventBus *cqrs.EventBus) CharacterEventRepository {
	return CharacterEventRepository{commandBus: commandBus, eventBus: eventBus}
}

func (r CharacterEventRepository) CharactersCreated(ctx context.Context, chars []*character.Character) error {

	var characters []*sting.Character

	for _, char := range chars {

		m := char.Media()

		characters = append(characters, &sting.Character{Id: char.ID().String(), Name: char.Name(), Thumbnail: char.Thumbnail(), Media: &sting.Media{
			Id:        m.ID().String(),
			Title:     m.Title(),
			Thumbnail: m.Thumbnail(),
		}})
	}

	if err := r.commandBus.Send(ctx, characters); err != nil {
		return err
	}

	return nil
}

func (r CharacterEventRepository) MediaCreated(ctx context.Context, medi []*character.Media) error {

	var media []*sting.Media

	for _, med := range medi {
		media = append(media, &sting.Media{Id: med.ID().String(), Title: med.Title(), Thumbnail: med.Thumbnail()})
	}

	if err := r.commandBus.Send(ctx, media); err != nil {
		return err
	}

	return nil
}
