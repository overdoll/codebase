/**
 * @generated SignedSource<<648554ec01f649c66957b854d8301f34>>
 * @relayHash 0b303be1829f52208b72a7dfd7ae1ee4
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 0b303be1829f52208b72a7dfd7ae1ee4

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectCancellationReasonListQuery$variables = {};
export type SelectCancellationReasonListQueryVariables = SelectCancellationReasonListQuery$variables;
export type SelectCancellationReasonListQuery$data = {
  readonly cancellationReasons: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"CancellationReasonOverlayFragment">;
      };
    }>;
  };
};
export type SelectCancellationReasonListQueryResponse = SelectCancellationReasonListQuery$data;
export type SelectCancellationReasonListQuery = {
  variables: SelectCancellationReasonListQueryVariables;
  response: SelectCancellationReasonListQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SelectCancellationReasonListQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CancellationReasonConnection",
        "kind": "LinkedField",
        "name": "cancellationReasons",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CancellationReasonEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CancellationReason",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "CancellationReasonOverlayFragment"
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
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SelectCancellationReasonListQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CancellationReasonConnection",
        "kind": "LinkedField",
        "name": "cancellationReasons",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CancellationReasonEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CancellationReason",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
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
    ]
  },
  "params": {
    "id": "0b303be1829f52208b72a7dfd7ae1ee4",
    "metadata": {},
    "name": "SelectCancellationReasonListQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "49672abe45ece9b65eaf321f6c6be6a5";

export default node;
