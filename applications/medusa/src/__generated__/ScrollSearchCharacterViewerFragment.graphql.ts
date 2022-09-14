/**
 * @generated SignedSource<<b2b55036499b2985aee0eb65fe109e2e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ScrollSearchCharacterViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostViewerFragment">;
  readonly " $fragmentType": "ScrollSearchCharacterViewerFragment";
};
export type ScrollSearchCharacterViewerFragment$key = {
  readonly " $data"?: ScrollSearchCharacterViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollSearchCharacterViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ScrollSearchCharacterViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FullSimplePostViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "934cf378dde35373e1e8600ed1e97c1b";

export default node;
