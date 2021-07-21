/**
 * @flow
 * @relayHash 1da2b6111b188436e97882c7cd2e477f
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ModeratePostInfractionsQueryVariables = {||};
export type ModeratePostInfractionsQueryResponse = {|
  +rejectionReasons: $ReadOnlyArray<{|
    +id: string,
    +reason: string,
    +infraction: boolean,
  |}>
|};
export type ModeratePostInfractionsQuery = {|
  variables: ModeratePostInfractionsQueryVariables,
  response: ModeratePostInfractionsQueryResponse,
|};


/*
query ModeratePostInfractionsQuery {
  rejectionReasons {
    id
    reason
    infraction
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "PendingPostRejectionReason",
    "kind": "LinkedField",
    "name": "rejectionReasons",
    "plural": true,
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
    "id": "1da2b6111b188436e97882c7cd2e477f",
    "metadata": {},
    "name": "ModeratePostInfractionsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '06eebea79e7eaf1eefc8fb9cb88ec9aa';
module.exports = node;
