package search

import (
	"bytes"
	"context"
	"encoding/json"
	"log"
	"sync/atomic"
	"time"

	"github.com/dustin/go-humanize"
	"github.com/elastic/go-elasticsearch/v7/esutil"
)

type BulkStats struct {
	count uint64
	start time.Time
}

type Bulk struct {
	indexer esutil.BulkIndexer
	stats   *BulkStats
}

// CreateBulkIndex - create a bulk index
func (s *Store) CreateBulkIndex(index string) error {

	bi, err := esutil.NewBulkIndexer(esutil.BulkIndexerConfig{
		Index:         index,            // The default index name
		Client:        s.es,             // The Elasticsearch client
		NumWorkers:    5,                // The number of worker goroutines
		FlushInterval: 30 * time.Second, // The periodic flush interval
	})

	if err != nil {
		return err
	}

	s.bulk.indexer = bi

	s.bulk.stats = &BulkStats{
		count: 0,
		start: time.Now().UTC(),
	}

	return nil
}

// CreateBulkIndex - create a bulk index
func (s *Store) AddToBulkIndex(id string, data interface{}) error {

	dat, err := json.Marshal(data)

	if err != nil {
		log.Fatalf("cannot encode character %s: %s", id, err)
	}

	err = s.bulk.indexer.Add(
		context.Background(),
		esutil.BulkIndexerItem{
			// Action field configures the operation to perform (index, create, delete, update)
			Action: "index",

			// DocumentID is the (optional) document ID
			DocumentID: id,

			// Body is an `io.Reader` with the payload
			Body: bytes.NewReader(dat),

			// OnSuccess is called for each successful operation
			OnSuccess: func(ctx context.Context, item esutil.BulkIndexerItem, res esutil.BulkIndexerResponseItem) {
				atomic.AddUint64(&s.bulk.stats.count, 1)
			},

			// OnFailure is called for each failed operation
			OnFailure: func(ctx context.Context, item esutil.BulkIndexerItem, res esutil.BulkIndexerResponseItem, err error) {
				if err != nil {
					log.Printf("ERROR: %s", err)
				} else {
					log.Printf("ERROR: %s: %s", res.Error.Type, res.Error.Reason)
				}
			},
		},
	)

	if err != nil {
		return err
	}

	return nil
}

// CloseBulkIndex - will close the bulk index, gather some stats
func (s *Store) CloseBulkIndex() error {

	if err := s.bulk.indexer.Close(context.Background()); err != nil {
		return err
	}

	biStats := s.bulk.indexer.Stats()

	dur := time.Since(s.bulk.stats.start)

	if biStats.NumFailed > 0 {
		log.Fatalf(
			"indexed [%s] documents with [%s] errors in %s (%s docs/sec)",
			humanize.Comma(int64(biStats.NumFlushed)),
			humanize.Comma(int64(biStats.NumFailed)),
			dur.Truncate(time.Millisecond),
			humanize.Comma(int64(1000.0/float64(dur/time.Millisecond)*float64(biStats.NumFlushed))),
		)
	} else {
		log.Printf(
			"sucessfuly indexed [%s] documents in %s (%s docs/sec)",
			humanize.Comma(int64(biStats.NumFlushed)),
			dur.Truncate(time.Millisecond),
			humanize.Comma(int64(1000.0/float64(dur/time.Millisecond)*float64(biStats.NumFlushed))),
		)
	}

	return nil
}
