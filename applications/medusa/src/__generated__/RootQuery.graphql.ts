/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash fe40ae3a0471a5a206760c0c1ea28c92 */

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
  avatar
}

fragment LanguageManagerFragment on Account {
  language {
    locale
  }
}

fragment LockedAccountBannerFragment on Account {
  lock {
    ...LockedAccountModalFragment
  }
}

fragment LockedAccountModalFragment on AccountLock {
  reason
  expires
}

fragment QuickAccessButtonProfileFragment on Account {
  avatar
}

fragment UniversalNavigatorFragment on Account {
  ...AlternativeMenuFragment
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
                "name": "reason",
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
            "kind": "ScalarField",
            "name": "avatar",
            "storageKey": null
          },
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      (v0/*: any*/)
    ]
  },
  "params": {
    "id": "fe40ae3a0471a5a206760c0c1ea28c92",
    "metadata": {},
    "name": "RootQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '4a182eb0eb5dbeddf86cde10eadc74b2';
export default node;
