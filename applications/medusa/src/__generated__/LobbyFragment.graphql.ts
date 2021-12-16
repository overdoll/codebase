/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LobbyFragment = {
    readonly id: string;
    readonly email: string;
    readonly " $refType": "LobbyFragment";
};
export type LobbyFragment$data = LobbyFragment;
export type LobbyFragment$key = {
    readonly " $data"?: LobbyFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"LobbyFragment">;
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
(node as any).hash = '68ca6dfa74f40fbaee95e8fa127113ff';
export default node;
