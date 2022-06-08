package support

import "github.com/gocql/gocql"

func MarkBatchIdempotent(batch *gocql.Batch) {
	for _, entry := range batch.Entries {
		entry.Idempotent = true
	}
}
