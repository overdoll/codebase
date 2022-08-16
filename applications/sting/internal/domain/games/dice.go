package games

import "math/rand"

var dice = []int{1, 2, 3, 4, 5, 6}

type diceRoll struct {
	rand *rand.Rand
}

func (d *diceRoll) Roll() int {
	return dice[d.rand.Intn(len(dice))]
}

func newDiceRoll(seed int64) *diceRoll {
	s1 := rand.NewSource(seed)
	r1 := rand.New(s1)
	return &diceRoll{rand: r1}
}
