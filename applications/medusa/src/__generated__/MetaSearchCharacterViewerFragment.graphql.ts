/**
 * @generated SignedSource<<6a3a895db9d79e5cb11c27ba34a28bf3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetaSearchCharacterViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ContainerSearchCharacterViewerFragment">;
  readonly " $fragmentType": "MetaSearchCharacterViewerFragment";
};
export type MetaSearchCharacterViewerFragment$key = {
  readonly " $data"?: MetaSearchCharacterViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetaSearchCharacterViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetaSearchCharacterViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainerSearchCharacterViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "9c58b02a8c6dbd2878ad15f4113d8e66";

export default node;
