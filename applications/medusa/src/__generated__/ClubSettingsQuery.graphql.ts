/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 29dc5c8193d39b8522485bfb7c6bab9b */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ClubSettingsQueryVariables = {
    slug: string;
};
export type ClubSettingsQueryResponse = {
    readonly club: {
        readonly " $fragmentRefs": FragmentRefs<"ChangeClubNameFragment" | "ClubAliasesFragment" | "ChangeClubThumbnailFragment">;
    } | null;
};
export type ClubSettingsQuery = {
    readonly response: ClubSettingsQueryResponse;
    readonly variables: ClubSettingsQueryVariables;
};



/*
query ClubSettingsQuery(
  $slug: String!
) {
  club(slug: $slug) {
    ...ChangeClubNameFragment
    ...ClubAliasesFragment
    ...ChangeClubThumbnailFragment
    id
  }
}

fragment AddClubSlugAliasFragment on Club {
  id
  slug
  slugAliases {
    __typename
  }
  slugAliasesLimit
}

fragment ChangeClubNameFragment on Club {
  id
  name
}

fragment ChangeClubThumbnailFragment on Club {
  id
  thumbnail {
    ...ResourceIconFragment
    id
  }
}

fragment ClubAliasesFragment on Club {
  slug
  ...AddClubSlugAliasFragment
  ...ManageClubSlugAliasesFragment
  slugAliases {
    slug
  }
}

fragment ImageSnippetFragment on Resource {
  urls {
    url
    mimeType
  }
}

fragment ManageClubSlugAliasesFragment on Club {
  id
  slug
  slugAliases {
    slug
  }
}

fragment ResourceIconFragment on Resource {
  ...ResourceItemFragment
}

fragment ResourceItemFragment on Resource {
  type
  ...ImageSnippetFragment
  ...VideoSnippetFragment
}

fragment VideoSnippetFragment on Resource {
  urls {
    url
    mimeType
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ClubSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ChangeClubNameFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ClubAliasesFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ChangeClubThumbnailFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ClubSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ClubSlugAlias",
            "kind": "LinkedField",
            "name": "slugAliases",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slugAliasesLimit",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Resource",
            "kind": "LinkedField",
            "name": "thumbnail",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "type",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceUrl",
                "kind": "LinkedField",
                "name": "urls",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "mimeType",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "29dc5c8193d39b8522485bfb7c6bab9b",
    "metadata": {},
    "name": "ClubSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '3db3490ed344be83a47a730a1ef9ba1d';
export default node;
