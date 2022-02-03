/**
 * @generated SignedSource<<166d122d25d5ca24c1fec688d714310f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LobbyFragment$data = {
  readonly id: string;
  readonly email: string | null;
  readonly " $fragmentType": "LobbyFragment";
};
export type LobbyFragment = LobbyFragment$data;
export type LobbyFragment$key = {
  readonly " $data"?: LobbyFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"LobbyFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LobbyFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "email",
          "storageKey": null
        }
      ]
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "68ca6dfa74f40fbaee95e8fa127113ff";

export default node;
