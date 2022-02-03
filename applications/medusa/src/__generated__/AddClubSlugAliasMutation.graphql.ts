/**
 * @generated SignedSource<<3e5afe11ae13c6026de384ab961298b5>>
 * @relayHash 2691930cf470e487a3900088c53d85d8
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 2691930cf470e487a3900088c53d85d8

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AddClubSlugAliasValidation = "SLUG_TAKEN" | "%future added value";
export type AddClubSlugAliasMutation$variables = {
  id: string;
  slug: string;
};
export type AddClubSlugAliasMutationVariables = AddClubSlugAliasMutation$variables;
export type AddClubSlugAliasMutation$data = {
  readonly addClubSlugAlias: {
    readonly club: {
      readonly id: string;
      readonly slug: string;
      readonly slugAliases: ReadonlyArray<{
        readonly slug: string;
      }>;
    } | null;
    readonly validation: AddClubSlugAliasValidation | null;
  } | null;
};
export type AddClubSlugAliasMutationResponse = AddClubSlugAliasMutation$data;
export type AddClubSlugAliasMutation = {
  variables: AddClubSlugAliasMutationVariables;
  response: AddClubSlugAliasMutation$data;
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
    "concreteType": "AddClubSlugAliasPayload",
    "kind": "LinkedField",
    "name": "addClubSlugAlias",
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "validation",
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
    "name": "AddClubSlugAliasMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddClubSlugAliasMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "2691930cf470e487a3900088c53d85d8",
    "metadata": {},
    "name": "AddClubSlugAliasMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "b1cf49c95d432ed8840ae76a91c66b4f";

export default node;
