/**
 * @generated SignedSource<<140ed461017034bf7c2861b0a8a0021d>>
 * @relayHash c9fdcff5236ed5783b95875ae438713a
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID c9fdcff5236ed5783b95875ae438713a

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffViewCancellationReasonQuery$variables = {
  reference: string;
};
export type StaffViewCancellationReasonQueryVariables = StaffViewCancellationReasonQuery$variables;
export type StaffViewCancellationReasonQuery$data = {
  readonly cancellationReason: {
    readonly " $fragmentSpreads": FragmentRefs<"ChangeCancellationReasonTitleFragment" | "ChangeCancellationReasonDeprecatedFragment">;
  } | null;
};
export type StaffViewCancellationReasonQueryResponse = StaffViewCancellationReasonQuery$data;
export type StaffViewCancellationReasonQuery = {
  variables: StaffViewCancellationReasonQueryVariables;
  response: StaffViewCancellationReasonQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "reference"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "reference",
    "variableName": "reference"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "StaffViewCancellationReasonQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CancellationReason",
        "kind": "LinkedField",
        "name": "cancellationReason",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ChangeCancellationReasonTitleFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ChangeCancellationReasonDeprecatedFragment"
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
    "name": "StaffViewCancellationReasonQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CancellationReason",
        "kind": "LinkedField",
        "name": "cancellationReason",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Translation",
            "kind": "LinkedField",
            "name": "titleTranslations",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "text",
                "storageKey": null
              },
              {
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
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
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "deprecated",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "c9fdcff5236ed5783b95875ae438713a",
    "metadata": {},
    "name": "StaffViewCancellationReasonQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "6ffc3cd1ce587f734ece23199871890d";

export default node;
