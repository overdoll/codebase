/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 1f7c979d17ba068ea6a12b8c216ec8df */

import { ConcreteRequest } from "relay-runtime";
export type RefreshProcessContentQueryVariables = {
    reference: string;
};
export type RefreshProcessContentQueryResponse = {
    readonly post: {
        readonly id: string;
        readonly reference: string;
        readonly content: ReadonlyArray<{
            readonly id: string;
            readonly processed: boolean;
        }>;
    } | null;
};
export type RefreshProcessContentQuery = {
    readonly response: RefreshProcessContentQueryResponse;
    readonly variables: RefreshProcessContentQueryVariables;
};



/*
query RefreshProcessContentQuery(
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
    "name": "RefreshProcessContentQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RefreshProcessContentQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "1f7c979d17ba068ea6a12b8c216ec8df",
    "metadata": {},
    "name": "RefreshProcessContentQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = 'a0e5a1df244f026dfd280f1d95b2eb4a';
export default node;
