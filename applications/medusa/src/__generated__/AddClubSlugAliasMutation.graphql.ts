/**
 * @generated SignedSource<<b9577e95d1fadd7cfcd49b4cf796e431>>
 * @relayHash 3025dddf16066f205f6fb516e9fb342e
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 3025dddf16066f205f6fb516e9fb342e

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AddClubSlugAliasValidation = "SLUG_TAKEN" | "%future added value";
export type AddClubSlugAliasInput = {
  id: string;
  slug: string;
};
export type AddClubSlugAliasMutation$variables = {
  input: AddClubSlugAliasInput;
};
export type AddClubSlugAliasMutationVariables = AddClubSlugAliasMutation$variables;
export type AddClubSlugAliasMutation$data = {
  readonly addClubSlugAlias: {
    readonly club: {
      readonly id: string;
      readonly slug: string;
      readonly slugAliases: ReadonlyArray<{
        readonly __id: string;
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
    "name": "input"
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
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
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
              (v1/*: any*/),
              {
                "kind": "ClientExtension",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__id",
                    "storageKey": null
                  }
                ]
              }
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
    "id": "3025dddf16066f205f6fb516e9fb342e",
    "metadata": {},
    "name": "AddClubSlugAliasMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "bdf816acbd34d813cfc990ecaa452ee7";

export default node;
