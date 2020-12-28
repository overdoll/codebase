package resolvers

func softDeference(field *string) string {
	if field == nil {
		return ""
	}
	return *field
}
