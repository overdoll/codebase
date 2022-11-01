package post

import "overdoll/libraries/uuid"

type CharacterRequest struct {
	id   string
	name string
}

func NewCharacterRequest(name string) (*CharacterRequest, error) {
	return &CharacterRequest{
		id:   uuid.New().String(),
		name: name,
	}, nil
}

func (c *CharacterRequest) Name() string {
	return c.name
}

func (c *CharacterRequest) ID() string {
	return c.id
}

func UnmarshalCharacterRequestFromDatabase(id, name string) *CharacterRequest {
	return &CharacterRequest{name: name, id: id}
}
