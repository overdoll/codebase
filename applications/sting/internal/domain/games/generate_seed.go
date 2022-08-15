package games

import (
	"encoding/binary"
	"math/rand"
	"overdoll/libraries/errors"
	"strings"

	crypto_rand "crypto/rand"
	"fmt"
)

var nouns []string

func ShouldSeedNouns() bool {
	return len(nouns) == 0
}

func SeedNouns(seed []string) {
	nouns = seed
}

// newCryptoSeed returns a crypto level random numbers generator seed.
// It returns an error and a seed equals to -1 if the underlying system call fails.
func newCryptoSeed() (int64, error) {
	var b [8]byte
	_, err := crypto_rand.Read(b[:])
	if err != nil {
		return -1, fmt.Errorf("cannot seed math/rand package with Crypto RNG: %w", err)
	}

	seed := int64(binary.LittleEndian.Uint64(b[:]))
	return seed, nil
}

// generates and returns a random hero name.
// we pass a custom list of nouns based on our characters in the database
func generateSeed() (string, error) {

	if len(nouns) == 0 {
		return "", errors.New("no nouns available")
	}

	seed, err := newCryptoSeed()
	if err != nil {
		return "", err
	}

	rng := rand.New(rand.NewSource(seed))

	res := fmt.Sprintf("%s%s", randomAdjective(rng), randomNoun(rng, nouns))
	return res, nil
}

// randomAdjective returns a random adjective from a list of adjectives.
func randomAdjective(rng *rand.Rand) string {
	return strings.ToTitle(adjectives[rng.Intn(len(adjectives))])
}

// randomNoun returns a random noun from a list of nouns.
func randomNoun(rng *rand.Rand, nouns []string) string {

	selectedNoun := nouns[rng.Intn(len(nouns))]

	fullWord := ""

	separators := []string{"-", " "}

	for _, separator := range separators {
		for _, split := range strings.Split(selectedNoun, separator) {
			fullWord = fmt.Sprintf("%s%s", fullWord, strings.ToTitle(split))
		}
	}

	return fullWord
}
