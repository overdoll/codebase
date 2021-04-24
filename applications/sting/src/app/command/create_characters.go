package command

import (
	"context"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/domain/character"
)

type CreateCharactersHandler struct {
	cr  character.Repository
	cir character.IndexRepository
}

func NewCreateCharacterHandler(cr character.Repository, cir character.IndexRepository) CreateCharactersHandler {
	return CreateCharactersHandler{cr: cr, cir: cir}
}

func (h CreateCharactersHandler) HandlerName() string {
	return "CreateCategoryHandler"
}

func (h CreateCharactersHandler) NewCommand() interface{} {
	return &sting.CharacterCreated{}
}

func (h CreateCharactersHandler) Handle(ctx context.Context, c interface{}) error {
	cmd := c.(*sting.CharacterCreated)

	characters, err := character.UnmarshalCharacterFromProtoArray(cmd.Characters)

	if err != nil {
		return err
	}

	// Create characters (from database)
	err = h.cr.CreateCharacters(ctx, characters)

	if err != nil {
		return err
	}

	// Bulk index
	err = h.cir.BulkIndexCharacters(ctx, characters)

	if err != nil {
		return err
	}

	return nil
}
