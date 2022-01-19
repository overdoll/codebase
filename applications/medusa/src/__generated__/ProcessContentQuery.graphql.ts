/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash d2aac5f668532c46935ea02ab8b49243 */

import { ConcreteRequest } from "relay-runtime";
export type ProcessContentQueryVariables = {
    reference: string;
};
export type ProcessContentQueryResponse = {
    readonly post: {
        readonly id: string;
        readonly reference: string;
        readonly content: ReadonlyArray<{
            readonly id: string;
            readonly processed: boolean;
        }>;
    } | null;
};
export type ProcessContentQuery = {
    readonly response: ProcessContentQueryResponse;
    readonly variables: ProcessContentQueryVariables;
};



/*
query ProcessContentQuery(
  $reference: String!
) {
  post(reference: $reference) {
    id
    reference
    content {
      id
      processed
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "reference"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "reference",
        "variableName": "reference"
      }
    ],
    "concreteType": "Post",
    "kind": "LinkedField",
    "name": "post",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "reference",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Resource",
        "kind": "LinkedField",
        "name": "content",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "processed",
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
    "name": "ProcessContentQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProcessContentQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "d2aac5f668532c46935ea02ab8b49243",
    "metadata": {},
    "name": "ProcessContentQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '089ae584e94d5abf50931bdc9b230d94';
export default node;
