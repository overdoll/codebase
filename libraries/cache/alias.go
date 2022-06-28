package cache

import (
	"strconv"
	"time"
)

var prefix string

func ReadAlias(index string) string {
	return prefix + "." + index + ".read"
}

func WriteAlias(index string) string {
	return prefix + "." + index + ".write"
}

func withPrefixAndTimestamp(index string) string {
	return prefix + "." + index + "-" + strconv.Itoa(int(time.Now().Unix()))
}
