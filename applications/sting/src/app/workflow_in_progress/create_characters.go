package workflow

import (
	"context"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/domain/post"
)

type CreateCharactersHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewCreateCharacterHandler(pr post.Repository, pi post.IndexRepository) CreateCharactersHandler {
	return CreateCharactersHandler{pr: pr, pi: pi}
}

func (h CreateCharactersHandler) HandlerName() string {
	return "CreateCategoryHandler"
}

func (h CreateCharactersHandler) NewCommand() interface{} {
	return &sting.CharacterCreated{}
}

func (h CreateCharactersHandler) Handle(ctx context.Context, c interface{}) error {
	cmd := c.(*sting.CharacterCreated)

	characters, err := post.UnmarshalCharacterFromProtoArray(cmd.Characters)

	if err != nil {
		return err
	}

	// Create characters (from database)
	err = h.pr.CreateCharacters(ctx, characters)

	if err != nil {
		return err
	}

	// Bulk index
	err = h.pi.BulkIndexCharacters(ctx, characters)

	if err != nil {
		return err
	}

	return nil
}
