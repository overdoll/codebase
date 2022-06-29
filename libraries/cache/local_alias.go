package cache

import (
	"strconv"
	"time"
)

var prefix string

func readLocalAlias(index string) string {
	return ReadAlias(prefix, index)
}

func writeLocalAlias(index string) string {
	return WriteAlias(prefix, index)
}

func withLocalPrefixAndTimestamp(index string) string {
	return prefix + "." + index + "-" + strconv.Itoa(int(time.Now().Unix()))
}

func ReadAlias(prefix string, index string) string {
	return prefix + "." + index + ".read"
}

func WriteAlias(prefix string, index string) string {
	return prefix + "." + index + ".write"
}
