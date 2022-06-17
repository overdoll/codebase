package resource

var extensionsMap = map[string]string{
	"video/mp4":  ".mp4",
	"image/png":  ".png",
	"image/webp": ".webp",
}

func ExtensionByType(tp string) (string, error) {
	return extensionsMap[tp], nil
}
