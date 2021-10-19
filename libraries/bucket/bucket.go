package bucket

import (
	"time"

	"github.com/segmentio/ksuid"
)

// Bucket package
// useful for bucketing
// bucketing logic stolen from https://blog.discord.com/how-discord-stores-billions-of-messages-7fa6ec7ee4c7 :)

const (
	OverdollEpoch = 1420070400000
	BucketSize    = 1000 * 60 * 60 * 24 * 7
)

func timestampToBucket(timestamp int) int {
	return timestamp / BucketSize
}

func MakeBucketFromTimestamp(tm time.Time) int {
	return timestampToBucket(int(tm.Unix()))
}

func MakeBucketFromKSUID(target string) (int, error) {
	id, err := ksuid.Parse(target)

	if err != nil {
		return 0, err
	}

	return timestampToBucket(int(id.Time().Unix())), nil
}

func MakeBucketsFromTimeRange(from, to time.Time) []int {

	startBucket := MakeBucketFromTimestamp(from)
	endBucket := MakeBucketFromTimestamp(to)

	var rng []int

	for i := endBucket; i <= startBucket; i++ {
		rng = append(rng, i)
	}

	return rng
}

func MakeBucket() int {
	return timestampToBucket(int(time.Now().Unix())*1000 - OverdollEpoch)
}

func GetBuckets(start, end string) ([]int, error) {
	var buckets []int

	startId, err := MakeBucketFromKSUID(start)

	if err != nil {
		return nil, err
	}

	endId, err := MakeBucketFromKSUID(end)

	if err != nil {
		return nil, err
	}

	for i := startId; i <= endId+1; i++ {
		buckets = append(buckets, i)
	}

	return buckets, nil
}
