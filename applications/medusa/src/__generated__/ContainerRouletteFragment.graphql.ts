/**
 * @generated SignedSource<<51e381b12fec9d9b233ecdc121423f3e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerRouletteFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ShowRouletteSessionFragment">;
  readonly " $fragmentType": "ContainerRouletteFragment";
};
export type ContainerRouletteFragment$key = {
  readonly " $data"?: ContainerRouletteFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerRouletteFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerRouletteFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowRouletteSessionFragment"
    }
  ],
  "type": "GameSessionStatus",
  "abstractKey": "__isGameSessionStatus"
};

(node as any).hash = "98205bf4868347172139373a5886bf43";

export default node;
