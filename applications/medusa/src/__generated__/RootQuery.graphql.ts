/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
<<<<<<< HEAD
/* @relayHash c2cf5746513b1f70789f79056917896f */
=======
/* @relayHash 2ea2d0faa7553510dc60ffb9cb294f63 */
>>>>>>> master

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RootQueryVariables = {};
export type RootQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"AccountAuthorizerFragment" | "UniversalNavigatorFragment" | "LockedAccountBannerFragment">;
    } | null;
    readonly language: {
        readonly locale: string;
    };
};
export type RootQuery = {
    readonly response: RootQueryResponse;
    readonly variables: RootQueryVariables;
};



/*
query RootQuery {
  viewer {
    ...AccountAuthorizerFragment
    ...UniversalNavigatorFragment
    ...LockedAccountBannerFragment
    id
  }
  language {
    locale
  }
}

fragment AccountAuthorizerFragment on Account {
  lock {
    __typename
  }
  isModerator
  isStaff
}

fragment AlternativeMenuFragment on Account {
  ...DropdownMenuButtonProfileFragment
  ...QuickAccessButtonProfileFragment
  ...LanguageManagerFragment
}

fragment DropdownMenuButtonProfileFragment on Account {
  username
  avatar {
    ...ResourceIconFragment
    id
  }
}

fragment ImageSnippetFragment on Resource {
  urls {
    url
    mimeType
  }
}

fragment LanguageManagerFragment on Account {
  language {
    locale
  }
}

fragment LockedAccountBannerFragment on Account {
  ...LockedAccountModalFragment
}

fragment LockedAccountModalFragment on Account {
  ...UnlockAccountFormFragment
  lock {
    expires
  }
}

fragment QuickAccessButtonProfileFragment on Account {
  username
  avatar {
    ...ResourceIconFragment
    id
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

fragment UniversalNavigatorFragment on Account {
  ...AlternativeMenuFragment
}

fragment UnlockAccountFormFragment on Account {
  id
}

fragment VideoSnippetFragment on Resource {
  urls {
    url
    mimeType
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "concreteType": "Language",
  "kind": "LinkedField",
  "name": "language",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "locale",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RootQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AccountAuthorizerFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UniversalNavigatorFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "LockedAccountBannerFragment"
          }
        ],
        "storageKey": null
      },
      (v0/*: any*/)
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RootQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountLock",
            "kind": "LinkedField",
            "name": "lock",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "expires",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isModerator",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isStaff",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "username",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Resource",
            "kind": "LinkedField",
            "name": "avatar",
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
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v0/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": null
      },
      (v0/*: any*/)
    ]
  },
  "params": {
<<<<<<< HEAD
    "id": "c2cf5746513b1f70789f79056917896f",
=======
    "id": "2ea2d0faa7553510dc60ffb9cb294f63",
>>>>>>> master
    "metadata": {},
    "name": "RootQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '4a182eb0eb5dbeddf86cde10eadc74b2';
export default node;
