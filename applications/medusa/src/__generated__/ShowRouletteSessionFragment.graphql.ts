/**
 * @generated SignedSource<<058df262cff7345db86e3428008243d4>>
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
  "type": "RouletteStatus",
  "abstractKey": null
};

(node as any).hash = "ae505e8464d6a8bf06557868028e0f1a";

export default node;
