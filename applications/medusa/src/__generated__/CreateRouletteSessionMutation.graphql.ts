/**
 * @generated SignedSource<<f48fbbd016fc6f2a55ef77321004d315>>
 * @relayHash 5d6aa077654227d0279f696176522297
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 5d6aa077654227d0279f696176522297

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type GameType = "ROULETTE" | "%future added value";
export type CreateGameSessionInput = {
  gameType: GameType;
  seed?: string | null;
};
export type CreateRouletteSessionMutation$variables = {
  input: CreateGameSessionInput;
};
export type CreateRouletteSessionMutation$data = {
  readonly createGameSession: {
    readonly gameSession: {
      readonly reference: string;
    } | null;
  } | null;
};
export type CreateRouletteSessionMutation = {
  response: CreateRouletteSessionMutation$data;
  variables: CreateRouletteSessionMutation$variables;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reference",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateRouletteSessionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateGameSessionPayload",
        "kind": "LinkedField",
        "name": "createGameSession",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GameSession",
            "kind": "LinkedField",
            "name": "gameSession",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateRouletteSessionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateGameSessionPayload",
        "kind": "LinkedField",
        "name": "createGameSession",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GameSession",
            "kind": "LinkedField",
            "name": "gameSession",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
    ]
  },
  "params": {
    "id": "5d6aa077654227d0279f696176522297",
    "metadata": {},
    "name": "CreateRouletteSessionMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "5d7c6dc2f16b320f7cf53a893a737a27";

export default node;
