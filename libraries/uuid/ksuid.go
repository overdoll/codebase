package uuid

import (
	"github.com/segmentio/ksuid"
)

// type is here so we can add any custom functions in the future or if we change UUID type

type UUID struct {
	ksuid.KSUID
}

func New() UUID {
	p := ksuid.New()
	return UUID{p}
}
