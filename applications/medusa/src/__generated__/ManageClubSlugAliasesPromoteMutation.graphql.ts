/**
 * @generated SignedSource<<7736de3d111aad0c64e3427aa9b797aa>>
 * @relayHash 2d767cb4f31fad132502d70b0104b34f
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 2d767cb4f31fad132502d70b0104b34f

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ManageClubSlugAliasesPromoteMutation$variables = {
  id: string;
  slug: string;
};
export type ManageClubSlugAliasesPromoteMutationVariables = ManageClubSlugAliasesPromoteMutation$variables;
export type ManageClubSlugAliasesPromoteMutation$data = {
  readonly promoteClubSlugAliasToDefault: {
    readonly club: {
      readonly slug: string;
      readonly slugAliases: ReadonlyArray<{
        readonly slug: string;
      }>;
    } | null;
  } | null;
};
export type ManageClubSlugAliasesPromoteMutationResponse = ManageClubSlugAliasesPromoteMutation$data;
export type ManageClubSlugAliasesPromoteMutation = {
  variables: ManageClubSlugAliasesPromoteMutationVariables;
  response: ManageClubSlugAliasesPromoteMutation$data;
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "ClubSlugAlias",
  "kind": "LinkedField",
  "name": "slugAliases",
  "plural": true,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ManageClubSlugAliasesPromoteMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PromoteClubSlugAliasToDefaultPayload",
        "kind": "LinkedField",
        "name": "promoteClubSlugAliasToDefault",
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
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ManageClubSlugAliasesPromoteMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PromoteClubSlugAliasToDefaultPayload",
        "kind": "LinkedField",
        "name": "promoteClubSlugAliasToDefault",
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
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "2d767cb4f31fad132502d70b0104b34f",
    "metadata": {},
    "name": "ManageClubSlugAliasesPromoteMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "af37738dedf2cef669b436efeef34ba7";

export default node;
