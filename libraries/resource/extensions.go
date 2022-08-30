package resource

var extensionsMap = map[string]string{
	"video/mp4":  ".mp4",
	"video/webm": ".webm",
	"image/png":  ".png",
	"image/webp": ".webp",
	"image/jpg":  ".jpg",
	"image/jpeg": ".jpg",
}

func ExtensionByType(tp string) (string, error) {
	return extensionsMap[tp], nil
}
