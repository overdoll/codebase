/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 5896298e40058cd2090b353e8e79443f */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ClubSettingsQueryVariables = {
    slug: string;
};
export type ClubSettingsQueryResponse = {
    readonly club: {
        readonly slug: string;
        readonly " $fragmentRefs": FragmentRefs<"ChangeClubNameFragment" | "ClubAliasesFragment">;
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
    slug
    ...ChangeClubNameFragment
    ...ClubAliasesFragment
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

fragment ClubAliasesFragment on Club {
  slug
  ...AddClubSlugAliasFragment
  ...ManageClubSlugAliasesFragment
  slugAliases {
    slug
  }
}

fragment ManageClubSlugAliasesFragment on Club {
  id
  slug
  slugAliases {
    slug
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
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ChangeClubNameFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ClubAliasesFragment"
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
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
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
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slugAliasesLimit",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "5896298e40058cd2090b353e8e79443f",
    "metadata": {},
    "name": "ClubSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '630923f93c5db9d1ec8dd55693e363cb';
export default node;
