package resource

// Config struct is used to specify how an image should be processed, i.e. minimum width, etc...
type Config struct {
	width  uint64
	height uint64
}

func NewConfig(width, height uint64) (*Config, error) {
	return &Config{
		width:  width,
		height: height,
	}, nil
}

func (c *Config) Width() uint64 {
	return c.width
}

func (c *Config) Height() uint64 {
	return c.height
}
