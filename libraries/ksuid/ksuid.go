package ksuid

import (
	"github.com/gocql/gocql"
	"github.com/segmentio/ksuid"
)

// Wrappers for UUID to be KSUID, so we can unmarshal and marshal the types correctly with gocql

type UUID struct {
	ksuid.KSUID
}

func (n UUID) MarshalCQL(info gocql.TypeInfo) ([]byte, error) {
	return []byte(n.String()), nil
}

func (n *UUID) UnmarshalCQL(info gocql.TypeInfo, data []byte) error {

	var s string

	err := gocql.Unmarshal(info, data, &s)

	if err != nil {
		return err
	}

	id, err := ksuid.Parse(s)

	if err != nil {
		return err
	}

	n = &UUID{id}

	return nil
}

func Parse(s string) (UUID, error) {
	p, err := ksuid.Parse(s)

	return UUID{p}, err
}

func New() UUID {
	p := ksuid.New()
	return UUID{p}
}

func ToStringArray(ids []UUID) []string {
	var strings []string

	for _, id := range ids {
		strings = append(strings, id.String())
	}

	return strings
}