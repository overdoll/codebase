/**
 * @generated SignedSource<<ad7b35b841cce81598fb7a76b90c3a65>>
 * @relayHash 3f50432b4fba167ef7c71cf9ae05c9df
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 3f50432b4fba167ef7c71cf9ae05c9df

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ObservePostsInput = {
  postIds: ReadonlyArray<string>;
};
export type ViewCounterProviderMutation$variables = {
  input: ObservePostsInput;
};
export type ViewCounterProviderMutation$data = {
  readonly observePosts: {
    readonly posts: ReadonlyArray<{
      readonly id: string;
    }>;
  } | null;
};
export type ViewCounterProviderMutation = {
  response: ViewCounterProviderMutation$data;
  variables: ViewCounterProviderMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ObservePostsPayload",
    "kind": "LinkedField",
    "name": "observePosts",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Post",
        "kind": "LinkedField",
        "name": "posts",
        "plural": true,
        "selections": [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewCounterProviderMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ViewCounterProviderMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "3f50432b4fba167ef7c71cf9ae05c9df",
    "metadata": {},
    "name": "ViewCounterProviderMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "e905da303f4f8778945320b55527c033";

export default node;
