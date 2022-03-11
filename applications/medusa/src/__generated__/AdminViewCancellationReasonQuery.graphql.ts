/**
 * @generated SignedSource<<94806bf4c0b789f72aec66f116c38262>>
 * @relayHash 50a9c818b364aa905ff809f212d24ce7
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 50a9c818b364aa905ff809f212d24ce7

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminViewCancellationReasonQuery$variables = {
  reference: string;
};
export type AdminViewCancellationReasonQueryVariables = AdminViewCancellationReasonQuery$variables;
export type AdminViewCancellationReasonQuery$data = {
  readonly cancellationReason: {
    readonly " $fragmentSpreads": FragmentRefs<"ChangeCancellationReasonTitleFragment" | "ChangeCancellationReasonDeprecatedFragment">;
  } | null;
};
export type AdminViewCancellationReasonQueryResponse = AdminViewCancellationReasonQuery$data;
export type AdminViewCancellationReasonQuery = {
  variables: AdminViewCancellationReasonQueryVariables;
  response: AdminViewCancellationReasonQuery$data;
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
    "name": "AdminViewCancellationReasonQuery",
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
    "name": "AdminViewCancellationReasonQuery",
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
    "id": "50a9c818b364aa905ff809f212d24ce7",
    "metadata": {},
    "name": "AdminViewCancellationReasonQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "5b8965e06caf145183ffb30d5d157aad";

export default node;
