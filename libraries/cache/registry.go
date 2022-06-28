package cache

import "context"

type IndexConfig struct {
	Prefix   string
	Registry IndexRegistry
}

type IndexRegistry struct {
	Prefix   string
	registry map[string]string
	reindex  map[string]func(ctx context.Context) error
}

func (r IndexRegistry) Add(name, body string, reindex func(ctx context.Context) error) {
	r.registry[name] = body
	r.reindex[name] = reindex
}
