/**
 * @generated SignedSource<<b32d81e1e77c6dabfeaf4c5725e4d0f2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowRouletteSessionFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"RouletteSessionFooterFragment" | "RouletteSessionScreenFragment" | "RouletteSubtitleTrackFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RouletteSubtitleTrackFragment"
    }
  ],
  "type": "GameSessionStatus",
  "abstractKey": "__isGameSessionStatus"
};

(node as any).hash = "f9def8536c4be5e35a09f849a67f6dea";

export default node;
