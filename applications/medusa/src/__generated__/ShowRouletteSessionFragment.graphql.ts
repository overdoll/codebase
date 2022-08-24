/**
 * @generated SignedSource<<662b7fd9f1af037b2cd082864c6ffb3b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowRouletteSessionFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"RouletteSessionFooterFragment" | "RouletteSessionScreenFragment">;
  readonly " $fragmentType": "ShowRouletteSessionFragment";
};
export type ShowRouletteSessionFragment$key = {
  readonly " $data"?: ShowRouletteSessionFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowRouletteSessionFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowRouletteSessionFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RouletteSessionFooterFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RouletteSessionScreenFragment"
    }
  ],
  "type": "RouletteStatus",
  "abstractKey": null
};

(node as any).hash = "730a5f0fe9ab0f5bc5059f93ca5663f1";

export default node;
