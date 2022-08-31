/**
 * @generated SignedSource<<337aebca9c54a4c8dbe98bbb33cbca28>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteSessionScreenViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenGameViewerFragment">;
  readonly " $fragmentType": "RouletteSessionScreenViewerFragment";
};
export type RouletteSessionScreenViewerFragment$key = {
  readonly " $data"?: RouletteSessionScreenViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteSessionScreenViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RouletteSessionScreenViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RouletteScreenGameViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "292b15f2ca73a1e5d38371395a83bc9a";

export default node;
