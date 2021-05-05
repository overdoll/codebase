package bootstrap

import (
	"context"
	"log"
	"path"

	"github.com/joho/godotenv"
	"overdoll/libraries/helpers"
)

type Bootstrap struct {
	context   context.Context
	directory string
}

func NewBootstrap(ctx context.Context) (Bootstrap, error) {

	dir, err := helpers.GetBinaryDirectory()

	if err != nil {
		log.Fatal("error loading directory")
	}

	directory := path.Dir(*dir)

	err = godotenv.Load(directory + "/.env")

	if err != nil {
		log.Fatal("error loading .env file")
	}

	return Bootstrap{
		context:   ctx,
		directory: directory,
	}, nil
}

func (b Bootstrap) GetCurrentDirectory() string {
	return b.directory
}