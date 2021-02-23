package server

import (
	"context"
	"os"
	"testing"

	"github.com/scylladb/gocqlx/v2"
	"overdoll/libraries/testing/scylla"
)

// Init - Create a database session to use for testing, and create a keyspace, as well as running migrations
func Init(t *testing.T) (gocqlx.Session, context.Context, *Server) {
	session := scylla.CreateScyllaSession(t, os.Getenv("SCYLLA_DATABASE"), "eva")

	ctx := context.Background()

	srv, err := NewServer(ctx, session)

	if err != nil {
		t.Fatal("server error: ", err)
	}

	err = session.ExecStmt(`CREATE KEYSPACE IF NOT EXISTS eva WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}`)

	if err != nil {
		t.Fatal("create keyspace:", err)
	}

	return session, ctx, srv
}
