/**
 * @generated SignedSource<<9293695363e4e506f3ffc1c34c72b0df>>
 * @relayHash c23f01e2c2841318c94deefa46358612
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID c23f01e2c2841318c94deefa46358612

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ManageClubSlugAliasesRemoveMutation$variables = {
  id: string;
  slug: string;
};
export type ManageClubSlugAliasesRemoveMutation$data = {
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
  response: ManageClubSlugAliasesRemoveMutation$data;
  variables: ManageClubSlugAliasesRemoveMutation$variables;
};

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

(node as any).hash = "a75d9985c612afbfc24d18671c9ef1f0";

export default node;
