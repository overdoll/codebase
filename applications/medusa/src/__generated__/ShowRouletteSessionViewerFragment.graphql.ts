/**
 * @generated SignedSource<<e34f51c52c1a603f7591b565d8f3c493>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowRouletteSessionViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"RouletteSessionScreenViewerFragment">;
  readonly " $fragmentType": "ShowRouletteSessionViewerFragment";
};
export type ShowRouletteSessionViewerFragment$key = {
  readonly " $data"?: ShowRouletteSessionViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowRouletteSessionViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowRouletteSessionViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RouletteSessionScreenViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "dbf25db14334ed6001a6931ac3e2607d";

export default node;
