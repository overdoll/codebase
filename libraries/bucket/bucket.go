package bucket

import (
	"time"

	"github.com/segmentio/ksuid"
)

// Bucket package
// useful for bucketing
// bucketing logic stolen from https://blog.discord.com/how-discord-stores-billions-of-messages-7fa6ec7ee4c7 :)

const (
	overdollEpoch = 1420070400000
	weekSize      = 1000 * 60 * 60 * 24 * 7
	monthSize     = 1000 * 60 * 60 * 24 * 7 * 4
)

func timestampToWeekBucket(timestamp int) int {
	return timestamp / weekSize
}

func timestampToMonthBucket(timestamp int) int {
	return timestamp / monthSize
}

func MakeWeeklyBucketFromTimestamp(tm time.Time) int {
	return timestampToWeekBucket(int(tm.Unix()))
}

func MakeMonthlyBucketFromTimestamp(tm time.Time) int {
	return timestampToMonthBucket(int(tm.Unix()))
}

func MakeWeeklyBucketFromKSUID(target string) (int, error) {
	id, err := ksuid.Parse(target)

	if err != nil {
		return 0, err
	}

	return timestampToWeekBucket(int(id.Time().Unix())), nil
}

func MakeBucketsFromTimeRange(from, to time.Time) []int {

	startBucket := MakeWeeklyBucketFromTimestamp(from)
	endBucket := MakeWeeklyBucketFromTimestamp(to)

	var rng []int

	for i := endBucket; i <= startBucket; i++ {
		rng = append(rng, i)
	}

	return rng
}

func MakeBucket() int {
	return timestampToWeekBucket(int(time.Now().Unix())*1000 - overdollEpoch)
}

func GetBuckets(start, end string) ([]int, error) {
	var buckets []int

	startId, err := MakeWeeklyBucketFromKSUID(start)

	if err != nil {
		return nil, err
	}

	endId, err := MakeWeeklyBucketFromKSUID(end)

	if err != nil {
		return nil, err
	}

	for i := startId; i <= endId+1; i++ {
		buckets = append(buckets, i)
	}

	return buckets, nil
}
