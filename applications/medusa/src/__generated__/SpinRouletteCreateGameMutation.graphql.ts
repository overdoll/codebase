/**
 * @generated SignedSource<<1e91c951e26b1cf69090cda1e1a67e70>>
 * @relayHash 2229f36697036580b7d093d2677908a1
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 2229f36697036580b7d093d2677908a1

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type GameType = "ROULETTE" | "%future added value";
export type CreateGameSessionInput = {
  gameType: GameType;
  seed?: string | null;
};
export type SpinRouletteCreateGameMutation$variables = {
  input: CreateGameSessionInput;
};
export type SpinRouletteCreateGameMutation$data = {
  readonly createGameSession: {
    readonly gameSession: {
      readonly id: string;
      readonly reference: string;
    } | null;
  } | null;
};
export type SpinRouletteCreateGameMutation = {
  response: SpinRouletteCreateGameMutation$data;
  variables: SpinRouletteCreateGameMutation$variables;
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
            "name": "reference",
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
    "name": "SpinRouletteCreateGameMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SpinRouletteCreateGameMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "2229f36697036580b7d093d2677908a1",
    "metadata": {},
    "name": "SpinRouletteCreateGameMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "d2be2265f1f35e73af62156c4aa72cca";

export default node;
