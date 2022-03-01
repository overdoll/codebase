/**
 * @generated SignedSource<<83f3c3f3107b36e814a939de2670813e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RuleTileOverlayFragment$data = {
  readonly title: string;
  readonly description: string;
  readonly " $fragmentType": "RuleTileOverlayFragment";
};
export type RuleTileOverlayFragment = RuleTileOverlayFragment$data;
export type RuleTileOverlayFragment$key = {
  readonly " $data"?: RuleTileOverlayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RuleTileOverlayFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RuleTileOverlayFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "Rule",
  "abstractKey": null
};

(node as any).hash = "196e34098434ec7e3931353f1bce0257";

export default node;
