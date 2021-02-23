package scylla

import (
	"testing"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
)

// CreateScyllaSession - Create a scylla session used for testing
func CreateScyllaSession(t *testing.T, host string, keyspace string) gocqlx.Session {

	cluster := gocql.NewCluster(host)
	cluster.Keyspace = keyspace

	session, err := gocqlx.WrapSession(cluster.CreateSession())

	if err != nil {
		t.Fatal("create session: ", err)
	}

	return session
}