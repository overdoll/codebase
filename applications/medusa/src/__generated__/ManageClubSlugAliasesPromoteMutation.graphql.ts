/**
 * @generated SignedSource<<732998cd56811a866af4c9e4429fd4bb>>
 * @relayHash ce7c88a1aded1e560f92299ae6186fe3
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID ce7c88a1aded1e560f92299ae6186fe3

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ManageClubSlugAliasesPromoteMutation$variables = {
  id: string;
  slug: string;
};
export type ManageClubSlugAliasesPromoteMutationVariables = ManageClubSlugAliasesPromoteMutation$variables;
export type ManageClubSlugAliasesPromoteMutation$data = {
  readonly promoteClubSlugAliasToDefault: {
    readonly club: {
      readonly id: string;
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v2 = [
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ClubSlugAlias",
            "kind": "LinkedField",
            "name": "slugAliases",
            "plural": true,
            "selections": [
              (v1/*: any*/)
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
    "name": "ManageClubSlugAliasesPromoteMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ManageClubSlugAliasesPromoteMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "ce7c88a1aded1e560f92299ae6186fe3",
    "metadata": {},
    "name": "ManageClubSlugAliasesPromoteMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "30974501e54fc16b0d0d6c74907ab424";

export default node;
