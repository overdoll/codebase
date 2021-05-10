// @flow
// https://gist.github.com/gmencz/7d6973b8ab95f5adae1739e88f956f70
// Actually parses cookies, unlike set-cookie-parser, which seems to break when dates have commas in them (which is standard...)
type CookieOptions = {
  maxAge?: number,
  expires?: Date,
  httpOnly?: boolean,
  path?: string,
  domain?: string,
  secure?: boolean,
  sameSite?: boolean | 'lax' | 'strict' | 'none',
};

type ParsedCookie = {
  cookieName: string,
  cookieValue: string,
  options?: CookieOptions,
};

function hasExpiresField(cookie: string): boolean {
  return cookie
    .split(';')
    .map(part => {
      if (part.split('=').length > 1) {
        return (
          part
            .split('=')[0]
            .trim()
            .toLowerCase() === 'expires'
        );
      }

      return false;
    })
    .some(bool => bool);
}

export default function parseCookies(rawCookies: string): ParsedCookie[] {
  // Make this check more effective
  if (!rawCookies.includes('=')) {
    throw new Error(
      'Invalid raw cookies, look at the format of a set-cookie header string and provide something similar.',
    );
  }

  /*
    Cookie format: "name=value; Path=/; HttpOnly; Secure"
    Multiple cookies format: "name=value; Path=/; HttpOnly; Secure, name2=value2"
  */
  const arraifyedRawCookies = rawCookies.split(',');
  const validRawCookies = arraifyedRawCookies
    .map((rawCookie, index, ref) => {
      if (hasExpiresField(rawCookie)) {
        return `${rawCookie}${ref[index + 1]}`;
      }

      if (index > 0 && hasExpiresField(ref[index - 1])) return 'invalid';

      return rawCookie;
    })
    .filter(rawCookie => rawCookie !== 'invalid');

  return validRawCookies.map(rawCookie => {
    const [cookieNameAndValue, ...cookieProperties] = rawCookie.split(';');
    const [cookieName, cookieValue] = cookieNameAndValue.split('=');

    const sanitizedCookieProperties = cookieProperties.map(cookieProperty => {
      const [propertyName, propertyValue] = cookieProperty.split('=');
      const sanitizedPropertyName = propertyName
        .replace('-', '')
        .toLowerCase()
        .trim();

      if (sanitizedPropertyName === 'maxage') {
        return `maxAge=${propertyValue}`;
      } else if (sanitizedPropertyName === 'httponly') {
        return 'httpOnly=true';
      } else if (sanitizedPropertyName === 'samesite') {
        return `sameSite=${propertyValue.toLowerCase()}`;
      }

      if (!propertyValue) {
        return `${sanitizedPropertyName}=true`;
      }

      return `${sanitizedPropertyName}=${propertyValue}`;
    });

    const objectifyedCookieProperties = sanitizedCookieProperties.map(
      sanitizedCookieProperty => {
        const [propertyName, propertyValue] = sanitizedCookieProperty.split(
          '=',
        );

        return {
          [propertyName]: propertyValue === 'true' ? true : propertyValue,
        };
      },
    );

    const options: CookieOptions = {};

    objectifyedCookieProperties.forEach(objectifyedCookieProperty => {
      Object.entries(objectifyedCookieProperty).forEach(([key, value]) => {
        if (key === 'expires') {
          options[key] = new Date(value);
          return;
        }

        if (key === 'maxAge') {
          options[key] = Number(value);
          return;
        }

        options[key] = value;
      });
    });

    return {
      cookieName: cookieName.trim(),
      cookieValue: cookieValue.trim(),
      options,
    };
  });
}
