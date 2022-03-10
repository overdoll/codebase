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
	return timestampToWeekBucket(int(tm.Unix())*1000 - overdollEpoch)
}

func MakeMonthlyBucketFromTimestamp(tm time.Time) int {
	return timestampToMonthBucket(int(tm.Unix())*1000 - overdollEpoch)
}

func MakeWeeklyBucketFromUUID(target string) (int, error) {
	id, err := ksuid.Parse(target)

	if err != nil {
		return 0, err
	}

	return timestampToWeekBucket(int(id.Time().Unix())*1000 - overdollEpoch), nil
}
