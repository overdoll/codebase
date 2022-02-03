/**
 * @generated SignedSource<<5b58e034d43ee0221e5dab63029cea5b>>
 * @relayHash 7e091e78c7282108b0e47a12adb65a08
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 7e091e78c7282108b0e47a12adb65a08

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CurationCategoryNextButtonMutation$variables = {
  categoryIds: ReadonlyArray<string>;
  skipped: boolean;
};
export type CurationCategoryNextButtonMutationVariables = CurationCategoryNextButtonMutation$variables;
export type CurationCategoryNextButtonMutation$data = {
  readonly updateCurationProfileCategory: {
    readonly curationProfile: {
      readonly id: string;
      readonly completed: boolean;
      readonly category: {
        readonly skipped: boolean;
        readonly completed: boolean;
        readonly categories: ReadonlyArray<{
          readonly id: string;
        }>;
      };
    } | null;
  } | null;
};
export type CurationCategoryNextButtonMutationResponse = CurationCategoryNextButtonMutation$data;
export type CurationCategoryNextButtonMutation = {
  variables: CurationCategoryNextButtonMutationVariables;
  response: CurationCategoryNextButtonMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "categoryIds"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "skipped"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "completed",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "categoryIds",
            "variableName": "categoryIds"
          },
          {
            "kind": "Variable",
            "name": "skipped",
            "variableName": "skipped"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "UpdateCurationProfileCategoryPayload",
    "kind": "LinkedField",
    "name": "updateCurationProfileCategory",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CurationProfile",
        "kind": "LinkedField",
        "name": "curationProfile",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "CategoryCurationProfile",
            "kind": "LinkedField",
            "name": "category",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "skipped",
                "storageKey": null
              },
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Category",
                "kind": "LinkedField",
                "name": "categories",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CurationCategoryNextButtonMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CurationCategoryNextButtonMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "id": "7e091e78c7282108b0e47a12adb65a08",
    "metadata": {},
    "name": "CurationCategoryNextButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "73b54aa9bc3d9ccbcf273794f2449096";

export default node;
