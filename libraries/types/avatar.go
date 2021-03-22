package types

import (
	"os"

	"github.com/gocql/gocql"
)

type Avatar struct {
	URL string
}

func (n Avatar) MarshalCQL(info gocql.TypeInfo) ([]byte, error) {
	return []byte(n.URL), nil
}

func (n *Avatar) UnmarshalCQL(info gocql.TypeInfo, data []byte) error {

	var staticURL = os.Getenv("STATIC_URL")

	var s string

	err := gocql.Unmarshal(info, data, &s)

	if err != nil {
		return err
	}

	// set the value to be the proper url when unmarshalling
	n.URL = staticURL + "/avatars/" + s

	return nil
}
