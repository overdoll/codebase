package media

type ColorPalette struct {
	percent float64
	red     int
	green   int
	blue    int
}

func (i *ColorPalette) Percent() float64 {
	return i.percent
}

func (i *ColorPalette) Red() int {
	return i.red
}

func (i *ColorPalette) Green() int {
	return i.green
}

func (i *ColorPalette) Blue() int {
	return i.blue
}
