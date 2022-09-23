package media

func CalculateAspectRatio(width, height int) (w int, h int) {

	widthAspect := 0
	heightAspect := 0

	if height == width {
		widthAspect = 1
		heightAspect = 1
	}

	var dividend, divisor int

	if width > height {
		dividend = height
		divisor = width
	}

	if height > width {
		dividend = width
		divisor = height
	}

	// make sure we check for a 0 divisor or else we may have division by 0 errors
	if divisor == 0 {
		return 0, 0
	}

	gcd := -1

	for gcd == -1 {
		remainder := dividend % divisor
		if remainder == 0 {
			gcd = divisor
		} else {
			dividend = divisor
			divisor = remainder
		}
	}

	widthAspect = width / gcd
	heightAspect = height / gcd

	return widthAspect, heightAspect
}
