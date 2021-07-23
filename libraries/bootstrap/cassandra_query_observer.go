package bootstrap

import (
	"context"
	"fmt"

	"github.com/gocql/gocql"
)

type hostMetrics struct {
	attempts int
	latency  int
}

// The observer type to watch the queries data
type CassandraQueryObserver struct {
	metrics map[string]*hostMetrics
	verbose bool
}

func NewCassandraQueryObserver() *CassandraQueryObserver {
	return &CassandraQueryObserver{
		metrics: make(map[string]*hostMetrics),
		verbose: true,
	}
}

func (o *CassandraQueryObserver) ObserveQuery(ctx context.Context, q gocql.ObservedQuery) {
	host := q.Host.ConnectAddress().String()

	curMetric := o.metrics[host]
	curAttempts := 0
	curLatency := 0
	if curMetric != nil {
		curAttempts = curMetric.attempts
		curLatency = curMetric.latency
	}
	if q.Err == nil {
		o.metrics[host] = &hostMetrics{attempts: q.Metrics.Attempts + curAttempts, latency: curLatency + int(q.Metrics.TotalLatency/1000000)}
	}
	if o.verbose {
		fmt.Printf("Observed query %q. Returned %v rows, took %v on host %q with %v attempts and total latency %v. Error: %q\n",
			q.Statement, q.Rows, q.End.Sub(q.Start), host, q.Metrics.Attempts, q.Metrics.TotalLatency, q.Err)
	}
}

func (o *CassandraQueryObserver) GetMetrics() {
	for h, m := range o.metrics {
		fmt.Printf("Host: %s, Attempts: %v, Avg Latency: %vms\n", h, m.attempts, m.latency/m.attempts)
	}
}
