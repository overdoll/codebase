package uuid

import (
	"github.com/segmentio/ksuid"
	"time"
)

// type is here so we can add any custom functions in the future or if we change UUID type

type UUID struct {
	ksuid.KSUID
}

func New() UUID {
	p := ksuid.New()
	return UUID{p}
}

func NewRandomWithTime(time time.Time) (UUID, error) {
	k, err := ksuid.NewRandomWithTime(time)
	if err != nil {
		return UUID{}, err
	}
	return UUID{k}, nil
}

func Parse(s string) (UUID, error) {
	k, err := ksuid.Parse(s)
	if err != nil {
		return UUID{}, err
	}
	return UUID{k}, nil
}
