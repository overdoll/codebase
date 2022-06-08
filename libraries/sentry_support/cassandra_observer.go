package sentry_support

import (
	"context"
	"fmt"
	"github.com/getsentry/sentry-go"
	"github.com/gocql/gocql"
)

type QueryObserver struct {
}

func (q *QueryObserver) ObserveQuery(ctx context.Context, observed gocql.ObservedQuery) {
	if hub := sentry.GetHubFromContext(ctx); hub != nil {

		level := "info"
		if observed.Err != nil {
			level = "error"
		}
		hub.Scope().AddBreadcrumb(&sentry.Breadcrumb{
			Type:     "query",
			Category: "cassandra.query",
			Message:  fmt.Sprintf("%s took %s", observed.Statement, observed.End.Sub(observed.Start).String()),
			Level:    sentry.Level(level),
		}, 10)
	}
}

type BatchObserver struct {
}

func (q *BatchObserver) ObserveBatch(ctx context.Context, observed gocql.ObservedBatch) {
	if hub := sentry.GetHubFromContext(ctx); hub != nil {
		level := "info"
		if observed.Err != nil {
			level = "error"
		}

		totalTime := observed.End.Sub(observed.Start).String()

		msg := ""

		if len(observed.Statements) > 1 {
			msg = fmt.Sprintf("%s + %s more took %s", observed.Statements[0], len(observed.Statements)-1, totalTime)
		} else {
			msg = fmt.Sprintf("%s took %s", observed.Statements[0], totalTime)
		}

		hub.Scope().AddBreadcrumb(&sentry.Breadcrumb{
			Type:     "query",
			Category: "cassandra.batch",
			Message:  msg,
			Level:    sentry.Level(level),
		}, 10)
	}
}
