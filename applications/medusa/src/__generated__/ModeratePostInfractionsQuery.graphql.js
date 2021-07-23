/**
 * @flow
 * @relayHash f56edccd5d1c51616ca4ee577f119de6
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ModeratePostInfractionsQueryVariables = {||};
export type ModeratePostInfractionsQueryResponse = {|
  +postRejectionReasons: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +id: string,
        +reason: string,
        +infraction: boolean,
      |}
    |}>
  |}
|};
export type ModeratePostInfractionsQuery = {|
  variables: ModeratePostInfractionsQueryVariables,
  response: ModeratePostInfractionsQueryResponse,
|};


/*
query ModeratePostInfractionsQuery {
  postRejectionReasons {
    edges {
      node {
        id
        reason
        infraction
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "PostRejectionReasonConnection",
    "kind": "LinkedField",
    "name": "postRejectionReasons",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "PostRejectionReasonEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PostRejectionReason",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
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
                "name": "reason",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "infraction",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ModeratePostInfractionsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ModeratePostInfractionsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "f56edccd5d1c51616ca4ee577f119de6",
    "metadata": {},
    "name": "ModeratePostInfractionsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '760c26d8d4908be8d54e9c3f94ceae1b';
module.exports = node;
