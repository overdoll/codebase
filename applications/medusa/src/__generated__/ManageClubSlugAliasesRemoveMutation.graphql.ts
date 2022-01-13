/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash c23f01e2c2841318c94deefa46358612 */

import { ConcreteRequest } from "relay-runtime";
export type ManageClubSlugAliasesRemoveMutationVariables = {
    id: string;
    slug: string;
};
export type ManageClubSlugAliasesRemoveMutationResponse = {
    readonly removeClubSlugAlias: {
        readonly club: {
            readonly id: string;
            readonly slugAliases: ReadonlyArray<{
                readonly slug: string;
            }>;
        } | null;
    } | null;
};
export type ManageClubSlugAliasesRemoveMutation = {
    readonly response: ManageClubSlugAliasesRemoveMutationResponse;
    readonly variables: ManageClubSlugAliasesRemoveMutationVariables;
};



/*
mutation ManageClubSlugAliasesRemoveMutation(
  $id: ID!
  $slug: String!
) {
  removeClubSlugAlias(input: {id: $id, slug: $slug}) {
    club {
      id
      slugAliases {
        slug
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id"
          },
          {
            "kind": "Variable",
            "name": "slug",
            "variableName": "slug"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "RemoveClubSlugAliasPayload",
    "kind": "LinkedField",
    "name": "removeClubSlugAlias",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
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
            "concreteType": "ClubSlugAlias",
            "kind": "LinkedField",
            "name": "slugAliases",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "slug",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ManageClubSlugAliasesRemoveMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ManageClubSlugAliasesRemoveMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "c23f01e2c2841318c94deefa46358612",
    "metadata": {},
    "name": "ManageClubSlugAliasesRemoveMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = 'a75d9985c612afbfc24d18671c9ef1f0';
export default node;
